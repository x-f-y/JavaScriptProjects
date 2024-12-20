/**
 * 拖放事件
 *  1. drag
 *    在用户拖动元素的过程中每隔几百毫秒就会触发一次，e.target是拖动的那个元素
 *  2. dragstart
 *    拖放操作开始时触发，e.target是拖动的那个元素
 *  3. dragend
 *    拖放操作结束时触发，e.target是拖动的那个元素
 *  4. dragover
 *    可拖动的元素被拖动进入一个有效的放置目标时触发，e.target是拖动进入的那个元素，该事件每隔几百毫秒就会触发一次
 *  5. dragenter
 *    可拖动的元素被拖动进入一个有效的放置目标时触发，e.target是拖动进入的那个元素，被拖动的元素每进入一个目标位置，该事件就会触发一次
 *  6. dragleave
 *    可拖动的元素被拖动离开一个有效的放置目标时触发，e.target是拖动离开的那个元素，被拖动的元素每离开一个目标位置，该事件就会触发一次
 *  7. drop
 *    被拖动的元素被放置到一个有效的目标上时触发，e.target是最终放置的那个元素（注意：为确保drop事件始终按预期触发，应当在dragover事件回调中调用preventDefault()方法）
 */

const container = document.querySelector('.container');
let source = null; // 拖动的对象

// 判断给定的结点是否是合法的拖动结点
function isLegalSource(source){
  if(!source.dataset){
    return false;
  }
  return source.dataset.effect === 'copy' || source.dataset.effect === 'move';
}

// 判断给定的结点是否是合法的拖动进入的结点
function isLegalTarget(target){
  if(!target.dataset){
    return false;
  }
  return target.dataset.allow === 'copy' || target.dataset.allow === 'move';
}

// 清除背景颜色
function clearDropStyle(){
  document.querySelectorAll('.container .drop-over').forEach(item => {
    item.classList.remove('drop-over');
  })
}

// 从给定结点出发，往上递归（循环）查找第一个合法的放置位置，若找不到，返回null
function getDropNode(node){
  while(node !== document.body){
    if(isLegalTarget(node)){
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

container.addEventListener('dragstart', function(e){
  source = e.target;
  if(isLegalSource(source)){
    // 设置本次拖拉中允许的效果(复制和移动)
    e.dataTransfer.effectAllowed = 'copyMove';
  }
});

container.addEventListener('dragenter', function(e){
  const targetNode = getDropNode(e.target); // 最终的放置位置对应的元素结点
  // 拖动的结点或者最终放置的位置不合法，则直接返回
  if(!isLegalSource(source) || !targetNode){
    return;
  }
  // 清除之前的背景颜色
  clearDropStyle();
  // 给即将进入的元素结点添加背景颜色
  if(source.dataset.effect === targetNode.dataset.allow){
    targetNode.classList.add('drop-over');
  }
});

container.addEventListener('dragover', function(e){
  // 设置放下被拖拉结点时的效果
  e.dataTransfer.dropEffect = source.dataset.effect;
  const targetNode = getDropNode(e.target);
  if(targetNode && isLegalTarget(targetNode)){
    // 取消事件的默认行为，以允许将被拖拉的结点放入目标结点
    e.preventDefault();
  }
});

container.addEventListener('drop', function(e){
  const targetNode = getDropNode(e.target); // 最终的放置位置对应的元素结点
  // 拖动的结点或者最终放置的位置不合法，则直接返回
  if(!isLegalSource(source) || !targetNode){
    return;
  }
  // 清除之前的背景颜色
  clearDropStyle();
  if(source.dataset.effect === targetNode.dataset.allow){
    if(source.dataset.effect === 'copy'){
      // 复制一份课程到课程表中
      targetNode.innerHTML = '';
      const cloned = source.cloneNode(true);
      cloned.dataset.effect = 'move';
      targetNode.appendChild(cloned);
    }else if(source.dataset.effect === 'move'){
      // 从课程表中删除课程
      source.remove();
    }
  }
});