const container = document.querySelector('.container');
const inp = document.querySelector('input[type="range"]');

function calc(){
  container.style.setProperty('--progress', inp.value);
}

calc();

inp.oninput = calc;