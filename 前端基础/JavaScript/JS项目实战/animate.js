var createAnimation = (function(){
  function createAnimation(options){
    if((options.from === undefined) || (options.to === undefined)){
      throw new Error('from and to are required');
    }
  
    var from = options.from; // 变化的初始值
    var to = options.to; // 变化的结束值
    var duration = options.duration || 1000; // 变化的总持续时间（ms）
    var gap = options.gap || 10; // 每一次变化的间隔时间（ms）
  
    var times = Math.ceil(duration / gap); // 变化的总次数
    var step = (to - from) / times; // 单次变化的量
    var curTimes = 0; // 已变化的次数
  
    var intervalId = setInterval(() => {
      from += step;
      curTimes++;
      options.onmove && options.onmove(from);
      if(curTimes >= times){
        // 变化完成
        from = to;
        clearInterval(intervalId);
        options.onmove && options.onmove(from);
        options.onend && options.onend();
      }
    }, gap);
  }

  return createAnimation;
})();


// 测试代码
/* createAnimation({
  from: 99,
  to: 0,
  duration: 2000,
  gap: 10,
  onmove: function(n){
    // 每变化一次，运行该函数。参数n为这一次变化后的值
    console.log('move', n);
  },
  onend: function(){
    // 变化结束后运行该函数
    console.log('end');
  }
}); */