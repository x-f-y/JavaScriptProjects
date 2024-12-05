import { X_STEP, Y_STEP, X_TIMES, Y_TIMES, generateRandomPositon } from "./init.js";

class Snake {
  snakeEle;
  snakeHeadEle;
  snakeBodyEles;
  direction; // 蛇的移动方向
  gridTime; // 蛇移动“一格”耗费的时间，单位ms，用于控制蛇移动的速度
  minGridTime; // 最快移动速度
  maxGridTime; // 最慢移动速度
  constructor(){
    this.snakeEle = document.getElementById('snake');
    this.snakeHeadEle = this.snakeEle.getElementsByClassName('head')[0];
    this.snakeBodyEles = this.snakeEle.getElementsByClassName('body');
    this.minGridTime = 65;
    this.maxGridTime = 200;
    this.gridTime = this.maxGridTime;
    this.init();
  }
  init(){
    // 随机设置蛇头的位置
    const [left, top] = generateRandomPositon();
    this.x = left;
    this.y = top;
    // 随机设置蛇初始的移动方向，但需要保证游戏刚开始时不会撞到墙壁
    do{
      const type = Math.floor(Math.random() * 4);
      switch(type){
        case 0:
          this.direction = 'ArrowUp';
          break;
        case 1:
          this.direction = 'ArrowDown';
          break;
        case 2:
          this.direction = 'ArrowLeft';
          break;
        case 3:
          this.direction = 'ArrowRight';
          break;
      }
    }while(!this.isStartDirLegal());
    // 设置蛇头的样式
    this.setStyleForHead();
  }
  // 获取蛇头的位置
  get x(){
    return parseFloat(this.snakeHeadEle.style.left);
  }
  get y(){
    return parseFloat(this.snakeHeadEle.style.top);
  }
  // 设置蛇头的位置
  set x(value){
    if(this.x === value){
      return;
    }
    this.snakeHeadEle.style.left = value + 'px';
  }
  set y(value){
    if(this.y === value){
      return;
    }
    this.snakeHeadEle.style.top = value + 'px';
  }
  // 检查蛇的初始移动方向是否合法
  isStartDirLegal(){
    const x = this.x / X_STEP;
    const y = this.y / Y_STEP;
    if(this.direction === 'ArrowUp' && y === 0){
      return false;
    }
    if(this.direction === 'ArrowDown' && y === (Y_TIMES - 1)){
      return false;
    }
    if(this.direction === 'ArrowLeft' && x === 0){
      return false;
    }
    if(this.direction === 'ArrowRight' && x === (X_TIMES - 1)){
      return false;
    }
    return true;
  }
  // 根据蛇的移动方向为蛇头设置对应的样式
  setStyleForHead(){
    this.snakeHeadEle.style.borderRadius = '0px';
    switch(this.direction){
      case 'ArrowUp':
        this.snakeHeadEle.style.setProperty('border-top-left-radius', '50% 100%');
        this.snakeHeadEle.style.setProperty('border-top-right-radius', '50% 100%');
        break;
      case 'ArrowDown':
        this.snakeHeadEle.style.setProperty('border-bottom-left-radius', '50% 100%');
        this.snakeHeadEle.style.setProperty('border-bottom-right-radius', '50% 100%');
        break;
      case 'ArrowLeft':
        this.snakeHeadEle.style.setProperty('border-top-left-radius', '100% 50%');
        this.snakeHeadEle.style.setProperty('border-bottom-left-radius', '100% 50%');
        break;
      case 'ArrowRight':
        this.snakeHeadEle.style.setProperty('border-top-right-radius', '100% 50%');
        this.snakeHeadEle.style.setProperty('border-bottom-right-radius', '100% 50%');
        break;
    }
  }
  // 蛇的身体增加一节
  addBody(){
    const length = this.snakeBodyEles.length;
    const div = document.createElement('div');
    div.className = 'body';
    let x, y;
    if(!length){
      // 第一次吃食
      x = this.x;
      y = this.y;
    }else{
      const lastBody = this.snakeBodyEles[length-1];
      x = parseFloat(lastBody.style.left);
      y = parseFloat(lastBody.style.top);
    }
    switch(this.direction){
      case 'ArrowUp':
        y += Y_STEP;
        break;
      case 'ArrowDown':
        y -= Y_STEP;
        break;
      case 'ArrowLeft':
        x += X_STEP;
        break;
      case 'ArrowRight':
        x -= X_STEP;
        break;
    }
    div.style.left = x + 'px';
    div.style.top = y + 'px';
    this.snakeEle.insertAdjacentElement('beforeend', div);
  }
}

export default Snake;