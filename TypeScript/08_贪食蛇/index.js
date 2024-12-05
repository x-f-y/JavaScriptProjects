import GameControl from "./gameControl.js";

// 游戏开始
new GameControl();

// 由于游戏区域的尺寸是通过js设置的，这会导致界面刷新后有短时间的“显示异常”现象，解决方案是：
// 刚加载文档时，使用"display: block"属性将界面隐藏掉，在文档解析完成后，再去掉“display: block”属性，使界面能正常显示
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('tss').classList.remove('clock');
})