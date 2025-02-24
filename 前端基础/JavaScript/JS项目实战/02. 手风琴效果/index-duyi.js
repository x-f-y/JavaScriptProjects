(function(){
  var titles = document.querySelectorAll('.menu h2');
  var itemHeight = 30; // 每一个子菜单项的高度
  var duration = 300; // 展开/折叠子菜单的动画持续时间（ms）

  function openSubmenu(submenu){
    var status = submenu.getAttribute('status');
    if(status === 'opened' || status === 'playing'){
      return;
    }
    submenu.setAttribute('status', 'playing');
    createAnimation({
      from: 0,
      to: submenu.children.length * itemHeight,
      duration: duration,
      onmove: function(value){
        submenu.style.height = value + 'px';
      },
      onend: function(){
        submenu.setAttribute('status', 'opened');
      }
    });
  }

  function closeSubmenu(submenu){
    var status = submenu.getAttribute('status');
    if(status === null || status === 'closed' || status === 'playing'){
      return;
    }
    submenu.setAttribute('status', 'playing');
    createAnimation({
      from: submenu.children.length * itemHeight,
      to: 0,
      duration: duration,
      onmove: function(value){
        submenu.style.height = value + 'px';
      },
      onend: function(){
        submenu.setAttribute('status', 'closed');
      }
    });
  }

  function toggleSubmenu(submenu){
    var status = submenu.getAttribute('status');
    if(status === 'closed' || status === null){
      openSubmenu(submenu);
    }else if(status === 'opened'){
      closeSubmenu(submenu);
    }
  }

  
  for(var i = 0; i < titles.length; i++){
    titles[i].onclick = function(){
      var openedSubmenu = document.querySelector('.submenu[status="opened"');
      if(openedSubmenu){
        closeSubmenu(openedSubmenu);
      }
      toggleSubmenu(this.nextElementSibling);
    };
  }
})();