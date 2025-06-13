import { Game } from "./Game";
import { SquareGroup } from "./SquareGroup";

// 坐标
export interface IPoint {
  readonly x: number;
  readonly y: number;
}

// 方块显示者
export interface ISquareViewer {
  // 显示一个方块
  show(): void;
  // 移除一个方块
  remove(): void;
}

// 形状
export type Shape = IPoint[];

// 移动方向
export enum MoveDirection {
  down, left, right
}

// 游戏状态
export enum GameStatus {
  init, // 游戏未开始
  playing, // 游戏进行中
  pause, // 游戏暂停
  over // 游戏结束
}

// 游戏显示者
export interface IGameViewer {
  // 完成游戏界面的初始化
  init(game: Game): void;
  // 显示游戏的分数
  showScore(score: number): void;
  // 显示下一个俄罗斯方块
  showNext(nextTetris: SquareGroup): void;
  // 将下一个俄罗斯方块切换为当前游戏面板上显示的俄罗斯方块
  // step1: 移除下一个俄罗斯方块对应的dom元素
  // step2: 将下一个俄罗斯方块作为当前操作的俄罗斯方块显示在游戏区域中
  switch(nextTetris: SquareGroup): void;
  // 游戏开始时调用
  onGameStart(): void;
  // 游戏暂停时调用
  onGamePause(): void;
  // 游戏结束时调用
  onGameOver(): void;
}
