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
  var duration = 2000; // 滚动间隔时间（单位：ms）
  var curIndex = 0; // 当前显示项的索引
  function moveNext(){
    var to = (curIndex + 1) * itemHeight; // 滚动目标位置
    var intervalId = setInterval(() => {
      list.scrollBy(0, 1);
      if(list.scrollTop >= to){
        curIndex++;
        clearInterval(intervalId);
        if(list.scrollTop + list.clientHeight >= list.scrollHeight){
          // 滚动条滚动到底了，说明当前已经滚动到最后一项，此时应该回到第一项
          list.scrollTo(0, 0);
          curIndex = 0;
        }
      }
    }, 10);
  }
  setInterval(moveNext, duration);
})();