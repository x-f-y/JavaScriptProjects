import { generateRandomPositon } from "./init.js";

class Food {
  foodEle;
  constructor(){
    this.foodEle = document.getElementById('food');
    this.setPosition();
  }
  setPosition(){
    const [left, top] = generateRandomPositon();
    this.x = left;
    this.y = top;
  }
  get x(){
    return parseFloat(this.foodEle.style.left);
  }
  get y(){
    return parseFloat(this.foodEle.style.top);
  }
  set x(value){
    this.foodEle.style.left = value + 'px';
  }
  set y(value){
    this.foodEle.style.top = value + 'px';
  }
  // 检查食物的位置是否合法（食物的位置应不能与蛇有重叠）
  isFoodPosLegal(snakeHeadX, snakeHeadY, snakeBodyArr){
    if(this.x === snakeHeadX && this.y === snakeHeadY){
      return false;
    }
    return snakeBodyArr.every(item => parseFloat(item.style.left) !== this.x || parseFloat(item.style.top) !== this.y);
  }
}

export default Food;