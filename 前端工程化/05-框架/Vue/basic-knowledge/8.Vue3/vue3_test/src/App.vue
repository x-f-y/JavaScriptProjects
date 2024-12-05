<template>
  <MyInput
    clearable
    v-model="value"
    placeholder="请输入"
    @input="handleInput"
    @change="handleChange"
    :boxShadow="true"
    @clear="customHandleClear"
    ref="inputRef"
  >
    <template #prepend>https://</template>
    <template #append>.com</template>
  </MyInput>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MyInput from './components/MyInput.vue';

const value = ref('google');
const inputRef = ref();

const handleInput = (value) => {
  console.log('触发了input事件，当前值为：', value);
};

const handleChange = (value) => {
  console.log('触发了change事件，当前值为：', value);
};

const customHandleClear = () => {
  console.log('触发了自定义的clear事件');
};

onMounted(() => {
  inputRef.value.focus();
});
</script>

<style scoped>
</style>
