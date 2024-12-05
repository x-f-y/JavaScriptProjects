// 定义游戏区域的宽度和高度
const stage_width = 400;
const stage_height = 500;
const tss = document.getElementById('tss');
tss.style.setProperty('--w', stage_width + 'px');
tss.style.setProperty('--h', stage_height + 'px');

// 定义横向和纵向，蛇每次移动的距离（单位：像素）
export const X_STEP = 10;
export const Y_STEP = 10;

// 定义横向和纵向，蛇从一端到另一端需要移动的次数
export const X_TIMES = stage_width / X_STEP;
export const Y_TIMES = stage_height / Y_STEP;

// 定义用来生成随机位置的函数
export function generateRandomPositon(){
  const x = Math.floor(Math.random() * X_TIMES) * X_STEP;
  const y = Math.floor(Math.random() * Y_TIMES) * Y_STEP;
  return [x, y];
}