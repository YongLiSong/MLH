<template>
    <div v-if="meiInfo">
        <div>{{meiInfo.eventName}}</div>
        <ul v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li v-for="item in meiInfoList" :key="item.productId">
                <p>{{item.productName}}</p>
                <img :src="item.imageUrl" alt="">
            </li>
        </ul>
        <div></div>
        <div>
          colin-list
        </div>
    </div>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      meiInfo: null,
      meiInfoList: [],
      num: 1
    }
  },
  mounted () {
    // console.log(this.$route.params.eventId)
    Axios({
      url: `http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.eventId}&key=&sort=&timestamp=1576891751829&summary=81b8528ab12d09d311a56f6ca8e954a1&platform_code=H5`
    }).then(res => {
      // console.log(res.data)
      this.meiInfo = res.data
      this.meiInfoList = res.data.products
      console.log(this.meiInfoList)
    })
  },
  methods: {
    loadMore () {
      this.num++
      this.loading = true
      if (this.num > this.meiInfo.totalPages) {
        return
      }
      Axios({
        url: `http://www.meihigo.hk/appapi/event/product/v3?pageIndex=${this.num}&categoryId=${this.$route.params.eventId}&key=&sort=&timestamp=1577068190462&summary=fa0dddb80e97b05bf029ae6d9a4177a3&platform_code=H5`
      }).then(res => {
        console.log(this.meiInfoList)
        this.meiInfoList = [...this.meiInfoList, ...res.data.products]
      })
    }
  }
}

</script>

<style lang="scss" scoped>
    img{
        width: 1.00rem;
    }
</style>
