<template>

    <div >
      <listnav>
            <p>{{$route.params.searchid}}</p>
      </listnav>
       <div class="zhao" v-if="isShow">
              查询无结果
        </div>
        <ul v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
             v-if="meiInfoList.length">

            <li v-for="item in meiInfoList" :key="item.productId" @click="handlclick(item.productId)">
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
import listnav from '@/components/Listnav'

export default {
  data () {
    return {
      meiInfo: null,
      meiInfoList: [],
      num: 1,
      isShow: false
    }
  },
  mounted () {
    Axios({
      url: `http://www.mei.com/appapi/search/searchKey/v3?pageIndex=1&q=${this.$route.params.searchid}&sort=&key=&searchKeyWord=${this.$route.params.searchid}`
    }).then(res => {
      this.meiInfoList = res.data.products
      this.meiInfo = res.data
      if (res.data.products.length === 0) {
        this.isShow = true
        // console.log(this.isShow)
      }
    })
    // console.log(this.$route.params.searchid)
  },
  methods: {
    handlclick (id) {
      this.$router.push(`/detail/${id}`)
    },
    loadMore () {
      this.num++
      this.loading = true
      if (this.num > this.meiInfo.totalPages) {
        return
      }
      Axios({
        url: `http://www.mei.com/appapi/search/searchKey/v3?pageIndex=${this.num}&q=${this.$route.params.searchid}&sort=&key=&searchKeyWord=${this.$route.params.searchid}`
      }).then(res => {
        // console.log(this.meiInfoList)
        this.meiInfoList = [...this.meiInfoList, ...res.data.products]
      })
    }
  },
  components: {
    listnav
  }
}
</script>
<style lang="scss" scoped>
.list_top{
    width: 100%;
    height: 0.42rem;
    background: #fff;
    display: flex;
    p{
      margin: 0 auto;
      font-weight: bold;
      line-height: 0.42rem;
      font-size: 0.2rem;
      color: #2a2a2a;
    }
  }
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
  .zhao{
    position: relative;
    z-index: 99999;
  }
</style>
