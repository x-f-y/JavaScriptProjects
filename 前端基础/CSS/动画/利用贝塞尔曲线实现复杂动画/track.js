const ball = document.querySelector('.ball');
const trace = document.querySelector('.trace');

trace.addEventListener('animationend', e => {
  // 擦除小球的运动轨迹
  e.target.remove();
});

// 绘制小球的运动轨迹
function drawTrace(){
  const rect = ball.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  trace.insertAdjacentHTML('beforeend', `<div class="dot" style="left: ${x}px; top: ${y}px"></div>`);
  requestAnimationFrame(drawTrace);
}

drawTrace();