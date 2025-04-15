<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect"></RightList>
  </div>
</template>

<script>
import RightList from './RightList';
import { debounce } from '@/utils';

export default {
  props: {
    toc: {
      type: Array
    }
  },
  data(){
    return {
      activeAnchor: ''
    }
  },
  computed: {
    // 根据Detail组件传递进来的toc属性和activeAnchor得到带有isSelect属性的数组
    tocWithSelect(){
      const getToc = (toc) => {
        return toc.map(t => {
          const res = {
            ...t,
            isSelect: t.anchor === this.activeAnchor
          };
          if(t.children){
            res.children = getToc(t.children);
          }
          return res;
        });
      };
      return getToc(this.toc);
    },
    // 根据toc得到对应的dom元素数组
    doms(){
      const doms = [];
      const addToDoms = (toc) => {
        for(const t of toc){
          doms.push(document.getElementById(t.anchor));
          if(t.children){
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    }
  },
  components: {
    RightList
  },
  methods: {
    handleSelect(item){
      // 设置页面路径的hash值
      location.hash = item.anchor;
      this.activeAnchor = item.anchor;
    },
    // 备注：仔细理解setSelect这个方法（太秒了😂）
    setSelect: debounce(function(scrollDom){
      if(!scrollDom){
        return;
      }
      const range = 200;
      for(const dom of this.doms){
        // 依次看当前dom元素是否应该选中
        if(!dom){
          continue;
        }
        // 得到元素离视口顶部的距离
        const top = dom.getBoundingClientRect().top;
        if(top >= 0 && top <= range){
          // 在规定的范围内
          // 设置选中效果为当前dom元素对应的toc项
          this.activeAnchor = dom.id;
          return;
        }else if(top > range){
          // 在规定的范围下方
          // 说明已在之前的循环中设置好了选中效果，直接返回
          return;
        }else{
          // 在规定的范围上方
          // 先假设自己是激活的，然后继续循环看后面
          this.activeAnchor = dom.id;
        }
      }
    }, 50)
  },
  created(){
    this.$bus.$on('mainScroll', this.setSelect);
  },
  destroyed(){
    this.$bus.$off('mainScroll', this.setSelect);
  }
}
</script>

<style scoped lang="less">
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
    line-height: 40px;
  }
}
</style>