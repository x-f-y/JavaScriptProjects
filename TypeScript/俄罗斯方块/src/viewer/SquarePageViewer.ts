import { Square } from "../core/Square";
import { ISquareViewer } from "../core/Types";
import GameConfig from "../core/GameConfig";
import $ from "jquery";

/**
 * 显示一个小方块到页面上
 */
export class SquarePageViewer implements ISquareViewer {
  private dom: JQuery<HTMLElement>; // 要显示的小方块对应的dom元素
  private isRemove: boolean = false; // 是否已经移除过

  constructor(
    private square: Square, // 要显示的小方块
    private container: JQuery<HTMLElement> // 将小方块显示在哪个容器中
  ){
    this.dom = $("<div>").css({
      position: "absolute",
      boxSizing: "border-box",
      width: GameConfig.squareSize.width,
      height: GameConfig.squareSize.height,
      border: "1px solid #ccc",
      backgroundColor: this.square.color
    }).appendTo(this.container);
  }

  show(): void {
    if(this.isRemove){
      return;
    }
    this.dom.css({
      left: this.square.point.x * GameConfig.squareSize.width,
      top: this.square.point.y * GameConfig.squareSize.height
    });
  }

  remove(): void {
    if(!this.isRemove){
      this.dom.remove();
      this.isRemove = true;
    }
  }
}