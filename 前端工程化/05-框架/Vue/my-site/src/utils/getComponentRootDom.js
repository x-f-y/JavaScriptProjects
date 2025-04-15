import Vue from 'vue';

/**
 * 获取某个组件渲染的DOM根元素
 */
export default function(component, props){
  // 获取组件实例
  const vm = new Vue({
    render: h => h(component, {
      props
    })
  });
  // vm.$mount()的作用是挂载组件实例（将模板渲染为真实的DOM元素，并将其插入到文档中）
  // 但由于这里没有提供参数，所以只将模板渲染成DOM元素，并不将其插入到文档中
  vm.$mount();
  // vm.$el返回组件实例使用的根DOM元素
  return vm.$el;
}