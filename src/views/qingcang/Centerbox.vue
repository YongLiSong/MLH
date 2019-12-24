<template>
  <div id="box">
    <div></div>
    <div></div>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  mounted () {
    Axios({
      url: 'https://www.mei.com/appapi/clearance/cmsDetailInfo/v3?cmsId=2120000100000000662'
    }).then({})
  }
}
</script>
<style lang="scss" scoped>
  #box{
    width: 100%;
    background: white;
    border-radius: 0.05rem;
  }
</style>
