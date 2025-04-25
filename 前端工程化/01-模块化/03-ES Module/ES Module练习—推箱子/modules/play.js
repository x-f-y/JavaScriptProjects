import * as v from './variables.js';
import { content, correct } from './map.js';

// 获取玩家位置
function getPlayerPos(){
  const rows = content.length, cols = content[0].length;
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      if(content[i][j] === v.PLAYER){
        return {
          row: i,
          col: j
        };
      }
    }
  }
  throw new Error('No Player Found!');
}

// 得到某个位置在指定方向上的下一个位置的信息
function getNextInfo(row, col, direction){
  let value;
  switch(direction){
    case v.UP:
      value = content[--row][col];
      break;
    case v.DOWN:
      value = content[++row][col];
      break;
    case v.LEFT:
      value = content[row][--col];
      break;
    case v.RIGHT:
      value = content[row][++col];
      break;
  }
  return { row, col, value };
}

// 玩家或者箱子的单次移动
function move(posFrom, posTo){
  content[posTo.row][posTo.col] = content[posFrom.row][posFrom.col];
  content[posFrom.row][posFrom.col] = v.BLANK;
}

// 玩家移动
export function playerMove(direction){
  const playerPos = getPlayerPos();
  const nextInfo = getNextInfo(playerPos.row, playerPos.col, direction);
  if(nextInfo.value === v.WALL){
    // 下一个位置是墙
    return false;
  }
  if(nextInfo.value === v.BLANK){
    // 下一个位置是空白
    move(playerPos, nextInfo);
    return true;
  } else {
    // 下一个位置是箱子
    const nextNextInfo = getNextInfo(nextInfo.row, nextInfo.col, direction);
    if(nextNextInfo.value === v.BLANK){
      move(nextInfo, nextNextInfo);
      move(playerPos, nextInfo);
      return true;
    }else{
      return false;
    }
  }
}

// 判断游戏是否胜利
export function isWin(){
  const len = correct.length;
  for(let i = 0; i < len; i++){
    const item = correct[i];
    if(content[item.row][item.col] !== v.BOX){
      return false;
    }
  }
  return true;
}