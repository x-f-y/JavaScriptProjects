(function(){
  var list = document.querySelector('.list');
  
  // 1. 将列表的第一项克隆一份到最后一项
  function cloneFirstItem(){
    var node = list.children[0].cloneNode(true);
    list.appendChild(node);
  }
  cloneFirstItem();
  
  // 2. 滚动，每隔一段时间，滚动列表到下一项
  var itemHeight = 30; // 每一项的高度
  var curIndex = 0; // 当前显示项的索引
  var duration = 2000; // 滚动间隔时间（单位：ms）
  function moveNext(){
    var from = curIndex * itemHeight;
    curIndex++;
    var to = curIndex * itemHeight;
    createAnimation({
      from: from,
      to: to,
      duration: 500,
      onmove: function(value){
        list.scrollTop = value;
      },
      onend: function(){
        if(curIndex === list.children.length - 1){
          list.scrollTop = 0;
          curIndex = 0;
        }
      }
    });
  }

  setInterval(moveNext, duration);
})();