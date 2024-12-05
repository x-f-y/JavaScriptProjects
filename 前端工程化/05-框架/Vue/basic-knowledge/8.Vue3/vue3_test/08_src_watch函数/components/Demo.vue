<template>
  <h2>当前求和为：{{sum}}</h2>
  <button @click="sum++">点我+1</button>
  <hr>
  <h2>当前信息为：{{msg}}</h2>
  <button @click="msg+='!'">修改信息</button>
  <hr>
  <h2>姓名：{{person.name}}</h2>
  <h2>年龄：{{person.age}}</h2>
  <h2>薪资：{{person.job.j1.salary}}k</h2>
  <button @click="person.name+='~'">修改姓名</button>
  <button @click="person.age++">增长年龄</button>
  <button @click="person.job.j1.salary++">涨薪</button>
</template>

<script>
import { reactive, ref, watch } from 'vue'

export default {
  name: 'Demo',
  // 这样写也可以奏效，但这是Vue2的写法，在Vue3中不建议这样写
  //#region 
  /* watch: {
    // sum(newValue, oldValue){
    //   console.log(`sum的值发生变化了，旧值为${oldValue}，新值为${newValue}`)
    // }
    sum: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        console.log(`sum的值发生变化了，旧值为${oldValue}，新值为${newValue}`)
      }
    }
  }, */
  //#endregion
  setup() {
    // 数据
    let sum = ref(0)
    let msg = ref('你好')
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })

    // 情况一：监视ref所定义的一个响应式数据
    watch(sum, (newValue, oldValue) => {
      console.log(`sum的值发生变化了，旧值为${oldValue}，新值为${newValue}`)
    }, { immediate: true })

    // 情况二：监视ref所定义的多个响应式数据
    /* watch([sum, msg], (newValue, oldValue) => {
      console.log('sum或msg的值发生变化了', oldValue, newValue)
    }, { immediate: true }) */

    /**
     * 情况三：监视reactive所定义的一个响应式数据的全部属性
     *  注意：
     *    - 此处无法获取正确的oldValue
     *    - 强制开启了深度监视（deep配置无效）
     */
    /* watch(person, (newValue, oldValue) => {
      console.log('person改变了', oldValue, newValue)
    }, { deep: false }) // 此处的deep配置无效 */

    // 情况四：监视reactive所定义的一个响应式数据中的某个属性
    /* watch(() => person.age, (newValue, oldValue) => {
      console.log('person中的age改变了', oldValue, newValue)
    }) */

    // 情况五：监视reactive所定义的一个响应式数据中的多个属性
    /* watch([() => person.age, () => person.name], (newValue, oldValue) => {
      console.log('person中的age或name改变了', oldValue, newValue)
    }) */

    // 特殊情况
    // 注意：这里也不能获取到正确的oldValue
    /* watch(() => person.job, (newValue, oldValue) => {
      console.log('person中的job改变了', oldValue, newValue)
    }, { deep: true }) // 与情况三不同，这里需要手动开启深度监视才能监视的到，因为此处监视的是由reactive定义的对象中的某个属性 */

    return {
      sum,
      msg,
      person
    }
  }
}
</script>
