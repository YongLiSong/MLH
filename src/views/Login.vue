<template>
    <div>
        <input type="text" v-model="telnumber">
        <button @click="regnum(telnumber)">提交</button>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
  data () {
    return {
      telnumber: ''
    }
  },
  methods: {
    regnum (telnumber) {
      Axios({
        url: `/appapi/customer/sendValiCodeLoginOrRegist`,
        method: 'post',
        data: {
          'telphone': `${this.telnumber}`
        }
      }).then(res => {
        console.log(res.data)
      })
      Axios({
        url: `appapi/customer/isCheckCodeShowSms?key=${this.telnumber}`,
        method: 'get'
      }).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>
