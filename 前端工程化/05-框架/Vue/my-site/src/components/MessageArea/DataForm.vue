<template>
  <form id="data-form-container" class="data-form-container" @submit.prevent="handleSubmit" ref="form">
    <div class="form-item">
      <div class="input-area">
        <input type="text" maxlength="10" placeholder="用户昵称" v-model.trim="formData.nickname">
        <span class="tip">{{ formData.nickname.length }}/10</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea maxlength="300" placeholder="输入内容" v-model.trim="formData.content"></textarea>
        <span class="tip">{{ formData.content.length }}/300</span>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>
    <div class="form-item">
      <div class="button-area">
        <button type="submit" :disabled="isSubmiting">{{ isSubmiting ? "提交中..." : "提交" }}</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data(){
    return {
      formData: {
        nickname: "",
        content: ""
      },
      error: {
        nickname: "",
        content: ""
      },
      isSubmiting: false
    }
  },
  methods: {
    handleSubmit(){
      this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
      this.error.content = this.formData.content ? "" : "请填写内容";
      if(this.error.nickname || this.error.content){
        return;
      }
      this.isSubmiting = true;
      this.$emit('submit', this.formData, successMsg => {
        this.$showMessage({
          content: successMsg,
          type: 'success',
          duration: 1000,
          container: this.$refs.form
        }, () => {
          this.isSubmiting = false;
          this.formData.nickname = "";
          this.formData.content = "";
        });
      })
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';

.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;

  .form-item {
    margin-bottom: 8px;

    .input-area {
      width: 50%;
      position: relative;

      input {
        padding: 0 15px;
        height: 40px;
      }
    }

    .text-area {
      position: relative;

      textarea {
        resize: none;
        padding: 8px 15px;
        height: 120px;
      }
    }

    .button-area {
      button {
        position: relative;
        cursor: pointer;
        border: none;
        outline: none;
        width: 100px;
        height: 34px;
        color: #fff;
        background-color: @primary;
        border-radius: 4px;

        &:hover {
          background-color: darken(@primary, 10%);
        }

        &:disabled {
          background-color: lighten(@primary, 20%);
        }
      }
    }

    .tip {
      position: absolute;
      right: 5px;
      bottom: 5px;
      color: #b4b8bc;
      font-size: 12px;
    }

    .error {
      margin-top: 6px;
      color: @danger;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
    }

    input, textarea {
      display: block;
      width: 100%;
      box-sizing: border-box;
      border: 1px dashed @gray;
      outline: none;
      color: @words;
      font-size: 14px;
      border-radius: 4px;

      &:focus {
        border-color: @primary;
      }
    }
  }
}
</style>