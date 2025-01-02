// 单件商品
class UIGood {
  constructor(good){
    this.data = good;
    this.choose = 0;
  }
  // 获取单件商品的总价
  getTotalPrice(){
    return this.data.price * this.choose;
  }
  // 是否选中了此件商品
  isChoose(){
    return this.choose > 0;
  }
  // 选择的数量+1
  increase(){
    this.choose++;
  }
  // 选择的数量-1
  decrease(){
    if(this.choose === 0){
      return;
    }
    this.choose--;
  }
}

// 整个界面的数据
class UIData {
  constructor(goods){
    const uiGoods = [];
    for(let i = 0; i < goods.length; i++){
      const uig = new UIGood(goods[i]);
      uiGoods.push(uig);
    }
    this.uiGoods = uiGoods;
    this.deliveryThreshold = 30;
    this.deliveryPrice = 5;
  }
  // 增加某件商品的选择数量
  increase(index){
    this.uiGoods[index].increase();
  }
  // 减少某件商品的选择数量
  decrease(index){
    this.uiGoods[index].decrease();
  }
  // 是否选中了某件商品
  isChoose(index){
    return this.uiGoods[index].isChoose();
  }
  // 获取所有商品的总价
  getTotalPrice(){
    let sum = 0;
    for(let i = 0; i < this.uiGoods.length; i++){
      sum += this.uiGoods[i].getTotalPrice();
    }
    return sum;
  }
  // 获取所有商品总的选择数量
  getTotalChooseNumber(){
    let sum = 0;
    for(let i = 0; i < this.uiGoods.length; i++){
      sum += this.uiGoods[i].choose;
    }
    return sum;
  }
  // 购物车中是否有商品
  hasGoodsInCar(){
    return this.getTotalChooseNumber() > 0;
  }
  // 总价是否达到配送门槛
  isCrossDeliveryThreshold(){
    return this.getTotalPrice() >= this.deliveryThreshold;
  }
}

