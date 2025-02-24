(function(){
  var titles = document.querySelectorAll('.menu h2');
  var submenus = document.querySelectorAll('.menu .submenu');
  var itemHeight = 30; // 每一个菜单项的高度
  var curOpenedMenuIndex = -1; // 当前展开的子菜单的索引
  var duration = 300; // 展开/折叠子菜单的动画持续时间（ms）

  function openSubmenu(index){
    var menu = submenus[index];
    createAnimation({
      from: 0,
      to: menu.children.length * itemHeight,
      duration: duration,
      onmove: function(value){
        menu.style.height = value + 'px';
      }
    });
  }

  function closeSubmenu(index){
    var menu = submenus[index];
    createAnimation({
      from: menu.children.length * itemHeight,
      to: 0,
      duration: duration,
      onmove: function(value){
        menu.style.height = value + 'px';
      }
    });
  }

  for(var i = 0; i < titles.length; i++){
    (function(i){
      titles[i].onclick = function(){
        if(curOpenedMenuIndex === i){
          // 当前点击的子菜单处于展开状态
          // 折叠当前子菜单
          closeSubmenu(i);
          curOpenedMenuIndex = -1;
        }else{
          // 当前点击的子菜单处于折叠状态
          // 若其他子菜单有处于展开状态的，则关闭之
          if(curOpenedMenuIndex !== -1){
            closeSubmenu(curOpenedMenuIndex);
          }
          // 展开当前子菜单
          openSubmenu(i);
          curOpenedMenuIndex = i;
        }
      };
    })(i);
  }
})();