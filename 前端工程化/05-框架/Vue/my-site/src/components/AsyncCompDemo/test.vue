<template>
  <AsyncCompDemo />
</template>

<script>
// const AsyncCompDemo = () => import('./');

const AsyncCompDemo = () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const asyncComp = await import('./');
      resolve(asyncComp);
    }, 3000);
  });
};

/* const AsyncCompDemo = () => ({
  // 需要加载的组件 (应该是一个Promise对象)
  component: import('./'),
  // 异步组件加载时使用的组件
  // loading: LoadingComponent,
  // 加载失败时使用的组件
  // error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  // delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：Infinity
  // timeout: 3000
}); */

export default {
  components: {
    AsyncCompDemo
  }
}
</script>