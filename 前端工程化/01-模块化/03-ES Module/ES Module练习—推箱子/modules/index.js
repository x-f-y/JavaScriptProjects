import { setContainerSize, setContainerContent } from './ui.js';
import { UP, DOWN, LEFT, RIGHT } from './variables.js';
import { playerMove, isWin } from './play.js';

let isGameOver = false;

setContainerSize();
setContainerContent();

window.onkeydown = function(e){
  if(isGameOver){
    return;
  }
  let isMoved = false;
  switch(e.key){
    case 'ArrowUp':
      isMoved = playerMove(UP);
      break;
    case 'ArrowDown':
      isMoved = playerMove(DOWN);
      break;
    case 'ArrowLeft':
      isMoved = playerMove(LEFT);
      break;
    case 'ArrowRight':
      isMoved = playerMove(RIGHT);
      break;
  }
  if(isMoved){
    setContainerContent();
    if(isWin()){
      console.log('恭喜通关！');
      isGameOver = true;
    }
  }
}