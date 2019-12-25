<template>
    <div>
        个人中心
    </div>
</template>
<script>
export default {
// 局部拦截
  beforeRouteEnter (to, from, next) {
    if (to.path === '/center') {
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
