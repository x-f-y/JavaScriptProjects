import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { IPoint, MoveDirection, Shape } from "./Types";
import GameConfig from "./GameConfig";

// 自定义类型保护函数
function isPoint(obj: any): obj is IPoint{
  return typeof(obj.x) !== "undefined" && typeof(obj.y) !== "undefined";
}

/**
 * 规则类，提供一系列函数，根据游戏规则判断各种情况
 */
export class TetrisRule {
  // 给定形状、中心点的实际坐标、当前游戏中已存在的小方块，判断该形状下的俄罗斯方块是否合法
  // 合法的条件是：1. 未超越游戏区域边界；2. 未与已有的俄罗斯方块重叠
  static isLegal(shape: Shape, targetPoint: IPoint, exists: Square[]): boolean {
    // 变形（移动或者旋转）后的实际坐标
    const targetPos = shape.map(p => ({
      x: targetPoint.x + p.x,
      y: targetPoint.y + p.y
    }));
    const isCrossBoundary = targetPos.some(p => p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1);
    const isOverlap = targetPos.some(p => exists.some(s => s.point.x === p.x && s.point.y === p.y));
    return !(isCrossBoundary || isOverlap);
  }

  // 函数重载声明
  static move(tetris: SquareGroup, targetPoint: IPoint, exists: Square[]): boolean;
  static move(tetris: SquareGroup, direction: MoveDirection, exists: Square[]): boolean;
  // 移动俄罗斯方块（函数实现）
  static move(tetris: SquareGroup, targetPointOrDirection: IPoint | MoveDirection, exists: Square[]): boolean {
    if(isPoint(targetPointOrDirection)){
      if(this.isLegal(tetris.shape, targetPointOrDirection, exists)){
        tetris.centerPoint = targetPointOrDirection;
        return true;
      }
      return false;
    }else{
      let targetPoint: IPoint;
      switch(targetPointOrDirection){
        case MoveDirection.down:
          targetPoint = {
            x: tetris.centerPoint.x,
            y: tetris.centerPoint.y + 1
          };
          break;
        case MoveDirection.left:
          targetPoint = {
            x: tetris.centerPoint.x - 1,
            y: tetris.centerPoint.y
          };
          break;
        case MoveDirection.right:
          targetPoint = {
            x: tetris.centerPoint.x + 1,
            y: tetris.centerPoint.y
          };
          break;
      }
      return this.move(tetris, targetPoint, exists);
    }
  }

  // 直接将给定的俄罗斯方块移动到目标方向上的终点
  static moveDirectly(tetris: SquareGroup, direction: MoveDirection, exists: Square[]){
    while(this.move(tetris, direction, exists)){}
  }

  // 旋转俄罗斯方块
  static rotate(tetris: SquareGroup, exists: Square[]): boolean {
    // 得到旋转后的新形状
    const newShape = tetris.afterRotateShape();
    // 判断新的位置是否合法，合法时，才能进行旋转
    if(this.isLegal(newShape, tetris.centerPoint, exists)){
      tetris.rotate();
      return true;
    }
    return false;
  }

  // 消除俄罗斯方块，返回消除的行数
  static deleteSquares(exists: Square[]): number {
    let res = 0;
    // 获取已存在的小方块的最小纵坐标和最大纵坐标
    const ys = exists.map(s => s.point.y);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    // 从上到下（纵坐标从小到大）进行消除
    for(let y = minY; y <= maxY; y++){
      // 获取该行的小方块数组
      const squares = exists.filter(s => s.point.y === y);
      if(squares.length === GameConfig.panelSize.width){
        // 该行小方块数量已满，可以消除
        for(const sq of squares){
          // 从界面上移除
          sq.viewer?.remove();
          // 从已存在的小方块数组中移除
          exists.splice(exists.indexOf(sq), 1);
        }
        // 除该行小方块外，剩下的小方块，凡是纵坐标比当前行的纵坐标小的，纵坐标加1
        exists.filter(s => s.point.y < y).forEach(s => {
          s.point = {
            x: s.point.x,
            y: s.point.y + 1
          };
        });
        res++;
      }
    }
    return res;
  }
}