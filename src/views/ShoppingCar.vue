<template>
    <div>
        购物车
    </div>
</template>
<script>
export default {
// 局部拦截
  beforeRouteEnter (to, from, next) {
    if (to.path === '/shoppingcar') {
      // console.log('拦截')
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/login')
      }
    } else next()
  }
}
</script>
