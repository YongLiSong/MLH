<template>
  <div>
      <input type="text" v-model="myText" maxlength="11" placeholder="手机号"  ref="name" v-on:keyup="inputRef">
      <div class="jiantou" @click="handleClick()" >→</div>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  data () {
    return {
      myText: ''
    }
  },
  methods: {
    handleClick () {
      // Axios({
      //   url: '/appapi/customer/sendValiCodeLoginOrRegist',
      //   data: { telphone: this.myText },
      //   method: 'post'
      // }).then(res => {
      // })
      // console.log(this.name)
      localStorage.setItem('token', window.btoa(window.encodeURIComponent(JSON.stringify(this.name)))) // 加密方法
      this.$router.push('/center')
      // -------------- 解密方法 --------------
      //  jieMi() {
      //     var obj = JSON.parse(
      //       decodeURIComponent(window.atob(localStorage.getItem("token")))
      //     );
      //     console.log(obj);
      //   }
      // -------------- 解密方法 --------------
    },
    inputRef: function () {
      // console.log(this.$refs.name.value)
      this.name = this.$refs.name.value
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
