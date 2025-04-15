<template>
  <!-- <RightList :list="list" @select="handleSelect($event)" /> -->
  <RightList :list="list" @select="handleSelect" />
</template>

<script>
import RightList from './RightList';

export default {
  components: {
    RightList
  },
  data(){
    return {
      list: [
        { name: 'a', isSelect: false, aside: '152篇' },
        { name: 'b', isSelect: false, aside: '94篇' },
        {
          name: 'c',
          isSelect: true,
          aside: '121篇',
          children: [
            { name: 'c-1', isSelect: false, aside: '30篇' },
            {
              name: 'c-2',
              isSelect: false,
              aside: '38篇',
              children: [
                { name: 'c-2-1', isSelect: false, aside: '10篇' },
                { name: 'c-2-2', isSelect: false, aside: '12篇' },
                { name: 'c-2-3', isSelect: false, aside: '11篇' },
                { name: 'c-2-4', isSelect: false, aside: '5篇' }
              ]
            },
            { name: 'c-3', isSelect: false, aside: '28篇' },
            { name: 'c-4', isSelect: false, aside: '35篇' },
          ]
        },
        { name: 'd', isSelect: false, aside: '133篇' }
      ]
    }
  },
  methods: {
    handleSelect(item){
      console.log(item);
    }
  }
}
</script>

<style>

</style>