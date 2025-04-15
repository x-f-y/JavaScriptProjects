import getComponentRootDom from "./getComponentRootDom";
import styles from './showMessage.module.less';
import Icon from '@/components/Icon';

/**
 * 弹出消息
 * content -> 消息内容
 * type -> 消息类型 info、error、success、warn
 * duration -> 消息显示的持续时间（单位：ms）
 * container -> 消息DOM元素所在的容器（消息会显示到该容器的正中间）
 * callback -> 回调函数
 */
export default function({
  content = '',
  type = 'info',
  duration = 2000,
  container = document.body
} = {}, callback){

  if(getComputedStyle(container).position === 'static' && container !== document.body){
    container.style.position = 'relative';
  }

  // 创建容器元素
  const div = document.createElement('div');
  const typeClassName = `message-${type}`;
  div.className = `${styles.message} ${styles[typeClassName]}`;
  div.addEventListener('animationend', function(){
    // 移除container的position内联样式
    container.style.position = '';
    // 销毁DOM元素
    this.remove();
    // 运行回调函数
    callback && callback();
  });

  // 创建图标元素
  const icon = getComponentRootDom(Icon, { type });
  icon.classList.add(styles.icon);

  // 创建文本元素
  const span = document.createElement('span');
  span.innerText = content;

  div.appendChild(icon);
  div.appendChild(span);
  container.appendChild(div);

  // 强制渲染
  div.clientWidth;
  div.classList.add(styles.appear);

  setTimeout(() => {
    div.classList.add(styles.disappear);
  }, duration);
}