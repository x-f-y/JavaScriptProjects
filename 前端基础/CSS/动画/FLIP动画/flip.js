/**
 * FLIP动画实现步骤：
 *  1. First
 *    记录元素在初始状态下的位置和尺寸（可以使用getBoundingClientRect()这个API来处理）
 *  2. Last
 *    执行一段代码，让元素发生相应的变化，并记录元素在最后状态下的位置和尺寸
 *  3. Invert
 *    计算元素在初始状态（first）和最后状态（last）之间的变化，通过transform来改变元素的位置和尺寸，从而营造
 *    一种元素位于初始状态下的一个错觉
 *  4. Play
 *    移除上一步中为元素添加的transform（可以将transform设置为none），由于失去了transform的约束，所以元素会
 *    向本该在的位置（last）变化，如果再给元素加上transition，那么这个过程自然就会以一种动画的形式呈现了
 */

// 利用IIFE（立即执行函数）避免全局污染，只将Flip暴露到全局作用域（window）
var Flip = (function(){
  // 控制单个dom元素的flip动画
  class FlipDom {
    constructor(dom, duration){
      this.dom = dom; // 要运行flip动画的dom元素
      this.duration = duration; // 动画持续时间
      this.firstPos = { // 初始位置
        left: null,
        top: null
      };
      // First
      this.recordFirst();
      this.dom.addEventListener('transitionend', () => {
        // 动画结束后重新计算初始位置
        this.recordFirst();
      });
    }
    recordFirst(){
      const rect = this.getDomRect();
      this.firstPos.left = rect.left;
      this.firstPos.top = rect.top;
    }
    getDomRect(){
      const rect = this.dom.getBoundingClientRect();
      return {
        left: rect.left,
        top: rect.top
      };
    }
    play(){
      // Last
      const lastPos = this.getDomRect();
      // Invert
      const invert = {
        delaX: this.firstPos.left - lastPos.left,
        delaY: this.firstPos.top - lastPos.top
      };
      if(!invert.delaX && !invert.delaY){
        // 位置未发生变化，直接返回
        return;
      }
      this.dom.style.transition = 'none';
      this.dom.style.transform = `translate(${invert.delaX}px, ${invert.delaY}px)`;
      // Play
      document.body.clientWidth;
      this.dom.style.transition = this.duration;
      this.dom.style.removeProperty('transform');
      // 注意这里不能使用requestAnimationFrame，会导致最后一个list-item没有动画效果。具体原因还有待探究
      // requestAnimationFrame(() => {
      //   this.dom.style.transition = this.duration;
      //   this.dom.style.removeProperty('transform');
      // });
    }
  }

  // 控制多个dom元素的flip动画
  class Flip {
    constructor(doms, duration){
      this.doms = [...doms];
      this.duration = duration;
      this.flipDoms = this.doms.map(dom => new FlipDom(dom, this.duration));
      this.watch();
    }
    // 监听doms的新增和删除（Mutation Observer API）
    watch(){
      const observer = new MutationObserver((mutationList, observer) => {
        mutationList.forEach(mutation => {
          if(mutation.type === 'childList'){
            const addedNodes = [...mutation.addedNodes].filter(node => node.nodeType === 1);
            const removedNodes = [...mutation.removedNodes].filter(node => node.nodeType === 1);
            for(let i = 0; i < addedNodes.length; i++) {
              this.flipDoms.push(new FlipDom(addedNodes[i], this.duration));
            }
            for(let j = 0; j < removedNodes.length; j++){
              this.flipDoms = this.flipDoms.filter(flipDom => flipDom.dom !== removedNodes[j]);
            }
          }
        });
      });
      const obTarget = this.doms[0].parentElement;
      observer.observe(obTarget, {
        childList: true, // 观察子节点的变化
        subtree: false // 不观察子节点的子节点
      });
    }
    play(){
      this.flipDoms.forEach(flipDom => flipDom.play());
    }
  }

  return Flip;
})();