<template>
  <div>
      <input type="text" v-model="userName" placeholder="请输入用户名"  ref="username" v-on:keyup="inputRef"
      onfocus="this.placeholder=''" onblur="this.placeholder='请输入用户名'">
      <div class="jiantou" @click="handleClick(userName)" >→</div>
  </div>
</template>
<script>
import Axios from 'axios'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    handleClick (username) {
      // Axios({
      //   url: '/appapi/customer/sendValiCodeLoginOrRegist',
      //   data: { telphone: this.myText },
      //   method: 'post'
      // }).then(res => {
      // })
      // console.log(this.name)
      localStorage.setItem('token', window.btoa(window.encodeURIComponent(JSON.stringify(this.username)))) // 加密方法
      var keyMyName = window.btoa(window.encodeURIComponent(username))
      // this.$router.push('/center')
      this.$router.push('/center')

      // console.log(text)
      // 登陆成功提示框
      Toast({
        message: '登录成功',
        position: 'center',
        duration: 1000
      })

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
      this.username = this.$refs.username.value
    }
  }
}
</script>
<style lang="scss" scoped>
  input{
    width: 100%;
    height: 60px;
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
