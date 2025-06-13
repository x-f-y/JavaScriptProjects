import { SquareGroup } from "./SquareGroup";
import { IPoint, Shape } from "./Types";

export class TShape extends SquareGroup {
  constructor(centerPoint: IPoint, color: string){
    super([{x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}], centerPoint, color);
  }
}

export class LShape extends SquareGroup {
  constructor(centerPoint: IPoint, color: string){
    super([{x: -2, y: 0}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}], centerPoint, color);
  }
}

export class LMirrorShape extends SquareGroup {
  constructor(centerPoint: IPoint, color: string){
    super([{x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}], centerPoint, color);
  }
}

export class SShape extends SquareGroup {
  constructor(centerPoint: IPoint, color: string){
    super([{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 1}], centerPoint, color);
  }
  // 重写父类的rotate方法
  rotate(){
    super.rotate();
    this.isClockWise = !this.isClockWise;
  }
}

export class SMirrorShape extends SquareGroup {
  constructor(centerPoint: IPoint, color: string){
    super([{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}], centerPoint, color);
  }
  // 重写父类的rotate方法
  rotate(){
    super.rotate();
    this.isClockWise = !this.isClockWise;
  }
}

export class SquareShape extends SquareGroup {
  constructor(centerPoint: IPoint, color: string){
    super([{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}], centerPoint, color);
  }
  // 重写父类的afterRotateShape方法
  afterRotateShape(): Shape {
    return this.shape;
  }
}

export class LineShape extends SquareGroup {
  constructor(centerPoint: IPoint, color: string){
    super([{x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}], centerPoint, color);
  }
  // 重写父类的rotate方法
  rotate(){
    super.rotate();
    this.isClockWise = !this.isClockWise;
  }
}

export const Shapes = [
  TShape, // 四种旋转状态
  LShape, // 四种旋转状态
  LMirrorShape, // 四种旋转状态
  SShape, // 两种旋转状态（旋转一次后，旋转方向取反）
  SMirrorShape, // 两种旋转状态（旋转一次后，旋转方向取反）
  SquareShape, // 一种旋转状态（不能旋转）
  LineShape // 两种旋转状态（旋转一次后，旋转方向取反）
];

export const colors = [
  "red", "green", "blue", "orange", "yellow", "aqua", "brown", "wheat"
];

/**
 * 根据给定的中心点创建随机的俄罗斯方块，颜色随机，形状随机
 * @param centerPoint 中心点坐标
 * @returns 随机的俄罗斯方块
 */
export function createRandomTetris(centerPoint: IPoint): SquareGroup {
  const sindex = Math.floor(Math.random() * Shapes.length);
  const cindex = Math.floor(Math.random() * colors.length);
  return new Shapes[sindex](centerPoint, colors[cindex]);
}