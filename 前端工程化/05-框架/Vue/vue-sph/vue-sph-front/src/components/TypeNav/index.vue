<template>
  <div class="type-nav">
    <div class="main clearfix heart">
      <div class="all-sort" @mouseleave="leave">
        <h2 @mouseenter="enterShow">全部商品分类</h2>
        <transition name="sort">
          <div class="sort-nav" v-show="showCate" @click="goSearch">
            <!--一级分类-->
            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" @mouseenter="enter(index)" :class="{active: currentIndex === index}">
              <a href="javascript:void(0);">
                <h3 :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</h3>
                <div class="detail-sort" :style="{display: currentIndex === index ? 'block' : 'none'}">
                  <!--二级分类-->
                  <dl class="clearfix" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dt :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</dt>
                    <!--三级分类-->
                    <dd v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId" href="javascript:void(0);">{{c3.categoryName}}</a>
                    </dd>
                  </dl>
                </div>
              </a>
            </div>
          </div>
        </transition>
      </div>
      <ul class="top-nav clearfix">
        <li><a href="javascript:void(0);">服装城</a></li>
        <li><a href="javascript:void(0);">美妆馆</a></li>
        <li><a href="javascript:void(0);">尚品汇超市</a></li>
        <li><a href="javascript:void(0);">全球购</a></li>
        <li><a href="javascript:void(0);">闪购</a></li>
        <li><a href="javascript:void(0);">团购</a></li>
        <li><a href="javascript:void(0);">有趣</a></li>
        <li><a href="javascript:void(0);">秒杀</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {throttle} from "@/utils";
  import {mapState} from 'vuex';

  export default {
    name: 'TypeNav',
    computed: {
      ...mapState('home', {
        categoryList: state => state.categoryList
      })
    },
    data(){
      return {
        // 记录鼠标移入的一级菜单的索引
        currentIndex: -1,
        // 控制全部商品分类下拉菜单的显示或隐藏
        showCate: this.$route.meta.showCate
      }
    },
    methods: {
      // 鼠标移入一级菜单时触发的回调函数
      enter: throttle(function(index){
        this.currentIndex = index
      }, 20),
      // 鼠标移出标题“全部商品分类”和所有的一级菜单时触发的回调函数
      leave(){
        this.currentIndex = -1
        if(this.$route.path.indexOf('/search') === 0){
          this.showCate = false
        }
      },
      // 点击一级、二级和三级菜单时携带相应的参数跳转到Search页面
      goSearch(e){
        const {categoryname, category1id, category2id, category3id} = e.target.dataset
        // 确保点击的是一级、二级和三级菜单
        if(categoryname){
          const query = {
            categoryName: categoryname
          }
          switch (true) {
            case Boolean(category1id):
              query.category1Id = category1id;
              break;
            case Boolean(category2id):
              query.category2Id = category2id;
              break;
            case Boolean(category3id):
              query.category3Id = category3id;
              break;
          }
          this.$router.push({
            name: 'search',
            query,
            params: this.$route.params
          })
        }
      },
      // 鼠标移入标题“全部商品分类”时，显示一级下拉菜单
      enterShow(){
        if(this.$route.path.indexOf('/search') === 0) {
          this.showCate = true
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .type-nav {
    height: 47px;
    border-bottom: 2px solid #e1251b;
    .main {
      .all-sort {
        position: relative;
        float: left;
        width: 210px;
        height: 47px;
        h2 {
          height: 45px;
          background-color: #e1251b;
          font-size: 14px;
          font-weight: bold;
          color: #ffffff;
          line-height: 45px;
          text-align: center;
        }
        //过渡动画
        .sort-enter, .sort-leave-to {
          transform: scaleY(0);
        }
        .sort-enter-to, .sort-leave {
          transform: scaleY(1);
        }
        .sort-enter-active, .sort-leave-active {
          transition: all 0.2s linear;
        }
        .sort-nav {
          position: absolute;
          top: 47px;
          left: 0;
          height: 460px;
          width: 210px;
          background-color: #fafafa;
          display: flex;
          flex-direction: column;
          transform-origin: top center;
          .item {
            padding-left: 18px;
            flex: 1;
            display: flex;
            align-items: center;
            a {
              h3 {
                font-size: 14px;
              }
              .detail-sort {
                display: none;
                position: absolute;
                width: 735px;
                min-height: 460px;
                border: 1px solid #ddd;
                padding: 0 14px 20px;
                top: 0;
                left: 210px;
                background-color: #f7f7f7;
                z-index: 2;
                dl {
                  word-break: keep-all;
                  color: #666666;
                  line-height: 25px;
                  margin-top: 15px;
                  dt {
                    float: left;
                    font-weight: bold;
                    margin-right: 8px;
                  }
                  dd {
                    float: left;
                    a {
                      padding: 0 8px;
                    }
                    &::before {
                      content: '|';
                    }
                  }
                }
              }
            }
            &.active {
              background-color: skyblue;
            }
          }
        }
      }
      .top-nav {
        float: left;
        line-height: 45px;
        font-size: 16px;
        li {
          float: left;
          a {
            padding: 0 20px;
          }
        }
      }
    }
  }
</style>