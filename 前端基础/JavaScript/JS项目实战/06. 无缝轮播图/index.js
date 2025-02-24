(function(){
  var doms = {
    carouselContainer: $('.carousel-container'),
    carouselList: $('.carousel-list'),
    indicator: $('.indicator'),
    arrowLeft: $('.arrow-left'),
    arrowRight: $('.arrow-right')
  };
  var containerWidth = doms.carouselContainer.clientWidth; // 容器宽度（也是每一张图片的宽度）
  var curIndex = 0; // 当前显示的图片索引
  var duration = 300; // 切换图片这个过程所耗费的时间（单位：ms）
  var isPlaying = false; // 图片切换动画是否正在进行中
  var interval = 2000; // 轮播图自动切换的时间间隔（单位：ms）
  var timer = null; // 定时器标识
  var imgPaths = [
    './imgs/Wallpaper1.jpg',
    './imgs/Wallpaper2.jpg',
    './imgs/Wallpaper3.jpg',
    './imgs/Wallpaper4.jpg',
    './imgs/Wallpaper5.jpg',
  ];
  
  function $(selector){
    return document.querySelector(selector);
  }
  
  // 初始化
  function init(){
    // 根据图片路径数据动态生成dom结构
    for(var i = 0; i < imgPaths.length; i++){
      var img = document.createElement('img');
      img.className = 'carousel-item';
      img.src = imgPaths[i];
      doms.carouselList.appendChild(img);
      var div = document.createElement('div');
      div.className = 'indicator-item';
      doms.indicator.appendChild(div);
    }
    // 复制第一个carousel-item到最后一个，复制最后一个carousel-item到第一个
    var firstItem = doms.carouselList.children[0].cloneNode(true);
    var lastItem = doms.carouselList.children[imgPaths.length - 1].cloneNode(true);
    doms.carouselList.insertAdjacentElement('beforeend', firstItem);
    doms.carouselList.insertAdjacentElement('afterbegin', lastItem);
    // 设置carouselList的宽度和初始偏移量
    doms.carouselList.style.setProperty('width', doms.carouselList.children.length + '00%');
    doms.carouselList.style.setProperty('margin-left', -containerWidth + 'px');
    // 设置indicator的初始选中状态
    doms.indicator.children[0].classList.add('active');
    // 监听事件
    initEvent();
    // 轮播图自动切换
    autoStart();
  }
  
  // 切换到指定的图片
  function moveTo(newIndex){
    if(isPlaying || (newIndex === curIndex) || (newIndex < 0 || newIndex > imgPaths.length - 1)){
      return;
    }
    isPlaying = true;
    $('.indicator-item.active').classList.remove('active');
    doms.indicator.children[newIndex].classList.add('active');
    var from = parseFloat(doms.carouselList.style.marginLeft);
    var to = -containerWidth * (newIndex + 1);
    createAnimation({
      from: from,
      to: to,
      duration: duration,
      onmove: function(value){
        doms.carouselList.style.setProperty('margin-left', value + 'px');
      },
      onend: function(){
        isPlaying = false;
        curIndex = newIndex;
      }
    });
  }
  
  // 切换到下一张图片
  function toNext(){
    if(curIndex === imgPaths.length - 1) {
      doms.carouselList.style.setProperty('margin-left', '0px');
      moveTo(0);
    } else {
      moveTo(curIndex + 1);
    }
  }
  
  // 切换到上一张图片
  function toPrev(){
    if(curIndex === 0) {
      doms.carouselList.style.setProperty('margin-left', -containerWidth * (imgPaths.length + 1) + 'px');
      moveTo(imgPaths.length - 1);
    } else {
      moveTo(curIndex - 1);
    }
  }
  
  // 开始自动轮播
  function autoStart(){
    if(timer){
      return;
    }
    timer = setInterval(toNext, interval);
  }
  
  // 停止自动轮播
  function autoStop(){
    clearInterval(timer);
    timer = null;
  }
  
  // 处理事件监听
  function initEvent(){
    doms.arrowLeft.onclick = toPrev;
    doms.arrowRight.onclick = toNext;
    doms.carouselContainer.onmouseenter = autoStop;
    doms.carouselContainer.onmouseleave = autoStart;
    for(var i = 0; i < doms.indicator.children.length; i++){
      (function(i){
        doms.indicator.children[i].onclick = function(){
          moveTo(i);
        };
      })(i);
    }
  }
  
  init();
})();