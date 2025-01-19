/**
 * FLIP动画实现步骤：
 *  1. First
 *    记录元素在初始状态下的位置和尺寸（可以使用getBoundingClientRect()这个API来处理）
 *  2. Last
 *    执行一段代码，让元素发生相应的变化，并记录元素在最后状态下的位置和尺寸
 *  3. Invert
 *    计算元素在初始状态（first）和最后状态（last）之间的变化，通过transform来改变元素的位置和尺寸，从而营造
 *    一种元素位于初始状态下的一个错觉
 *  4. Play
 *    移除上一步中为元素添加的transform（可以将transform设置为none），由于失去了transform的约束，所以元素会
 *    向本该在的位置（last）变化，如果再给元素加上transition，那么这个过程自然就会以一种动画的形式呈现了
 */

// 控制单个dom元素的flip动画
class FlipDom {
  constructor(dom, duration){
    this.dom = dom; // 要运行flip动画的dom元素
    this.duration = duration; // 动画持续时间
    this.firstPos = { // 初始位置
      left: null,
      top: null
    };
    // First
    this.recordFirst();
    this.dom.addEventListener('transitionend', () => {
      // 动画结束后重新计算初始位置
      this.recordFirst();
    });
  }
  recordFirst(){
    const rect = this.getDomRect();
    this.firstPos.left = rect.left;
    this.firstPos.top = rect.top;
  }
  getDomRect(){
    const rect = this.dom.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top
    };
  }
  play(){
    // Last
    const lastPos = this.getDomRect();
    // Invert
    const invert = {
      delaX: this.firstPos.left - lastPos.left,
      delaY: this.firstPos.top - lastPos.top
    };
    if(!invert.delaX && !invert.delaY){
      // 位置未发生变化，直接返回
      return;
    }
    this.dom.style.transition = 'none';
    this.dom.style.transform = `translate(${invert.delaX}px, ${invert.delaY}px)`;
    // Play
    document.body.clientWidth;
    this.dom.style.transition = this.duration;
    this.dom.style.removeProperty('transform');
    // 注意这里不能使用requestAnimationFrame，会导致最后一个list-item没有动画效果。具体原因还有待探究
    // requestAnimationFrame(() => {
    //   this.dom.style.transition = this.duration;
    //   this.dom.style.removeProperty('transform');
    // });
  }
}

// 控制多个dom元素的flip动画
class Flip {
  constructor(doms, duration){
    this.doms = [...doms];
    this.duration = duration;
    this.flipDoms = this.doms.map(dom => new FlipDom(dom, this.duration));
    this.watch();
  }
  // 监听doms的新增和删除（Mutation Observer API）
  watch(){
    const observer = new MutationObserver((mutationList, observer) => {
      mutationList.forEach(mutation => {
        if(mutation.type === 'childList'){
          const addedNodes = [...mutation.addedNodes].filter(node => node.nodeType === 1);
          const removedNodes = [...mutation.removedNodes].filter(node => node.nodeType === 1);
          for(let i = 0; i < addedNodes.length; i++) {
            this.flipDoms.push(new FlipDom(addedNodes[i], this.duration));
          }
          for(let j = 0; j < removedNodes.length; j++){
            this.flipDoms = this.flipDoms.filter(flipDom => flipDom.dom !== removedNodes[j]);
          }
        }
      });
    });
    const obTarget = this.doms[0].parentElement;
    observer.observe(obTarget, {
      childList: true, // 观察子节点的变化
      subtree: false // 不观察子节点的子节点
    });
  }
  play(){
    this.flipDoms.forEach(flipDom => flipDom.play());
  }
}

const list = document.querySelector('.list');
const btnAdd = document.querySelector('.btn-add');
const btnDelete = document.querySelector('.btn-delete');
const btnDisorder = document.querySelector('.btn-disorder');
const detailItem = document.querySelector('.detail');
const detailImg = document.querySelector('.detail img');
const detailContent = document.querySelector('.detail .content');
let flip = null; // 用于控制.list中img的flip动画
const flipDuration = '500ms'; // .list中img的flip动画的持续时间
let currentPreviewImg = null; // 当前的预览图片
const previewDuration = 500; // 图片预览动画的持续时间（单位：毫秒）
let lastImgId = 20; // 最后一张图片的id（作用：让每一个list-item都对应一张唯一确定的图片）

