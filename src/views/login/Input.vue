<template>
  <div>
      <input type="text" v-model="myText" maxlength="11" >
      <div class="jiantou" @click="handleClick()" >→</div>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  data () {
    return {
      myText: '手机号'
    }
  },
  methods: {
    handleClick () {
      Axios({
        url: '/appapi/customer/sendValiCodeLoginOrRegist',
        data: { telphone: this.myText },
        method: 'post'

      }).then(res => {
        window.set
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  input{
    width: 100%;
    height: 60px;
    color: #ddd;
    box-sizing: border-box;
    margin-bottom: 10px;
    border: 1px solid #eee;
    padding-left: 15px;
    -moz-box-shadow:0 0 10px #ccc;
    -webkit-box-shadow:0 0 10px #ccc;
    box-shadow:0 0 10px #ccc;
    font-size: 16px;
  }
  .jiantou{
    -moz-box-shadow:0 0 10px #ccc;
    -webkit-box-shadow:0 0 10px #ccc;
    box-shadow:0 0 10px #ccc;
    width: 100%;
    height: 60px;
    color: white;
    background: #ccc;
    line-height: 60px;
    text-align: center;
    font-size: 50px
  }
  .black{
    background: #000;
  }
</style>
