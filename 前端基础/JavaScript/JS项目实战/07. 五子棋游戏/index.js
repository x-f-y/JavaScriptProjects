(function(){
  var container = document.querySelector('.container');
  var chessboard = document.querySelector('.chessboard');
  
  var size = 14; // 棋盘水平和垂直方向上的格子总数
  var gridSize = {
    w: chessboard.clientWidth / size,
    h: chessboard.clientHeight / size
  }; // 棋盘上每一个格子的尺寸
  var gapSize = {
    h: (container.clientWidth - chessboard.clientWidth) / 2,
    v: (container.clientHeight - chessboard.clientHeight) / 2
  }; // 棋盘与整个容器之间的间隙的尺寸
  var stoneSize = gridSize.w * 0.9; // 棋子的尺寸
  var stoneData = new Array(size + 1); // 棋子数据（二维数组）
  var currentStoneColor = 'white'; // 当前应该下什么颜色的棋子
  var currentStoneIndex = 1; // 当前棋子对应的步数
  var isGameOver = false; // 游戏是否结束
  
  class Stone{
    constructor(x, y, color, index, isWin){
      this.dom = null;
      this.x = x;
      this.y = y;
      this.color = color;
      this.index = index;
      this.isWin = isWin;
      this.init();
    }
    init(){
      this.dom = document.createElement('div');
      this.dom.className = 'stone ' + this.color;
      this.dom.style.left = gapSize.h + gridSize.w * this.x - stoneSize / 2 + 'px';
      this.dom.style.top = gapSize.v + gridSize.h * this.y - stoneSize / 2 + 'px';
      container.appendChild(this.dom);
      stoneData[this.y][this.x] = this;
    }
    setStatusWin(){
      this.dom.classList.add('win');
    }
    setIndex(){
      this.dom.textContent = this.index;
    }
  }
  
  function initChessboard(){
    var tbody = document.createElement('tbody');
    for(var i = 0; i < size; i++){
      var tr = document.createElement('tr');
      for(var j = 0; j < size; j++){
        var td = document.createElement('td');
        td.dataset.row = i;
        td.dataset.column = j;
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    chessboard.appendChild(tbody);
  }
  
  function initStoneData(){
    for(var i = 0; i < stoneData.length; i++){
      stoneData[i] = new Array(size + 1);
    }
  }
  
  function init(){
    container.style.setProperty('--stoneSize', stoneSize);
    initChessboard();
    initStoneData();
  }
  
  // 传入一个棋盘外的坐标，返回对应的棋子位置（横向和纵向所在的分隔线索引）
  function computePos(x, y){
    var rx, ry;
    if(x < gapSize.h){
      rx = 0;
    }else if(x > container.clientWidth - gapSize.h){
      rx = size;
    }else {
      for(rx = 0; rx * gridSize.w + gapSize.h < x; rx++);
      if(rx * gridSize.w + gapSize.h - x > x - gapSize.h - (rx - 1) * gridSize.w){
        rx -= 1;
      }
    }
    if(y < gapSize.v){
      ry = 0;
    }else if(y > container.clientHeight - gapSize.v){
      ry = size;
    }else {
      for(ry = 0; ry * gridSize.h + gapSize.v < y; ry++);
      if(ry * gridSize.h + gapSize.v - y > y - gapSize.v - (ry - 1) * gridSize.h){
        ry -= 1;
      }
    }
    return {
      rx: rx,
      ry: ry
    };
  }
  
  // 判断游戏胜负
  function isWin(stone){
    function _isVaild(point, color){
      var x = point[0], y = point[1];
      if(x < 0 || x > size || y < 0 || y > size){
        return false;
      }
      var stone = stoneData[y][x];
      return stone && stone.color === color;
    }
  
    function _createIsWin(p1Move, p2Move){
      return function(stone){
        var count = 1, p = [stone.x, stone.y], winStones = [stone];
        for(p = p1Move(p); _isVaild(p, stone.color); p = p1Move(p)){
          winStones.push(stoneData[p[1]][p[0]]);
          count++;
        }
        p = [stone.x, stone.y];
        for(p = p2Move(p); _isVaild(p, stone.color); p = p2Move(p)){
          winStones.push(stoneData[p[1]][p[0]]);
          count++;
        }
        if(count >= 5){
          for(var i = 0; i < 5; i++){
            winStones[i].isWin = true;
          }
        }
        return count >= 5;
      };
    }
  
    // 横向判断
    var isHorizontalWin = _createIsWin(([x, y]) => [x - 1, y], ([x, y]) => [x + 1, y]);
    // 纵向判断
    var isVerticalWin = _createIsWin(([x, y]) => [x, y - 1], ([x, y]) => [x, y + 1]);
    // 斜向判断
    var isSlashWin = _createIsWin(([x, y]) => [x - 1, y + 1], ([x, y]) => [x + 1, y - 1]);
    // 反斜向判断
    var isBackSlashWin = _createIsWin(([x, y]) => [x - 1, y - 1], ([x, y]) => [x + 1, y + 1]);
  
    return (
      isHorizontalWin(stone) ||
      isVerticalWin(stone) ||
      isSlashWin(stone) ||
      isBackSlashWin(stone)
    );
  }
  
  // 游戏结束执行的函数
  function end(){
    var rows = stoneData.length;
    for(var i = 0; i < rows; i++){
      var columns = stoneData[i].length;
      for(var j = 0; j < columns; j++){
        var stone = stoneData[i][j];
        if(!stone){
          continue;
        }
        if(stone.isWin){
          stone.setStatusWin();
        }
        stone.setIndex();
      }
    }
  }
  
  init();
  
  container.onclick = function(e){
    if(isGameOver){
      if(window.confirm("是否要重新开始一局游戏？")){
        document.querySelectorAll('.stone').forEach(node => node.remove());
        initStoneData();
        currentStoneColor = 'white';
        currentStoneIndex = 1;
        isGameOver = false;
      }
    }else{
      var target = e.target;
      var posX, posY; // 棋子中心点在水平和垂直方向上分别对应的分隔线索引
      if(target.tagName === 'TD'){
        // 点击的是棋盘区域
        var isLeft = e.offsetX < target.clientWidth / 2;
        var isTop = e.offsetY < target.clientHeight / 2;
        var row = Number(target.dataset.row);
        var column = Number(target.dataset.column);
        posX = isLeft ? column : column + 1;
        posY = isTop ? row : row + 1;
      }else if(target.className === 'container'){
        // 点击的是棋盘之外的容器区域
        var res = computePos(e.offsetX, e.offsetY);
        posX = res.rx;
        posY = res.ry;
      }else{
        // 点击的是已存在的棋子
        return;
      }
      // 如果当前位置已经有棋子了，则直接返回
      if(stoneData[posY][posX] !== undefined){
        return;
      }
      // 落子
      var stone = new Stone(posX, posY, currentStoneColor, currentStoneIndex, false);
      // 判断胜负
      if(isWin(stone)){
        end();
        isGameOver = true;
      }else{
        currentStoneColor = (currentStoneColor === 'white' ? 'black' : 'white');
        currentStoneIndex++;
      }
    }
  };
})();