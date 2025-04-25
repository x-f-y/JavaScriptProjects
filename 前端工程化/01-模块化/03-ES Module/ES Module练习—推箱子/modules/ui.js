import { content, correct } from './map.js';
import { BLANK, PLAYER, WALL, BOX } from './variables.js';

const gameContainer = document.getElementById('game');

// 每一个小块的尺寸
const pieceWidth = 45;
const pieceHeight = 45;

// 游戏区域的总行数和总列数
const rows = content.length;
const columns = content[0].length;

// 设置容器尺寸
export function setContainerSize(){
  gameContainer.style.width = pieceWidth * columns + 'px';
  gameContainer.style.height = pieceHeight * rows + 'px';
}

// 判断当前位置是否是正确位置
function isCorrect(row, col){
  const ans = correct.find(i => i.row === row && i.col === col);
  return ans !== undefined;
}

// 设置单个item
function setSinglePiece(row, col){
  const div = document.createElement('div');
  div.className = 'item';
  div.style.top = row * pieceHeight + 'px';
  div.style.left = col * pieceWidth + 'px';
  const value = content[row][col];
  switch(value){
    case BLANK:
      if(isCorrect(row, col)){
        div.classList.add('correct');
      }
      break;
    case PLAYER:
      div.classList.add('player');
      break;
    case WALL:
      div.classList.add('wall');
      break;
    case BOX:
      if(isCorrect(row, col)){
        div.classList.add('correct-box');
      }else{
        div.classList.add('box');
      }
      break;
  }
  gameContainer.appendChild(div);
}

// 设置容器内容
export function setContainerContent(){
  gameContainer.innerHTML = '';
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < columns; j++){
      setSinglePiece(i, j);
    }
  }
}