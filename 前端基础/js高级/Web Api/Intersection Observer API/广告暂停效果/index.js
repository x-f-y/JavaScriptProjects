const video = document.querySelector('video');
const ob = new IntersectionObserver((entries) => {
  const entry = entries[0];
  if(entry.isIntersecting){
    // video元素的可见度大于60%
    video.play();
  }else{
    // video元素的可见度小于60%
    video.pause();
  }
}, {
  threshold: 0.6
});
ob.observe(video);