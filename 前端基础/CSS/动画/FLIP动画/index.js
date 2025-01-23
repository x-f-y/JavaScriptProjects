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