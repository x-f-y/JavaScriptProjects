import { Game } from "../core/Game";
import GameConfig from "../core/GameConfig";
import { SquareGroup } from "../core/SquareGroup";
import { GameStatus, IGameViewer } from "../core/Types";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from "jquery";

export class GamePageViewer implements IGameViewer {
  private panelDom: JQuery<HTMLElement> = $("#panel");
  private msgDom: JQuery<HTMLElement> = $("#msg");
  private nextDom: JQuery<HTMLElement> = $("#next");
  private nextTipDom: JQuery<HTMLElement> = $("#nextTip");
  private scoreDom: JQuery<HTMLElement> = $("#score");

  // 完成游戏界面的初始化
  init(game: Game): void {
    // 1. 设置各个dom元素的初始状态，包括宽高、可见性等
    this.panelDom.css({
      width: GameConfig.panelSize.width * GameConfig.squareSize.width,
      height: GameConfig.panelSize.height * GameConfig.squareSize.height
    });
    this.nextDom.css({
      width: GameConfig.nextSize.width * GameConfig.squareSize.width,
      height: GameConfig.nextSize.height * GameConfig.squareSize.height
    });
    this.msgDom[0].style.visibility = "visible";
    this.msgDom[0].innerHTML = `<p>按 Space 开始游戏</p>`;
    this.nextTipDom.text("下一个");
    // 2. 监听键盘事件
    $(document)[0].onkeydown = function(e){
      switch(e.key){
        case "ArrowUp":
          game.controlRotate();
          break;
        case "ArrowDown":
          game.controlDown();
          break;
        case "ArrowLeft":
          game.controlLeft();
          break;
        case "ArrowRight":
          game.controlRight();
          break;
        case " ":
          if(game.gameStatus === GameStatus.playing){
            game.pause();
          }else{
            game.start();
          }
          break;
      }
    }
  }

  // 显示游戏的分数
  showScore(score: number): void {
    this.scoreDom.text(`积分：${score}`);
  }

  // 显示下一个俄罗斯方块
  showNext(nextTetris: SquareGroup): void {
    nextTetris.squares.forEach(sq => {
      sq.viewer = new SquarePageViewer(sq, this.nextDom);
    })
  }

  // 将下一个俄罗斯方块切换为当前游戏面板上显示的俄罗斯方块
  switch(nextTetris: SquareGroup): void {
    nextTetris.squares.forEach(sq => {
      // !的意思是断言，表示告诉ts，这里的sq.viewer一定有值
      sq.viewer!.remove();
      sq.viewer = new SquarePageViewer(sq, this.panelDom);
    })
  }

  // 游戏开始时调用
  onGameStart(): void {
    this.msgDom[0].style.visibility = "hidden";
  }

  // 游戏暂停时调用
  onGamePause(): void {
    this.msgDom.html("<p>游戏暂停，按 Space 继续游戏</p>");
    this.msgDom[0].style.visibility = "visible";
  }

  // 游戏结束时调用
  onGameOver(): void {
    this.msgDom.html("<p>游戏结束，按 Space 重新开始游戏</p>");
    this.msgDom[0].style.visibility = "visible";
    this.nextTipDom.hide();
  }
}