(function(){
  var imgBox = $('.imgBox');
  var imgBlock = $('.imgBlock');
  var imgGap = $('.imgGap');
  var changeImg = $('.changeImg');
  var title = $('.imgContainer > h3');
  var btn = $('.btn');
  var span = $('.slider > span');
  
  var blockSize = 50; // 可拖动的图片块和缺口块的尺寸
  var sliderOffsetRange = { minLeft: -2, maxLeft: 211 }; // 滑块横向偏移量的取值范围
  
  function $(selector){
    return document.querySelector(selector);
  }
  
  function getRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function initImgBox(){
    // 设置随机背景图
    var url = "url(./imgs/t" + getRandom(1, 5) + ".png)";
    imgBox.style.backgroundImage = url;
    imgBlock.style.backgroundImage = url;
    // 随机设置缺口块的横纵偏移量
    var top = getRandom(0, imgBox.clientHeight - blockSize);
    var left = getRandom(imgBox.clientWidth / 2, imgBox.clientWidth - blockSize);
    imgGap.style.top = top + 'px';
    imgGap.style.left = left + 'px';
    // 设置可拖动的图片块的横纵偏移量
    imgBlock.style.left = '0px';
    imgBlock.style.top = top + 'px';
    // 设置可拖动的图片块背景图的位置
    imgBlock.style.backgroundPosition = '-' + left + 'px -' + top + 'px';
  }
  
  // 初始化
  function init(){
    initImgBox();
    // 设置可拖动的图片块和缺口块的尺寸
    imgBox.style.setProperty('--blockSize', blockSize);
    // 设置滑块的初始横向偏移量
    btn.style.left = sliderOffsetRange.minLeft + 'px';
  }
  
  init();
  
  btn.onmousedown = function(e){
    title.textContent = '拖动图片完成验证';
    title.style.color = 'black';
    span.style.opacity = 0;
    imgBlock.style.transition = 'none';
    btn.style.transition = 'none';
    var originX = e.clientX;
    window.onmousemove = function(e){
      var targetX = e.clientX;
      var curLeft = targetX - originX + sliderOffsetRange.minLeft;
      // 边界判断
      if(curLeft < sliderOffsetRange.minLeft){
        curLeft = sliderOffsetRange.minLeft;
      }
      if(curLeft > sliderOffsetRange.maxLeft){
        curLeft = sliderOffsetRange.maxLeft;
      }
      // 设置滑块的水平偏移量
      btn.style.left = curLeft + 'px';
      // 设置可拖动的图片块的水平偏移量
      var radioX = (imgBox.clientWidth - blockSize) / (sliderOffsetRange.maxLeft - sliderOffsetRange.minLeft);
      imgBlock.style.left = radioX * (curLeft - sliderOffsetRange.minLeft) + 'px';
    };
    window.onmouseup = function(){
      // 验证拖动结果
      var disLeft = imgBlock.offsetLeft - imgGap.offsetLeft;
      if(Math.abs(disLeft) < 5){
        title.textContent = '验证成功';
        title.style.color = 'green';
        btn.onmousedown = null;
        changeImg.onclick = null;
      }else{
        title.textContent = '验证失败';
        title.style.color = 'red';
        span.style.opacity = 1;
        imgBlock.style.transition = '0.5s';
        imgBlock.style.left = '0px';
        btn.style.transition = '0.5s';
        btn.style.left = sliderOffsetRange.minLeft + 'px';
      }
      window.onmousemove = null;
      window.onmouseup = null;
    };
  };
  
  changeImg.onclick = initImgBox;
})();
