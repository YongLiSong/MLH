<template>
    <div v-if="meiInfo">
       <!-- List--{{this.$route.params.eventId}} -->
        <div>{{meiInfo.eventName}}</div>
        <ul>
            <li v-for="item in meiInfo.products" :key="item.productId" @click="handlclick(item.glsCode)">
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
      meiInfo: null
    }
  },
  mounted () {
    // console.log(this.$route.params.eventId)
    Axios({
      url: `http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.eventId}&key=&sort=&timestamp=1576891751829&summary=81b8528ab12d09d311a56f6ca8e954a1&platform_code=H5`
    }).then(res => {
      console.log(res.data)
      this.meiInfo = res.data
    })
  },
  methods: {
    handlclick (id) {
      // console.log(this.$router)
      this.$router.push(`/Detail/${id}`)
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
