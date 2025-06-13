import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { createRandomTetris } from "./Tetris";
import { TetrisRule } from "./TetrisRule";
import { GameStatus, IGameViewer, MoveDirection } from "./Types";
import GameConfig from "./GameConfig";

export class Game {
  private _gameStatus: GameStatus = GameStatus.init; // 游戏状态
  private _curTetris?: SquareGroup; // 当前操作的俄罗斯方块
  private _nextTetris: SquareGroup = createRandomTetris({x: 0, y: 0}); // 下一个俄罗斯方块
  private _timer: number | undefined; // 定时器id，与这种写法等价：timer?: number;
  private _duration: number; // 俄罗斯方块自动下落的时间间隔（单位：ms/格）
  private _exists: Square[] = []; // 当前游戏中已存在的小方块
  private _viewer: IGameViewer; // 游戏显示者
  private _score: number = 0; // 游戏积分

  public get gameStatus(): GameStatus {
    return this._gameStatus;
  }

  public get score(): number {
    return this._score;
  }

  public set score(val: number){
    this._score = val;
    this._viewer.showScore(val);
    // 分数改变，若进入下一等级，则修改游戏难度（this._duration），重新调用_autoDrop()方法
    const level = GameConfig.levels.filter(l => l.score <= val).pop()!;
    if(level.duration === this._duration){
      return;
    }
    this._duration = level.duration;
    if(this._timer){
      clearInterval(this._timer);
      this._timer = undefined;
      this._autoDrop();
    }
  }
  
  constructor(viewer: IGameViewer){
    this._duration = GameConfig.levels[0].duration;
    this._viewer = viewer;
    this._resetCenterPoint(this._nextTetris, GameConfig.nextSize.width);
    this._viewer.init(this);
    this._viewer.showNext(this._nextTetris);
    this._viewer.showScore(this._score);
  }

  // 游戏初始化
  private _init(){
    this._exists.forEach(s => s.viewer?.remove());
    this._exists = [];
    this._curTetris = undefined;
    this.score = 0;
    this._createNext();
  }

  // 创建下一个俄罗斯方块
  private _createNext(){
    this._nextTetris = createRandomTetris({x: 0, y: 0});
    this._resetCenterPoint(this._nextTetris, GameConfig.nextSize.width);
    this._viewer.showNext(this._nextTetris);
  }

  // 当前俄罗斯方块自由下落
  private _autoDrop(){
    if(this._timer || this._gameStatus !== GameStatus.playing){
      return;
    }
    this._timer = setInterval(() => {
      if(this._curTetris){
        if(!TetrisRule.move(this._curTetris, MoveDirection.down, this._exists)){
          // 触底
          this._hitBottom();
        }
      }
    }, this._duration);
  }

  // 切换俄罗斯方块
  private _switchTetris(){
    this._curTetris = this._nextTetris;
    this._nextTetris.squares.forEach(s => {
      s.viewer?.remove();
    })
    this._resetCenterPoint(this._curTetris, GameConfig.panelSize.width);
    if(!TetrisRule.isLegal(this._curTetris.shape, this._curTetris.centerPoint, this._exists)){
      // 游戏结束
      this._gameStatus = GameStatus.over;
      clearInterval(this._timer);
      this._timer = undefined;
      this._viewer.onGameOver();
      return;
    }
    this._viewer.switch(this._nextTetris);
    this._createNext();
  }

  // 根据显示区域的宽度（单位：小方块）设置中心点坐标，以达到让俄罗斯方块出现在区域的中上方
  private _resetCenterPoint(tetris: SquareGroup, width: number){
    tetris.centerPoint = {
      x: Math.ceil(width / 2) - 1,
      y: tetris.centerPoint.y
    }
    while(tetris.squares.some(s => s.point.y < 0)){
      tetris.centerPoint = {
        x: tetris.centerPoint.x,
        y: tetris.centerPoint.y + 1
      }
    }
  }

  // 触底之后的操作
  private _hitBottom(){
    // !的意思是断言，表示告诉ts，这里的this._curTetris一定有值
    this._exists = this._exists.concat(this._curTetris!.squares);
    const lines = TetrisRule.deleteSquares(this._exists);
    this._addScore(lines);
    this._switchTetris();
  }

  // 根据消除的行数增加积分（tip：一次最多只能消除4行）
  private _addScore(lines: number){
    switch(lines){
      case 0:
        break;
      case 1:
        this.score += 10;
        break;
      case 2:
        this.score += 25;
        break;
      case 3:
        this.score += 50;
        break;
      case 4:
        this.score += 100;
        break;
    }
  }

  // 游戏开始
  start(){
    if(this._gameStatus === GameStatus.playing){
      return;
    }
    if(this._gameStatus === GameStatus.over){
      this._init();
    }
    this._gameStatus = GameStatus.playing;
    if(!this._curTetris){
      this._switchTetris();
    }
    this._autoDrop();
    this._viewer.onGameStart();
  }

  // 游戏暂停
  pause(){
    if(this._gameStatus === GameStatus.playing){
      this._gameStatus = GameStatus.pause;
      clearInterval(this._timer);
      this._timer = undefined;
      this._viewer.onGamePause();
    }
  }

  // 向左移动俄罗斯方块
  controlLeft(){
    if(this._curTetris && this._gameStatus === GameStatus.playing){
      TetrisRule.move(this._curTetris, MoveDirection.left, this._exists);
    }
  }

  // 向右移动俄罗斯方块
  controlRight(){
    if(this._curTetris && this._gameStatus === GameStatus.playing){
      TetrisRule.move(this._curTetris, MoveDirection.right, this._exists);
    }
  }

  // 将俄罗斯方块向下移动至底部
  controlDown(){
    if(this._curTetris && this._gameStatus === GameStatus.playing){
      TetrisRule.moveDirectly(this._curTetris, MoveDirection.down, this._exists);
      // 触底
      this._hitBottom();
    }
  }

  // 旋转俄罗斯方块
  controlRotate(){
    if(this._curTetris && this._gameStatus === GameStatus.playing){
      TetrisRule.rotate(this._curTetris, this._exists);
    }
  }
}
