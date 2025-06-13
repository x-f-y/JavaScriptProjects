import { Square } from "./Square";
import { IPoint, Shape } from "./Types";

/**
 * 小方块的组合类
 */
export abstract class SquareGroup {
  private _squares: readonly Square[]; // 小方块数组
  protected isClockWise: boolean = true; // 旋转方向，true表示顺时针，false表示逆时针

  public constructor(
    private _shape: Shape, // 形状（实际上就是各个小方块相对于中心点(0,0)的相对坐标组成的数组）
    private _centerPoint: IPoint, // 中心点实际坐标（中心点的相对坐标始终为(0,0)）
    private _color: string // 颜色
  ){
    const arr: Square[] = [];
    for(const p of this._shape){
      arr.push(new Square({
        x: this._centerPoint.x + p.x,
        y: this._centerPoint.y + p.y
      }, this._color));
    }
    this._squares = arr;
  }

  public get squares(){
    return this._squares;
  }

  public get shape(): Shape{
    return this._shape;
  }

  public set shape(val: Shape){
    this._shape = val;
    // 形状改变，重新设置各个小方块的坐标
    this._setSquarePoints();
  }

  public get centerPoint(): IPoint {
    return this._centerPoint;
  }

  public set centerPoint(val: IPoint){
    this._centerPoint = val;
    // 中心点改变，重新设置各个小方块的坐标
    this._setSquarePoints();
  }

  // 根据当前形状和中心点的实际坐标设置各个小方块的实际坐标
  private _setSquarePoints(){
    this._squares.forEach((s, i) => {
      s.point = {
        x: this._centerPoint.x + this._shape[i].x,
        y: this._centerPoint.y + this._shape[i].y
      }
    });
  }

  // 根据当前形状和旋转方向得到旋转后的形状
  public afterRotateShape(): Shape {
    if(this.isClockWise){
      // 顺时针旋转90deg：p(x,y) -> p'(-y,x)
      return this._shape.map(p => ({
        x: -p.y,
        y: p.x
      }));
    }else{
      // 逆时针旋转90deg：p(x,y) -> p'(y,-x)
      return this._shape.map(p => ({
        x: p.y,
        y: -p.x
      }));
    }
  }

  // 旋转
  public rotate(){
    this.shape = this.afterRotateShape();
  }
}