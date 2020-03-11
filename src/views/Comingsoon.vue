<template>
    <div>
        即将上新
    </div>
</template>
<script>
export default {

  beforeEnter: (to, from, next) => {
    next('/center')
  }
}
</script>
