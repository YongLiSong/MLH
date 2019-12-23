<template>
    <div v-if="meiInfo">
       List--{{this.$route.params.eventId}}
        <div>{{meiInfo.eventName}}</div>
        <ul>
            <li v-for="item in meiInfo.products" :key="item.productId">
                <p>{{item.productName}}</p>
                <img :src="item.imageUrl" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      meiInfo: null
    }
  },
  mounted () {
    // console.log(this.$route.params.eventId)
    Axios({
      url: `http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.eventId}&key=&sort=&timestamp=1576891751829&summary=81b8528ab12d09d311a56f6ca8e954a1&platform_code=H5`
    }).then(res => {
      // console.log(res.data)
      this.meiInfo = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
    img{
        width: 100px;
    }
</style>
