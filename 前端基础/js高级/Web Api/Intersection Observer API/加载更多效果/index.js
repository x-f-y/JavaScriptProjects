class Masonry {
  constructor(config){
    this.container = config.container; // 进行瀑布流布局的容器元素
    this.columnCount = config.columnCount; // 要分多少列
    this.rowGap = config.rowGap; // 行之间的间隙（单位：px）
    this.columnGap = config.columnGap; // 列之间的间隙（单位：px）
    this.defaultImgPath = './default.png'; // 加载错误的图片的默认路径
    this.nextTopArr = new Array(this.columnCount).fill(0); // 数组的长度为列数，每一项为该列下一张图片的纵坐标
    this.columnWidth = this._getColumnWidth(); // 每一列的宽度
    this.container.style.position = 'relative';
    this.isLoading = false; // 是否正在向容器中添加图片
  }

  // 计算列的宽度
  _getColumnWidth(){
    const containerWidth = this.container.clientWidth;
    const remain = containerWidth - (this.columnCount - 1) * this.columnGap;
    return remain / this.columnCount;
  }

  // 批量创建图片元素
  _createImages(count){
    const imgList = [];
    for(let i = 0; i < count; i++){
      const img = new Image();
      const imgWidth = 300;
      const imgHeight = Math.floor(Math.random() * (500 - 200 + 1) + 200); // [200, 500]
      img.src = 'http://picsum.photos/' + imgWidth + '/' + imgHeight + '?random=' + Math.random();
      imgList.push(img);
    }
    return imgList;
  }

  // 对图片进行布局
  _layout(imgs){
    for(let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      img.style.position = 'absolute';
      img.style.width = this.columnWidth + 'px';
      const top = Math.min(...this.nextTopArr);
      const columnIndex = this.nextTopArr.indexOf(top);
      // 设置图片的位置
      img.style.top = top + 'px';
      img.style.left = columnIndex * (this.columnGap + this.columnWidth) + 'px';
      // 更新nextTopArr
      this.nextTopArr[columnIndex] += (img.height + this.rowGap);
    }
    // 设置容器的高度
    this.container.style.height = Math.max(...this.nextTopArr) - this.rowGap + 'px';
  }

  // 等待图片加载完成
  _onImagesloaded(imgs) {
    return new Promise((resolve, reject) => {
      let loadedImgCounter = 0;
      const checkAndResolve = () => {
        loadedImgCounter++;
        if(loadedImgCounter === imgs.length){
          resolve();
        }
      }
      for(const img of imgs){
        if(img.complete){
          checkAndResolve();
        }else{
          img.onload = checkAndResolve;
          img.onerror = () => {
            img.onerror = null; // 避免在加载默认图片时触发错误循环
            img.src = this.defaultImgPath;
          }
        }
      }
    })
  }

  // 向容器中添加图片
  async appendImages(count = 10) {
    if(this.isLoading){
      return;
    }
    this.isLoading = true;
    const imgs = this._createImages(count);
    await this._onImagesloaded(imgs);
    for(const img of imgs){
      this.container.appendChild(img);
    }
    this._layout(imgs);
    this.isLoading = false;
  }
}

const o = new Masonry({
  container: document.querySelector('.container'),
  columnCount: 5,
  rowGap: 20,
  columnGap: 20,
});
o.appendImages(30);

const spin = document.querySelector('.spin');
const ob = new IntersectionObserver((entries) => {
  const entry = entries[0];
  if(entry.isIntersecting){
    o.appendImages();
  }
}, {
  threshold: 0
});
ob.observe(spin);