<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
// 图标类样式映射关系
const classMap = {
  home: "iconzhuye",
  success: "iconzhengque",
  error: "iconcuowu",
  close: "iconguanbi",
  warn: "iconjinggao",
  info: "iconxinxi",
  blog: "iconblog",
  code: "iconcode",
  about: "iconset_about_hov",
  weixin: "iconweixin",
  mail: "iconemail",
  github: "icongithub",
  qq: "iconsign_qq",
  arrowUp: "iconiconfonticonfonti2copy",
  arrowDown: "iconiconfonticonfonti2",
  empty: "iconempty",
  chat: "iconliuyan",
};

export const types = Object.keys(classMap);

export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    // 图标类样式
    fontClass(){
      return classMap[this.type];
    }
  }
}
</script>

<style scoped>
@import url("//at.alicdn.com/t/font_2164449_nalfgtq7il.css");

.iconfont {
  /*
  注意：对于组件内部的根元素，其样式不仅受到当前组件的影响，也受到其父组件的影响。也就是说，如果
  当前组件的父组件书写了样式.iconfont{...}，那么这些样式不仅可以影响到父组件中具有iconfont类名的
  元素，也可以影响到当前组件的根元素（因为当前组件的根元素，即i元素，也具有iconfont类名）
  */
  font-size: inherit;
  color: inherit;
}
</style>