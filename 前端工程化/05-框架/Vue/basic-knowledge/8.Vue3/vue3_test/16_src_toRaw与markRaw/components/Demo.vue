<template>
  <h2>当前求和为：{{sum}}</h2>
  <button @click="sum++">点我sum+1</button>
  <hr>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <h2>薪资：{{job.j1.salary}}k</h2>
  <h2 v-show="person.car">座架信息：{{person.car}}</h2>
  <button @click="name+='~'">修改姓名</button>
  <button @click="age++">增长年龄</button>
  <button @click="job.j1.salary++">涨薪</button><br>
  <button @click="showRawPerson">输出最原始的person</button>
  <button @click="addCar">给person添加car属性</button>
  <button @click="person.car.name+='!'">换车名</button>
  <button @click="person.car.price++">改变车的价格</button>
</template>

<script>
import { ref, reactive, toRefs, toRaw, markRaw } from 'vue'

export default {
  name: 'Demo',
  setup() {
    // 数据
    let sum = ref(0)
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })

    console.log(person)

    // 方法
    function showRawPerson() {
      const p = toRaw(person)
      p.age++ // 此行代码不会引起模板中age的改变
      console.log(p)
    }
    function addCar() {
      const car = { name: '奔驰', price: 40 }
      person.car = markRaw(car)
    }

    return {
      sum,
      person,
      ...toRefs(person),
      showRawPerson,
      addCar
    }
  }
}
</script>

