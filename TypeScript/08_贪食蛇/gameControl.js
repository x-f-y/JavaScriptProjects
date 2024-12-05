import Snake from "./snake.js";
import Food from "./food.js";
import ScorePanel from "./scorePanel.js";
import { X_STEP, Y_STEP, X_TIMES, Y_TIMES } from "./init.js";

class GameControl {
  snake;
  food;
  scorePanel;
  status; // 0表示当前游戏处于暂停状态，1表示当前游戏处于进行状态
  isAccelerate; // 当前蛇的移动是否处于长按加速状态
  count; // 当前按下按键的数量
  timeId; // 延时器的唯一标识，用于标识当前游戏是正常进行状态还是异常结束状态
  keydownHandlerCopy; // keydown事件监听回调函数的引用
  keyupHandlerCopy; // keyup事件监听回调函数的引用
  pcKeydownHandlerCopy; // 用于游戏暂停和继续的keydown事件监听回调函数的引用
  constructor(){
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(20, 5);
    this.status = 1;
    this.isAccelerate = false;
    this.count = 0;
    // 使用addEventListener绑定事件监听时，回调函数使用了bind来改变this，这导致无法通过removeEventListener来正确取消事件监听，
    // 这是因为bind函数会创建一个新的函数，所以需要保存一份原始事件监听回调函数的引用，在取消事件监听时使用保存的原始函数引用来进行移除
    this.keydownHandlerCopy = this.keydownHandler.bind(this);
    this.keyupHandlerCopy = this.keyupHandler.bind(this);
    this.pcKeydownHandlerCopy = this.pcKeydownHandler.bind(this);
    this.init();
  }
  init(){
    // 给document绑定键盘按下和松开事件
    document.addEventListener('keydown', this.keydownHandlerCopy);
    document.addEventListener('keyup', this.keyupHandlerCopy);
    document.addEventListener('keydown', this.pcKeydownHandlerCopy);
    // 蛇开始移动
    this.timeId = setTimeout(this.move.bind(this), this.snake.gridTime);
  }
  // 控制蛇移动的方法
  move(){
    let currentX = this.snake.x, currentY = this.snake.y;
    switch(this.snake.direction){
      case 'ArrowUp':
        currentY -= Y_STEP;
        break;
      case 'ArrowDown':
        currentY += Y_STEP;
        break;
      case 'ArrowLeft':
        currentX -= X_STEP;
        break;
      case 'ArrowRight':
        currentX += X_STEP;
        break;
    }

    // 墙壁碰撞检测
    if(currentX < 0 || currentX > X_STEP * (X_TIMES - 1) || currentY < 0 || currentY > Y_STEP * (Y_TIMES - 1)){
      return this.terminate('碰撞墙壁');
    }

    // 身体碰撞检测
    const bodies = Array.from(this.snake.snakeBodyEles);
    const isCollideBody = bodies.some(item => parseFloat(item.style.left) === currentX && parseFloat(item.style.top) === currentY);
    if(isCollideBody){
      return this.terminate('碰撞身体');
    }

    // 吃食检测
    if(currentX === this.food.x && currentY === this.food.y){
      // 分数加1
      this.scorePanel.addScore();
      // 蛇的身体增加一节
      this.snake.addBody();
      // 修改食物的位置
      do{
        this.food.setPosition();
      }while(!this.food.isFoodPosLegal(this.snake.x, this.snake.y, Array.from(this.snake.snakeBodyEles)));
    }

    // 从后往前依次设置蛇每节身体的位置（注意不能从前往后设置）
    const length = this.snake.snakeBodyEles.length;
    for(let i = length - 1; i >= 1; i--){
      const currentBody = this.snake.snakeBodyEles[i];
      const preBody = this.snake.snakeBodyEles[i-1];
      currentBody.style.left = preBody.style.left;
      currentBody.style.top = preBody.style.top;
    }
    if(length > 0){
      this.snake.snakeBodyEles[0].style.left = this.snake.x + 'px';
      this.snake.snakeBodyEles[0].style.top = this.snake.y + 'px';
    }
    
    // 设置蛇头的位置
    this.snake.x = currentX;
    this.snake.y = currentY;

    // 根据当前等级重新设置蛇的移动速度
    if(this.isAccelerate){
      this.snake.gridTime = this.snake.minGridTime;
    }else{
      const mStep = (this.snake.maxGridTime - this.snake.minGridTime) / (this.scorePanel.maxLevel - 1);
      this.snake.gridTime = this.snake.maxGridTime - mStep * (this.scorePanel.level - 1);
    }

    // 进行下一次移动
    if(typeof this.timeId === 'number'){
      this.count = 0;
      clearTimeout(this.timeId);
      delete this.timeId;
      this.timeId = setTimeout(this.move.bind(this), this.snake.gridTime);
    }
  }
  // 键盘按下事件的响应回调函数
  keydownHandler(event){
    this.count++;
    const s = event.key;
    // 若一次性按下多个按键，则不进行处理
    if(this.count !== 1){
      return;
    }
    // 若按下的是空格键，则取消浏览器的默认行为（页面滚动）
    if(s === ' '){
      return event.preventDefault();
    }
    // 按下方向键（上、下、左、右）时才进行处理
    if(s !== 'ArrowUp' && s !== 'ArrowDown' && s !== 'ArrowLeft' && s !== 'ArrowRight'){
      return;
    }
    // 有蛇身时，按下的方向键不能与当前移动方向相反
    if(this.snake.snakeBodyEles.length){
      if(this.snake.direction === 'ArrowUp' && s === 'ArrowDown') return;
      if(this.snake.direction === 'ArrowDown' && s === 'ArrowUp') return;
      if(this.snake.direction === 'ArrowLeft' && s === 'ArrowRight') return;
      if(this.snake.direction === 'ArrowRight' && s === 'ArrowLeft') return;
    }
    // 长按加速
    this.isAccelerate = event.repeat;
    // 设置蛇的移动方向和蛇头样式
    this.snake.direction = s;
    this.snake.setStyleForHead();
  }
  // 键盘松开事件的响应回调函数
  keyupHandler(){
    this.count--;
    if(this.isAccelerate){
      // 退出加速状态
      this.isAccelerate = false;
    }
  }
  // 按下空格键可以暂停游戏和继续游戏
  pcKeydownHandler(event){
    if(event.key === ' '){
      this.status ? this.pause() : this.continue();
      this.status ^= 1;
      event.preventDefault(); // 取消浏览器的默认行为（按下空格键页面滚动）
    }
  }
  // 暂停游戏
  pause(){
    clearTimeout(this.timeId);
    delete(this.timeId);
    document.removeEventListener('keydown', this.keydownHandlerCopy);
  }
  // 继续游戏
  continue(){
    this.timeId = setTimeout(this.move.bind(this), this.snake.gridTime);
    document.addEventListener('keydown', this.keydownHandlerCopy);
  }
  // 结束游戏
  terminate(message){
    clearTimeout(this.timeId);
    delete this.timeId;
    document.removeEventListener('keydown', this.keydownHandlerCopy);
    document.removeEventListener('keyup', this.keyupHandlerCopy);
    document.removeEventListener('keydown', this.pcKeydownHandlerCopy);
    if(this.scorePanel.score > this.scorePanel.record){
      localStorage.setItem('record', this.scorePanel.score);
      this.scorePanel.recordEle.textContent = this.scorePanel.score;
    }
    alert(`${message}，游戏结束`);
  }
}

export default GameControl;