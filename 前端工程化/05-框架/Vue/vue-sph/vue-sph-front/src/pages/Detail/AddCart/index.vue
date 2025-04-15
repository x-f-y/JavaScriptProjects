<template>
  <div class="add-cart heart">
    <ul class="breadCrumb clearfix">
      <li><a href="javascript:void(0);" v-show="categoryView.category1Name">{{ categoryView.category1Name }}</a></li>
      <li><a href="javascript:void(0);" v-show="categoryView.category2Name">{{ categoryView.category2Name }}</a></li>
      <li><a href="javascript:void(0);" v-show="categoryView.category3Name">{{ categoryView.category3Name }}</a></li>
    </ul>
    <div class="main clearfix">
      <!-- 左侧放大镜区域 -->
      <div class="preview">
        <!-- 放大镜效果 -->
        <div ref="magnifier" class="magnifier" @mousemove="handleMagnifier">
          <img :src="magnifierCurImg" alt="">
          <div ref="mask" class="mask"></div>
          <div ref="mbox" class="mbox">
            <img ref="mboxImg" :src="magnifierCurImg" alt="">
          </div>
        </div>
        <!-- 下方的缩略图 -->
        <div class="imgList">
          <div class="swiper" ref="magnifierSwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" :class="{active: index === carouselCurIndex}" @click="toggleImg(index)" alt="">
              </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </div>
      <!-- 右侧选择加入购物车区域 -->
      <div class="addCart">
        <div class="detail">
          <h3 class="title">{{ skuInfo.skuName }}</h3>
          <p class="recommend">{{ skuInfo.skuDesc }}</p>
          <div class="priceWrap">
            <div class="price">
              <span class="native">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
              <i>￥</i>
              <em>{{ skuInfo.price }}</em>
              <span class="notice">降价通知</span>
            </div>
            <div class="promoteSales">
              <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
              <span class="type">加价购</span>
              <span class="content">满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</span>
            </div>
            <div class="comment">
              <span>评&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价</span>
              <span class="sum">累计评价&nbsp;65545</span>
            </div>
          </div>
          <div class="supportWrap">
            <span>可&nbsp;支&nbsp;持</span>
            <span class="support">以旧换新、闲置手机回收、4G套餐超值抢、礼品购</span>
          </div>
          <div class="addressWrap">
            <span>配&nbsp;送&nbsp;至</span>
            <span class="address">广东省 深圳市 宝安区</span>
          </div>
        </div>
        <div class="choose">
          <dl class="clearfix" v-for="item1 in spuSaleAttrList" :key="item1.id">
            <dt>{{ item1.saleAttrName }}</dt>
            <dd
                v-for="(item2, index) in item1.spuSaleAttrValueList"
                :key="item2.id"
                :class="{active: item2.isChecked === '1'}"
                @click="toggleActiveSaleAttr(item1.spuSaleAttrValueList, index)"
            >{{ item2.saleAttrValueName }}</dd>
          </dl>
        </div>
        <div class="cartWrap clearfix">
          <input type="text" v-model="skuNum" @input="handleInput">
          <div class="btnWrap">
            <button class="add" @click="skuNum++">+</button>
            <button class="minus" @click="skuNum > 1 ? skuNum-- : (skuNum = 1)">-</button>
          </div>
          <div class="cartBtn" @click="addToShopCar">加入购物车</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Swiper, {Navigation} from "swiper";
  import 'swiper/css';
  import 'swiper/css/navigation';

  export default {
    name: "AddCart",
    data(){
      return {
        carouselCurIndex: 0, // 放大镜中所显示图片的索引
        skuNum: 1 // 购买产品的数量
      }
    },
    computed: {
      ...mapGetters('detail', ['categoryView', 'skuInfo', 'spuSaleAttrList']),
      magnifierCurImg(){
        // ?.为可选链运算符，有三种语法：（1）obj.val?.prop（2）obj.val?.[expr]（3）obj.func?.(args)
        return this.skuInfo.skuImageList?.[this.carouselCurIndex]?.imgUrl;
      }
    },
    watch: {
      "skuInfo.skuImageList": function(){
        this.$nextTick(() => {
          new Swiper(this.$refs.magnifierSwiper, {
            modules: [Navigation],
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            // 设置slider容器能够同时显示的slides数量（注意：经试验，slidesPerView的值不可超过轮播图中实际swiper-slide的数量）
            slidesPerView: Math.min(4, this.skuInfo.skuImageList.length)
          });
        })
      }
    },
    methods: {
      // 放大镜效果
      handleMagnifier(e){
        const magnifier = this.$refs.magnifier;
        const mask = this.$refs.mask;
        const mbox = this.$refs.mbox;
        const mboxImg = this.$refs.mboxImg;
        const maskPosition = {
          // 写法一：
          left: e.clientX - mask.offsetWidth / 2 - magnifier.getBoundingClientRect().left,
          top: e.clientY - mask.offsetHeight / 2 - magnifier.getBoundingClientRect().top
          // 写法二：
          // left: e.offsetX - mask.offsetWidth / 2,
          // top: e.offsetY - mask.offsetHeight / 2
          // 注意：对于写法二，由于事件冒泡机制，mask层和magnifier层都会触发mousemove事件，
          // 而e.offsetX和e.offsetY是鼠标指针位置相对于触发事件的对象的x和y坐标，所以会出现抖动现象。
          // 解决方案是：给mask层添加css属性pointer-events:none让mask层不成为鼠标事件的target，
          // 即指定offsetX和offsetY的参考系是magnifier层，而不是mask层。
        };
        // 边界处理
        if(maskPosition.left < 0){
          maskPosition.left = 0;
        }else if(maskPosition.left > magnifier.offsetWidth - mask.offsetWidth){
          maskPosition.left = magnifier.offsetWidth - mask.offsetWidth;
        }
        if(maskPosition.top < 0){
          maskPosition.top = 0;
        }else if(maskPosition.top > magnifier.offsetHeight - mask.offsetHeight){
          maskPosition.top = magnifier.offsetHeight - mask.offsetHeight;
        }
        // 移动遮罩层
        mask.style.setProperty('left', maskPosition.left + 'px');
        mask.style.setProperty('top', maskPosition.top + 'px');
        // 计算比例（遮罩层可以移动的距离 /  预览大图能够被移动的距离）
        const scale = {
          x: (magnifier.offsetWidth - mask.offsetWidth) / (mboxImg.offsetWidth - mbox.offsetWidth),
          y: (magnifier.offsetHeight - mask.offsetHeight) / (mboxImg.offsetHeight - mbox.offsetHeight),
        };
        const mboxImgPosition = {
          left: maskPosition.left / scale.x,
          top: maskPosition.top / scale.y
        };
        // 移动预览大图
        mboxImg.style.setProperty('margin-left', -mboxImgPosition.left + 'px');
        mboxImg.style.setProperty('margin-top', -mboxImgPosition.top + 'px');
      },
      // 点击轮播图图片时，放大镜中切换到对应的图片
      toggleImg(index){
        this.carouselCurIndex = index;
      },
      // 点击售卖属性时，为其添加高亮效果
      toggleActiveSaleAttr(spuSaleAttrValueList, index){
        for(const s of spuSaleAttrValueList){
          s.isChecked = '0';
        }
        spuSaleAttrValueList[index].isChecked = '1';
      },
      // 输入购买数量时的响应回调函数
      handleInput(){
        // 限制用户的输入只能是正整数（1 2 3 ...），而不能输入负数、小数、字母等
        this.skuNum = Number(this.skuNum.replace(/[^\d]/g, ''));
        if(this.skuNum === 0){
          // 购买数量至少为1
          this.skuNum = 1;
        }
      },
      // 点击加入购物车时的响应回调函数
      addToShopCar(){
        this.$store.dispatch('detail/addOrUpdateShopCar', {
          skuId: this.$route.params.skuId,
          skuNum: this.skuNum
        }).then(value => {
          // 加入购物车成功
          sessionStorage.setItem('skuInfo', JSON.stringify(this.skuInfo));
          sessionStorage.setItem('spuSaleAttrList', JSON.stringify(this.spuSaleAttrList));
          const routeUrl = this.$router.resolve({
            name: 'addCartSuccess',
            query: {
              skuNum: this.skuNum
            }
          });
          window.open(routeUrl.href, '_blank');
        }, reason => {
          // 加入购物车失败
          alert(reason);
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .add-cart {
    margin-top: 15px;
    .breadCrumb {
      li {
        float: left;
        a {
          color: #666;
        }
        &:nth-child(n+2)::before {
          content: '/';
          color: #ccc;
          margin: 0 5px;
        }
      }
    }
    .main {
      margin-top: 15px;
      .preview {
        float: left;
        width: 400px;
        .magnifier {
          position: relative;
          width: 400px;
          height: 400px;
          border: 1px solid #dfdfdf;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
          .mask {
            //pointer-events: none;
            display: none;
            position: absolute;
            left: 0;
            top: 0;
            width: 200px;
            height: 200px;
            background-color: rgba(255, 255, 255, 0.5);
            border: 1px solid #ddd;
          }
          .mbox {
            display: none;
            position: absolute;
            left: 410px;
            top: 0;
            width: 400px;
            height: 400px;
            overflow: hidden;
            border: 1px solid #ddd;
            img {
              display: none;
              width: 800px;
              height: 800px;
            }
          }
          &:hover .mask {
            display: block;
          }
          &:hover .mbox {
            display: block;
            img {
              display: block;
            }
          }
        }
        .imgList {
          .swiper {
            margin-top: 10px;
            padding: 0 13px;
            height: 56px;
            text-align: center;
            .swiper-button-prev {
              left: 0;
            }
            .swiper-button-next {
              right: 0;
            }
            .swiper-button-next, .swiper-button-prev {
              width: 10px;
              height: 56px;
              top: 22px;
              color: #666666;
              border: 1px solid #cccccc;
              background-color: #ebebeb;
              &::after {
                font-size: 12px;
              }
            }
            img {
              width: 56px;
              height: 56px;
              border: 1px solid #cccccc;
              &.active {
                border: 1px solid #f60;
              }
            }
          }
        }
      }
      .addCart {
        float: right;
        width: 700px;
        .detail {
          .title {
            font-size: 14px;
            line-height: 21px;
            font-weight: bold;
          }
          .recommend {
            margin: 13px 0;
            color: #e12228;
          }
          .priceWrap {
            background-color: #fee9eb;
            padding: 7px;
            .price {
              color: #c81623;
              .native {
                color: initial;
              }
              i {
                font-size: 16px;
                margin-left: 15px;
              }
              em {
                font-size: 24px;
              }
              .notice {
                font-size: 10px;
              }
            }
            .promoteSales {
              margin-top: 10px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              .type {
                background-color: #c81623;
                padding: 3px;
                color: #ffffff;
                margin-left: 15px;
              }
              .content {
                color: #999999;
                margin-left: 3px;
              }
            }
            .comment {
              margin: 14px 0 2px;
              .sum {
                margin-left: 15px;
              }
            }
          }
          .supportWrap {
            margin-top: 10px;
            .support {
              margin-left: 15px;
              color: #999999;
              line-height: 28px;
            }
          }
          .addressWrap {
            padding-bottom: 5px;
            border-bottom: 1px solid #dedede;
            .address {
              margin-left: 15px;
              color: #999999;
              line-height: 28px;
            }
          }
        }
        .choose {
          dl {
            line-height: 28px;
            margin: 13px 0;
            dt {
              float: left;
              margin-right: 15px;
            }
            dd {
              float: left;
              padding: 2px 14px;
              margin-right: 5px;
              color: #666666;
              border-top: 1px solid #eee;
              border-right: 1px solid #bbb;
              border-bottom: 1px solid #bbb;
              border-left: 1px solid #eee;
              line-height: 22px;
              &.active {
                color: #f60;
                border: 1px solid #f60;
              }
            }
          }
        }
        .cartWrap {
          input {
            float: left;
            width: 36px;
            height: 36px;
            border: 1px solid #dddddd;
            border-right: 0;
            text-align: center;
          }
          .btnWrap {
            float: left;
            color: #666666;
            height: 36px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .add {
              height: 17px;
              background-color: #f1f1f1;
              border: 1px solid #cccccc;
            }
            .minus {
              height: 17px;
              line-height: 13px;
              background-color: #f1f1f1;
              border: 1px solid #cccccc;
            }
          }
          .cartBtn {
            float: left;
            margin-left: 15px;
            background-color: #e1251b;
            height: 36px;
            padding: 0 25px;
            font-size: 16px;
            color: #ffffff;
            line-height: 36px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>