// 整个界面
class UI {
  constructor(goods){
    this.uiData = new UIData(goods);
    this.doms = {
      goodsContainer: document.querySelector('.goods-list'),
      footerCar: document.querySelector('.footer-car'),
      footerCarBadge: document.querySelector('.footer-car-badge'),
      deliveryPrice: document.querySelector('.footer-car-tip'),
      totalPrice: document.querySelector('.footer-car-total'),
      footerPay: document.querySelector('.footer-pay'),
      footerPayInnerSpan: document.querySelector('.footer-pay span'),
    };
    this.createHTML();
    this.updateFooter();
    this.listenEvent();
  }
  // 根据商品数据创建商品列表的DOM元素
  createHTML(){
    let html = '';
    for(let i = 0; i < this.uiData.uiGoods.length; i++){
      const g = this.uiData.uiGoods[i];
      html += `
      <div class="goods-item">
        <img src="${g.data.pic}" alt="" class="goods-pic">
        <div class="goods-info">
          <h2 class="goods-title">${g.data.title}</h2>
          <p class="goods-desc">${g.data.desc}</p>
          <p class="goods-sell">
            <span>月售 ${g.data.sellNumber}</span>
            <span>好评率${g.data.favorRate}%</span>
          </p>
          <div class="goods-confirm">
            <p class="goods-price">
              <span class="goods-price-unit">￥</span>
              <span>${g.data.price}</span>
            </p>
            <div class="goods-btns">
              <i data-index="${i}" class="iconfont i-jianhao"></i>
              <span>${g.choose}</span>
              <i data-index="${i}" class="iconfont i-jiajianzujianjiahao"></i>
            </div>
          </div>
        </div>
      </div>
      `;
    }
    this.doms.goodsContainer.innerHTML = html;
  }
  // 监听各种事件
  listenEvent(){
    const _this = this;
    // 加减按钮的点击事件
    this.doms.goodsContainer.addEventListener('click', function(e){
      const index = e.target.dataset.index;
      if(index){
        if(e.target.classList.contains('i-jianhao')){
          _this.decrease(Number(index));
        }else if(e.target.classList.contains('i-jiajianzujianjiahao')){
          _this.increase(Number(index));
        }
      }
    });
    // 监听购物车抖动动画的结束事件
    this.doms.footerCar.addEventListener('animationend', function(){
      _this.doms.footerCar.classList.remove('animate');
    });
  }
  // 增加一件商品
  increase(index){
    // 数据逻辑
    this.uiData.increase(index);
    // 界面逻辑
    this.updateGoodsItem(index);
    this.updateFooter();
    this.jump(index);
  }
  // 减少一件商品
  decrease(index){
    // 数据逻辑
    this.uiData.decrease(index);
    // 界面逻辑
    this.updateGoodsItem(index);
    this.updateFooter();
  }
  // 更新某个商品元素的显示状态
  updateGoodsItem(index){
    const goodsItem = this.doms.goodsContainer.children[index];
    if(this.uiData.isChoose(index)){
      goodsItem.classList.add('active');
    }else{
      goodsItem.classList.remove('active');
    }
    const span = goodsItem.querySelector('.goods-btns span');
    span.textContent = this.uiData.uiGoods[index].choose;
  }
  // 更新页脚
  updateFooter(){
    // 购物车商品总价
    const totalPrice = this.uiData.getTotalPrice();
    // 还差多少钱达到配送门槛
    const dist = Math.round(this.uiData.deliveryThreshold - totalPrice);
    // 更新购物车状态
    if(this.uiData.hasGoodsInCar()){
      this.doms.footerCar.classList.add('active');
      this.doms.footerCarBadge.textContent = this.uiData.getTotalChooseNumber();
    }else{
      this.doms.footerCar.classList.remove('active');
    }
    // 设置商品总价
    this.doms.totalPrice.textContent = totalPrice.toFixed(2);
    // 设置配送费
    this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliveryPrice}`;
    // 更新结算状态
    if(this.uiData.isCrossDeliveryThreshold()){
      this.doms.footerPay.classList.add('active');
    }else{
      this.doms.footerPay.classList.remove('active');
      this.doms.footerPayInnerSpan.textContent = `还差￥${dist}元起送`;
    }
  }
  // 购物车的抖动动画
  shake(){
    this.doms.footerCar.classList.add('animate');
  }
  // 添加按钮的抛物线动画
  jump(index){
    const sourceRect = this.doms.goodsContainer.children[index].querySelector('.i-jiajianzujianjiahao').getBoundingClientRect();
    // 跳跃的初始位置
    const jumpSource = {
      x: sourceRect.left,
      y: sourceRect.top
    };
    const targetRect = this.doms.footerCar.getBoundingClientRect();
    // 跳跃的结束位置
    const jumpTarget = {
      x: targetRect.left + (targetRect.width - sourceRect.width) / 2,
      y: targetRect.top + (targetRect.height - sourceRect.height) / 2
    };
    // 创建抛物线元素的dom结构
    const div = document.createElement('div');
    div.className = 'parabola';
    const i = document.createElement('i');
    i.className = 'iconfont i-jiajianzujianjiahao';
    div.appendChild(i);
    document.body.appendChild(div);
    // 抛物线动画结束后删除dom元素并运行购物车抖动动画
    div.addEventListener('transitionend', () => {
      div.remove();
      this.shake();
    }, {
      // 注意：有多少个css属性进行了过渡，transitionend这个事件就会触发多少次，为了避免多次触发，这里设置事件仅被触发一次
      once: true
    });
    //设置初始位置
    div.style.left = jumpSource.x + 'px';
    div.style.top = jumpSource.y + 'px';
    // 设置结束位置（外层div控制横向运动，里层i控制纵向运动）
    requestAnimationFrame(() => {
      div.style.transform = `translateX(${jumpTarget.x - jumpSource.x}px)`;
      i.style.transform = `translateY(${jumpTarget.y - jumpSource.y}px)`;
    });
  }
}

const ui = new UI(goods);