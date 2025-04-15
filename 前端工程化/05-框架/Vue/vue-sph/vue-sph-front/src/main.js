import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from '@/router'

// 全局注册三级联动组件、轮播图组件、分页器组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

import store from '@/store'

// 引入mockServe.js以确保其中的代码能执行一遍
import '@/mock/mockServe.js'

// 引入默认图片，注意：图片和json文件都是默认对外暴露的
import defaultImgUrl from '@/assets/loading.gif';

// 引入并使用VueLazyload（图片懒加载）插件
/*import VueLazyload from "vue-lazyload"
Vue.use(VueLazyload, {
  loading: defaultImgUrl
})*/

// 全局注册自定义指令，在图片没有加载成功时使用默认图片
/*Vue.directive('lazy-load', {
  // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
  bind(el, binding, vnode){
    console.log('bind');
  },
  // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
  inserted(el, binding, vnode){
    console.log('inserted');
  },
  // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有
  update(el, binding, vnode, oldVnode){
    console.log('update');
  },
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated(el, binding, vnode, oldVnode){
    console.log('componentUpdated');
  },
  // 只调用一次，指令与元素解绑时调用
  unbind(el, binding, vnode){
    console.log('unbind');
  }
})*/
// 在很多时候，你可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子。这时可以这样简写：
Vue.directive('lazy-load', function(el, binding){
  const realImgUrl = binding.value; // 真实的图片地址
  const img = new Image();
  // 由于给组件样式设置了scoped，所以vue会给当前图片元素添加一个唯一attribute，格式为data-v-*
  Array.from(el.attributes).forEach(v => {
    if(v.name.indexOf('data-v-') !== -1){
      img.setAttribute(v.name, v.value);
    }
  });
  img.onload = function(){
    el.parentElement && el.parentElement.replaceChild(img, el);
  }
  img.src = realImgUrl;
})

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this; // 安装全局事件总线
  }
}).$mount('#app')
