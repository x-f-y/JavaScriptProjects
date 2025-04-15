import defaultGif from '@/assets/default.gif';

const loadedImgs = []; // 已经加载过的图片地址

const ob = new IntersectionObserver((entries) => {
  for(const entry of entries){
    if(entry.isIntersecting){
      // 图片出现在视口中，加载该图片
      const img = entry.target;
      const realSrc = img.dataset.src;
      img.src = realSrc;
      loadedImgs.push(realSrc);
      // 已经加载出来的图片，停止监听
      ob.unobserve(img);
    }
  }
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0
});

export default {
  bind(el, binding){
    const realSrc = binding.value;
    if(loadedImgs.includes(realSrc)){
      // 当前图片已经加载过
      el.src = realSrc;
    }else{
      // 当前图片之前没有加载过
      ob.observe(el);
      el.src = defaultGif;
      el.dataset.src = realSrc; // 记录真实的图片地址
    }
  },
  unbind(el){
    ob.unobserve(el);
  }
}