// 创建html结构
function createHTML(num){
  for(let i = 0; i < num; i++){
    const div = document.createElement('div');
    div.className = 'list-item';
    div.innerHTML = `
      <img src="https://picsum.photos/id/${lastImgId}/300/200" alt="">
      <input type="checkbox">
      <a href="javascript:void(0);" class="delete">删除</a>
    `;
    list.appendChild(div);
    lastImgId++;
  }
}

// 获取[min,max]范围内的随机整数
function getRandom(min, max){
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

// 打开图片预览
function openPreview(){
  detailImg.setAttribute('src', currentPreviewImg.getAttribute('src'));
  detailItem.style.visibility = 'visible';
  // First
  const firstRect = currentPreviewImg.getBoundingClientRect();
  // Last
  const lastRect = detailImg.getBoundingClientRect();
  // Invert
  const invert = {
    delaX: firstRect.left - lastRect.left,
    delaY: firstRect.top - lastRect.top,
    delaW: firstRect.width / lastRect.width,
    delaH: firstRect.height / lastRect.height
  };
  // Play（Web Animations API）
  detailContent.classList.add('appear');
  detailImg.animate([
    {
      transform: `translate(${invert.delaX}px, ${invert.delaY}px) scale(${invert.delaW}, ${invert.delaH})`
    },
    {
      transform: 'none'
    }
  ], {
    duration: previewDuration,
    easing: 'ease-in-out'
  });
}

// 关闭图片预览
function closePreview(){
  detailItem.style.visibility = 'hidden';
  // First
  const firstRect = detailImg.getBoundingClientRect();
  // Last
  const lastRect = currentPreviewImg.getBoundingClientRect();
  // Invert
  const invert = {
    delaX: firstRect.left - lastRect.left,
    delaY: firstRect.top - lastRect.top,
    delaW: firstRect.width / lastRect.width,
    delaH: firstRect.height / lastRect.height
  };
  // Play（Web Animations API）
  detailContent.classList.remove('appear');
  currentPreviewImg.animate([
    {
      zIndex: 2,
      transform: `translate(${invert.delaX}px, ${invert.delaY}px) scale(${invert.delaW}, ${invert.delaH})`
    },
    {
      zIndex: 2,
      transform: 'none'
    }
  ], {
    duration: previewDuration
  });
}

// 初始化
function init(){
  createHTML(9);
  flip = new Flip(list.children, flipDuration);
  detailContent.style.setProperty('--duration', previewDuration);
}

init();

btnAdd.onclick = function(){
  const item = document.createElement('div');
  item.className = 'list-item';
  item.insertAdjacentHTML('beforeend', '<input type="checkbox">');
  item.insertAdjacentHTML('beforeend', '<a href="javascript:void(0);" class="delete">删除</a>');
  const img = new Image();
  img.onload = function(){
    item.insertAdjacentElement('afterbegin', this);
    list.insertAdjacentElement('afterbegin', item);
    lastImgId++;
    flip.play();
  };
  img.src = `https://picsum.photos/id/${lastImgId}/300/200`;
};

btnDelete.onclick = function(){
  document.querySelectorAll('.list-item:has(input[type="checkbox"]:checked)').forEach(v => v.remove());
  flip.play();
};

btnDisorder.onclick = function(){
  const length = list.children.length;
  for(let i = 0; i < length; i++){
    const index = getRandom(i, length - 1);
    list.insertBefore(list.children[index], list.children[i]);
  }
  flip.play();
};

list.onclick = function(e){
  const node = e.target;
  if(node.classList.contains('delete')){
    node.parentElement.remove();
    flip.play();
  }else if(node.nodeName === 'IMG'){
    currentPreviewImg = node;
    openPreview();
  }
};

detailItem.onclick = function(){
  closePreview();
}