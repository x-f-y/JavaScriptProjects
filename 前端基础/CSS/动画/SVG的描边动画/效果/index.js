const body = document.body;
const menu = body.querySelector('.menu');
const menuItems = menu.querySelectorAll('.menu_item');
const menuBorder = menu.querySelector('.menu_border');
let activeItem = menu.querySelector('.active');
const paths = menu.querySelectorAll('.path');
const bodyBgColors = ['#ffb457', '#ff96bd', '#9999fb', '#ffe797', '#cffff1'];

function handleItemClick(item, index){
  if(item === activeItem){
    return;
  }
  activeItem.classList.remove('active');
  item.classList.add('active');
  activeItem = item;
  body.style.backgroundColor = bodyBgColors[index];
  offsetMenuBorder();
} 

function offsetMenuBorder(){
  const menuRect = menu.getBoundingClientRect();
  const menuBorderRect = menuBorder.getBoundingClientRect();
  const activeItemRect = activeItem.getBoundingClientRect();
  const offsetX = activeItemRect.left - menuRect.left - (menuBorderRect.width - activeItemRect.width) / 2;
  menuBorder.style.transform = `translateX(${offsetX}px)`;
}

menuItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    handleItemClick(item, index);
  });
});

paths.forEach(path => {
  const length = path.getTotalLength();
  path.style.setProperty('--length', length);
});