<template>
  <ul class="contact-container">
    <li>
      <a target="_blank" :href="data.github">
        <div class="icon">
          <Icon type="github" />
        </div>
        <span>{{ data.githubName }}</span>
      </a>
    </li>
    <li>
      <a :href="`mailto:${data.mail}`">
        <div class="icon">
          <Icon type="mail" />
        </div>
        <span>{{ data.mail }}</span>
      </a>
    </li>
    <li>
      <!-- 点击超链接弹出qq对话 -->
      <a :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`">
        <div class="icon">
          <Icon type="qq" />
        </div>
        <span>{{ data.qq }}</span>
      </a>
      <div class="pop">
        <img :src="data.qqQrCode" alt="">
      </div>
    </li>
    <li>
      <a>
        <div class="icon weixin">
          <Icon type="weixin" />
        </div>
        <span>{{ data.weixin }}</span>
      </a>
      <div class="pop">
        <img :src="data.weixinQrCode" alt="">
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from '@/components/Icon';
import { mapState } from 'vuex';

export default {
  components: {
    Icon
  },
  computed: mapState('setting', ['data'])
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.contact-container {
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: @gray;
  @itemHeight: 30px;

  > li {
    height: @itemHeight;
    line-height: @itemHeight;
    margin: 14px 0;
    position: relative;
    
    > a {
      display: flex;
      cursor: pointer;
      font-size: 14px;

      .icon {
        font-size: 26px;
        width: 36px;

        &.weixin {
          font-size: 32px;
          text-indent: -3px;
        }
      }
    }

    .pop {
      position: absolute;
      left: 0;
      bottom: @itemHeight + 5px;
      padding: 10px 15px;
      background-color: #fff;
      border-radius: 5px;
      transform: scaleY(0);
      transform-origin: center bottom;
      transition: 0.3s;

      img {
        width: 150px;
        height: 150px;
      }

      &::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        left: 50%;
        bottom: -4px;
        transform: translateX(-50%) rotate(45deg);
        background-color: #fff;
      }
    }

    &:hover .pop {
      transform: scaleY(1);
    }
  }
}
</style>