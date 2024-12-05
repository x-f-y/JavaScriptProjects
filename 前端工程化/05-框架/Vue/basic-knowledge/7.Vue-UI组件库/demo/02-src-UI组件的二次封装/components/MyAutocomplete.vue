<template>
  <div :class="{box_shadow: boxShadow}">
    <!-- 注意：如果一个事件被v-on="$listeners"进行了转发，并且二次封装的组件内也对原UI库组件的事件进行了监听，那么该事件会触发两次（比如本例中的change事件） -->
    <el-autocomplete class="full_width" v-bind="$attrs" v-on="$listeners" ref="myAutocomplete" @change="change">
      <!-- "[]"是vue中的动态指令参数，方括号内是JavaScript表达式 -->
      <!-- 作用域插槽...1️⃣ -->
      <template v-for="(_, scopedName) in $scopedSlots" #[scopedName]="scopedData">
        <slot :name="scopedName" v-bind="scopedData"></slot>
      </template>
      <!-- 普通（非作用域）插槽...2️⃣ -->
      <template v-for="(_, name) in $slots" #[name]>
        <slot :name="name"></slot>
      </template>
      <!-- 这里有一个坑：顺序必须是先1️⃣后2️⃣，且两次v-for的name不能相同。具体原因参考https://github.com/vuejs/vue/issues/11478 -->
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'MyAutocomplete',
  props: {
    boxShadow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change(queryString){
      this.$emit('change', queryString);
    }
  },
  mounted(){
    // $attrs包含了父组件传入，且没有被声明为props的属性，本例中不包含boxShadow
    console.log('$attrs', this.$attrs);
    // $listeners包含了父组件传入的（不含.native修饰符的）事件监听器，本例中是select、change和input
    console.log('$listeners', this.$listeners);
    // $slots包含了父组件传入的具名插槽
    console.log('$slots', this.$slots);
    // $scopedSlots包含了父组件传入的作用域插槽，注意：从2.6.0开始，所有的$slots都会作为函数暴露在$scopedSlots中
    console.log('$scopedSlots', this.$scopedSlots);

    const entries = Object.entries(this.$refs.myAutocomplete);
    for(const [key, value] of entries){
      if(key.startsWith('$') || key.startsWith('_')){
        continue;
      }
      this[key] = value;
    }
  }
}
</script>

<style scoped>
.full_width {
  width: 100%;
}
.box_shadow {
  transition: 0.3s;
}
.box_shadow:hover,
.box_shadow:focus-within {
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
}
</style>