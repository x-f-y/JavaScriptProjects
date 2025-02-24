(function(){
  var timeList = document.querySelectorAll('.time-item');
  var curTime = new Date(); // 当前时间
  var imgHeight = 120; // 每张图片的高度
  var animationDuration = 400; // 切换图片这个过程所耗费的总时间（单位：ms）
  var timeDuration = 1000; // 计时间隔（单位：ms）

  // 初始化
  function init(){
    // 根据当前时间动态创建dom结构
    var curTimeArr = getTimeArr();
    for(var i = 0; i < timeList.length; i++){
      var img = document.createElement('img');
      img.src = './imgs/'+ curTimeArr[i] +'.png';
      timeList[i].appendChild(img);
    }
    // 图片切换动画开始
    setInterval(changeWholeImg, timeDuration);
  }

  // 特定数字的图片切换动画
  function changeSingleImg(index, nextNumber){
    var timeItem = timeList[index];
    var img = document.createElement('img');
    img.src = './imgs/'+ nextNumber +'.png';
    timeItem.appendChild(img);
    createAnimation({
      from: 0,
      to: -imgHeight,
      duration: animationDuration,
      onmove: function(value){
        timeItem.firstElementChild.style.marginTop = value + 'px';
      },
      onend: function(){
        timeItem.firstElementChild.remove();
      }
    });
  }

  // 所有数字的图片切换动画
  function changeWholeImg(){
    var oldArr = getTimeArr();
    curTime = new Date(curTime.getTime() + 1000);
    var newArr = getTimeArr();
    for(var i = 0; i < timeList.length; i++){
      var curNumber = oldArr[i], nextNumber = newArr[i];
      if(curNumber !== nextNumber){
        changeSingleImg(i, nextNumber);
      }
    }
  }

  /**
   * 根据当前时间得到一个包含小时第一位数字、小时第二位数字、分钟第一位数字、
   * 分钟第二位数字、秒钟第一位数字、秒钟第二位数字组成的数组
   */
  function getTimeArr(){
    return curTime.toLocaleTimeString().replaceAll(':', '').split('').map(n => Number(n));
  }

  init();
})();