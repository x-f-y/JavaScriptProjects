(function(){
  var doms = {
    lotteryTimes: document.querySelector('.lottery-times'),
    priceList: document.querySelectorAll('.price-list-item'),
    dialogContainer: document.querySelector('.dialog-container'),
    dialogContainerContent: document.querySelector('.dialog-container .content'),
    dialogContainerBtn: document.querySelector('.dialog-container .btn'),
    dialogContainerClose: document.querySelector('.dialog-container .close'),
    startBtn: document.querySelector('.center-control .start')
  };
  var lotteryRemain = 5; // 剩余抽奖次数
  var timer = null; // 计时器标识
  var terminateIndex = 0; // 每跳一格，该值+1，用于游戏终止判断

  // 初始化：修改抽奖次数，注册事件监听
  function init(){
    doms.lotteryTimes.textContent = lotteryRemain;
    initEvent();
  }

  // 事件监听
  function initEvent(){
    doms.startBtn.addEventListener('click', raffle);
    doms.dialogContainerClose.addEventListener('click', closeDialog);
  }

  // 抽奖
  function raffle(){
    // 抽奖正在进行中或者抽奖次数不足，则直接返回
    if(timer !== null || lotteryRemain <= 0){
      return;
    }
    // 重置上一次抽奖结果的奖品的高亮效果
    var temp = document.querySelector('.price-list-item.active');
    if(temp){
      temp.classList.remove('active');
    }
    lotteryRemain--;
    doms.lotteryTimes.textContent = lotteryRemain;
    closeDialog();
    doms.startBtn.style.cursor = 'not-allowed';
    var gameResult = Math.floor(Math.random() * 8); // 最终奖品索引 [0, 7]
    var gameLoopNum = Math.floor(Math.random() * 3 + 2); // 转的圈数 [2, 4]
    var index = -1; // 本轮抽奖高亮的奖品索引
    // 开始本轮抽奖
    timer = setInterval(function(){
      terminateIndex++;
      if(index >= 0 && index <= doms.priceList.length - 1){
        doms.priceList[index].classList.remove('active');
      }
      index = (index + 1) % doms.priceList.length;
      doms.priceList[index].classList.add('active');
      if(terminateIndex >= gameLoopNum * doms.priceList.length + gameResult + 1) {
        // 游戏终止
        clearInterval(timer);
        timer = null;
        terminateIndex = 0;
        if(lotteryRemain > 0){
          doms.startBtn.style.cursor = 'pointer';
        }
        openDialog(index);
      }
    }, 100);
  }

  // 打开奖品对话框，参数为奖品索引
  function openDialog(index){
    var status = doms.dialogContainer.getAttribute('status');
    if(status === 'opened'){
      return;
    }
    doms.dialogContainer.style.display = 'block';
    doms.dialogContainer.setAttribute('status', 'opened');
    var priceContent, btnContent;
    if(index === 4){
      priceContent = '谢谢参与！';
    }else{
      priceContent = '恭喜您获得'+ doms.priceList[index].querySelector('span').textContent +'！';
    }
    if(lotteryRemain > 0){
      btnContent = '再来一次';
      doms.dialogContainerBtn.onclick = raffle;
    }else{
      btnContent = '确定';
      doms.dialogContainerBtn.onclick = closeDialog;
    }
    doms.dialogContainerContent.textContent = priceContent;
    doms.dialogContainerBtn.textContent = btnContent;
  }

  // 关闭奖品对话框
  function closeDialog(){
    var status = doms.dialogContainer.getAttribute('status');
    if(!status || status === 'closed'){
      return;
    }
    doms.dialogContainer.style.display = 'none';
    doms.dialogContainer.setAttribute('status', 'closed');
  }

  init();
})();