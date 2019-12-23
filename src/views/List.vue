<template>
    <div v-if="meiInfo">
         <div class="list_top">
          <i class="iconfont icon-icon-test59"></i>
          <p>{{meiInfo.eventName}}</p>
        </div>
        <ul v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li v-for="item in meiInfoList" :key="item.productId" @click="handlclick(item.glsCode)">
                <img :src="item.imageUrl" alt="">
                <h3>{{ item.brandName }}</h3>
                <p>{{item.productName}}</p>
                <span class="price">￥{{ item.price }}</span>
                <span class="marketPrice">￥{{ item.marketPrice }}</span>
                <span class="discount">{{item.discount}}折</span>
            </li>
        </ul>
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
      console.log(res.data)
      this.meiInfo = res.data
      this.meiInfoList = res.data.products
      console.log(this.meiInfoList)
    })
  },
  methods: {
    handlclick (id) {
      // console.log(this.$router)
      this.$router.push(`/Detail/${id}`)
    },
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
  ul{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    li{
      width: 1.65rem;
      img{
        width: 100%;
      }
      h3{
        font-size: 0.12rem;
        color: #1d1d1d;
        font-weight: bold;
        text-transform: Uppercase;
      }
      p{
        font-size: 0.12rem;
        color: #1d1d1d;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price{
        color: #e14343;
        margin-right: 0.09rem;
      }
      .marketPrice{
        color: #d0d0d0;
        text-decoration: line-through;
      }
      .discount{
        color: #777777;
        float: right;
      }
    }
  }
</style>
