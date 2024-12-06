// 创建dom结构
function createDom(){
  const container = document.querySelector('.container');
  for(let i = 0; i < 100; i++){
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<img data-src="https://picsum.photos/200/300?random=${i+1}" src="./default.png">`;
    container.appendChild(div);
  }  
}

createDom();

// 使用intersection observer api实现懒加载效果
function lazyLoad(){
  const imgs = document.querySelectorAll('img[data-src]');
  const ob = new IntersectionObserver((entries) => {
    // 交叉的时候会运行该回调函数，在此例子中，该回调函数会运行两次
    // 一次是被监听元素刚准备进入root的时候（目标可见度大于0%），另一次是被监听元素完全离开root的时候（目标可见度小于0%）
    for(const entry of entries){
      // 若被监听元素与root边缘有交叉了，isIntersecting属性返回true，否则返回false
      if(entry.isIntersecting){
        // 使用target属性可以获取当前与root边缘有交叉的那个dom元素
        const img = entry.target;
        img.src = img.dataset.src;
        // 对于已经加载出来的图片，停止监听它
        ob.unobserve(img);
      }
    }
  }, {
    root: null, // 所监听元素的具体祖先元素。如果未传入值或值为null，则默认使用视口
    rootMargin: '0px', // 基于root的边缘进行扩散或收缩的偏移量，默认值是"0px 0px 0px 0px"
    threshold: 0 // 交叉的阈值，若为0，则表示被监听元素刚接触到root边缘的时候就运行回调函数；若为1，则表示被监听元素完全进入root的时候才运行回调函数，默认值是0.0
  });
  for(const img of imgs){
    // 监听每张图片
    ob.observe(img);
  }
}

lazyLoad();