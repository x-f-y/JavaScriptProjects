(async () => {
  const doms = {
    audio: document.querySelector('audio'),
    ul: document.querySelector('.lrc')
  };
  const size = {
    containerHeight: 420, // 容器高度
    liHeight: 30 // 每一句歌词的高度
  };
  let lrcData = []; // 歌词数据
  
  // 从网络获取歌词数据（字符串）
  async function getLrc() {
    return await fetch('https://study.duyiedu.com/api/lyrics')
      .then(resp => resp.json())
      .then(resp => resp.data);
  }
  
  // 解析歌词字符串
  function parseLrc(lrcStr){
    return lrcStr.trim().split('\n').map(lrc => {
      const timeArr = lrc.slice(0, 10).replace('[', '').replace(']', '').split(':');
      return {
        time: +timeArr[0] * 60 + +timeArr[1],
        words: lrc.slice(10)
      };
    });
  }
  
  async function init(){
    let lrc = await getLrc();
    lrcData = parseLrc(lrc);
    const htmlStr = lrcData.map(lrcObj => `<li>${lrcObj.words}</li>`).join('');
    doms.ul.innerHTML = htmlStr;
  }
  
  await init();
  
  doms.audio.addEventListener('timeupdate', function(){
    setLrcStatus(this.currentTime);
  });
  
  function setLrcStatus(time){
    // 微调
    time += 0.5;
    // 去除之前li的选中效果
    const activeLi = document.querySelector('.container ul li.active');
    activeLi && activeLi.classList.remove('active');
    // 获取当前时间对应的歌词索引
    const index = lrcData.findIndex(obj => obj.time > time) - 1;
    if(index < 0){
      return;
    }
    // 设置当前li的选中效果
    doms.ul.children[index].classList.add('active');
    // 设置ul的偏移量
    let top = (index + 0.5) * size.liHeight - size.containerHeight / 2;
    if(top < 0){
      top = 0;
    }
    doms.ul.style.transform = `translateY(${-top}px)`;
  }
})();
