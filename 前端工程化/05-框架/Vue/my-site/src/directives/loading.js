import loadingUrl from '@/assets/loading.svg';
import styles from './loading.module.less';

// 获取el中loading效果的img元素
function getLoadingImg(el){
  return el.querySelector('img[data-role="loading"]');
}

// 创建loading效果的img元素
function createLoadingImg(){
  const img = document.createElement('img');
  img.src = loadingUrl;
  img.dataset.role = 'loading';
  img.className = styles.loading;
  return img;
}

export default function(el, binding){
  const curImg = getLoadingImg(el);
  if(binding.value){
    // 加载中
    if(!curImg){
      el.appendChild(createLoadingImg());
    }
  }else{
    // 加载完成
    if(curImg){
      curImg.remove();
    }
  }
}