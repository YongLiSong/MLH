<template>
  <div>
    <div @click="handleClick()" class="click">
    ×
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick () {
      window.history.back(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
  div{
    font-size:50px;
    font-weight: 200;
    padding: 5px 0 5px 5px;
    overflow: hidden;
   .click{
     float: right;
   }
  }
</style>
