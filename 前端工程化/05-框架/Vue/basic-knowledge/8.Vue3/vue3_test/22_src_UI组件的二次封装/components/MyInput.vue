<template>
  <div :class="{box_shadow: boxShadow}">
    <el-input v-bind="$attrs" ref="myInput" @clear="clear">
      <!-- "[]"是vue中的动态指令参数，方括号内是JavaScript表达式 -->
      <template v-for="(_, name) in $slots" #[name]="scopedData">
        <slot :name="name" v-bind="scopedData || {}"></slot>
      </template>
    </el-input>
  </div>
</template>

<script setup>
import { ref, onMounted, useAttrs, useSlots } from 'vue';

const myInput = ref();
const exposed = {};

defineOptions({
  name: 'MyInput',
  // 默认情况下，父组件传递的，但没有被子组件解析为props的属性会被作为一个常规的HTML属性应用在子组件的根节点元素上
  // 但当编写的组件想要在一个目标元素或其他组件外面套一层时，可能并不期望这样的行为。此时可以设置inheritAttrs为false来禁用这个默认行为
  inheritAttrs: false
});

defineProps({
  boxShadow: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['clear']);

defineExpose(exposed);

const clear = () => {
  emit('clear');
};

// $attrs包含了由父组件传入，且没有被子组件声明为props或是emits的属性和事件处理函数
// 本例将boxShadow声明为了props，将clear声明为了emits，所以$attrs中不包含这两项
const attrs = useAttrs();
console.log('$attrs', attrs);

// $slots是一个包含了由父组件传入的插槽的对象，其中key是插槽的名称，value是返回一个vnode数组的函数
// 如果插槽是一个作用域插槽，那么传递给该插槽函数的参数可以作为插槽的prop提供给插槽
const slots = useSlots();
console.log('$slots', slots);

onMounted(() => {
  const entries = Object.entries(myInput.value);
  for(const [key, value] of entries){
    exposed[key] = value;
  }
});
</script>

<style scoped>
.box_shadow {
  transition: 0.3s;
}
.box_shadow:hover,
.box_shadow:focus-within {
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
}
</style>