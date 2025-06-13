import { IPoint, ISquareViewer } from "./Types";

/**
 * 小方块类
 */
export class Square {
  private _viewer?: ISquareViewer; // 显示者
  private _point: IPoint; // 逻辑坐标（与界面无关），左上角为(0,0)，右下角为(GameConfig.panelSize.width-1,GameConfig.panelSize.height-1)
  private _color: string; // 颜色

  public constructor(point: IPoint, color: string){
    this._point = point;
    this._color = color;
  }

  public get viewer(){
    return this._viewer;
  }

  public set viewer(val){
    this._viewer = val;
    // 设置显示者时手动显示一次
    this._viewer?.show();
  }

  public get point(){
    return this._point;
  }

  public set point(val){
    // 对坐标的赋值操作一定会经过该函数的控制
    this._point = val;
    // 坐标改变，重新显示
    this._viewer?.show();
  }

  public get color(){
    return this._color;
  }
}

/**
 * 面向对象开发原则：
 *  1. 单一职能原则：每个类只做跟它相关的事情（高内聚、低耦合）
 *  2. 开闭原则：系统中的类，应该对扩展开放，对修改关闭
 * 
 * 基于以上两个原则，系统中使用如下模式：
 *  数据-界面分离模式
 * 
 * 传统面向对象语言，书写类的属性时，往往会进行如下操作：
 *  1. 所有属性全部私有化
 *  2. 使用公开的方法提供对属性的访问
 */