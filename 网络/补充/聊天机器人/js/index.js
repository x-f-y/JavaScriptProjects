(function(){
  const doms = {
    nickName: document.querySelector('#nickname'),
    loginId: document.querySelector('#loginId'),
    chatContainer: document.querySelector('.chat-container'),
    msgContainer: document.querySelector('.msg-container'),
    txtMsg: document.querySelector('#txtMsg'),
    close: document.querySelector('.close')
  };
  let user; // 当前用户对象

  init();
  
  // 初始化
  async function init(){
    await loadUserInfo();
    await loadHistory();
    initEvent();
  }
  
  // 事件监听
  function initEvent(){
    doms.close.addEventListener('click', function(){
      API.loginOut();
      location.href = './login.html';
    });
    doms.msgContainer.addEventListener('submit', function(e){
      e.preventDefault();
      if(doms.txtMsg.value.trim() === ''){
        return;
      }
      sendChat(doms.txtMsg.value);
      doms.txtMsg.value = '';
    });
    doms.txtMsg.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){
        if(e.shiftKey){
          // 同时按下shift+enter，允许默认换行行为
          return;
        }else{
          // 仅按下enter，阻止默认换行行为并触发表单的提交事件
          e.preventDefault();
          doms.msgContainer.dispatchEvent(new Event('submit'));
        }
      }
    });
  }

  // 加载个人信息
  async function loadUserInfo(){
    const resp = await API.profile();
    if(resp.code){
      // 未登录状态
      alert(resp.msg);
      location.href = './login.html';
    }else{
      // 已登录状态
      user = resp.data;
      doms.nickName.innerText = user.nickname;
      doms.loginId.innerText = user.loginId;
    }
  }

  // 加载聊天历史记录
  async function loadHistory(){
    const resp = await API.getHistory();
    for(const chatInfo of resp.data){
      addChat(chatInfo);
    }
    scrollBottom();
  }

  // 发送消息
  async function sendChat(content){
    addChat({
      from: user.loginId,
      to: null,
      content,
      createdAt: Date.now()
    });
    scrollBottom();
    const resp = await API.sendChat(content);
    addChat({
      from: null,
      to: user.loginId,
      ...resp.data
    });
    scrollBottom();
  }

  // 滚动聊天区域的滚动条到底部
  function scrollBottom(){
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight - doms.chatContainer.clientHeight; 
  }
  
  // 根据传入的时间戳格式化时间
  function formatDate(timestamp){
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  
  // 根据消息对象，创建一条消息添加到页面中
  function addChat(chatInfo){
    const div = document.createElement('div');
    div.classList.add('chat-item');
    if(chatInfo.from){
      div.classList.add('me');
    }
  
    const img = document.createElement('img');
    img.className = 'chat-avatar';
    img.src = chatInfo.from ? './assets/avatar.png' : './assets/robot-avatar.jpg';
  
    const content = document.createElement('div');
    content.className = 'chat-content';
    content.innerText = chatInfo.content;
  
    const date = document.createElement('div');
    date.className = 'chat-date';
    date.innerText = formatDate(chatInfo.createdAt);
  
    div.appendChild(img);
    div.appendChild(content);
    div.appendChild(date);
  
    doms.chatContainer.appendChild(div);
  }
})();