<template>
    <div v-if="meiInfo">
      <listnav>
            <p>{{meiInfo.eventName}}</p>
      </listnav>
        <ul v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li v-for="item in meiInfoList" :key="item.productId" @click="handlclick(item.productId)">
                <img v-lazy="item.imageUrl" alt="">
                <h3>{{ item.brandName }}</h3>
                <p>{{item.productName}}</p>
                <span class="price">￥{{ item.price }}</span>
                <span class="marketPrice">￥{{ item.marketPrice }}</span>
                <span class="discount">{{item.discount}}折</span>
            </li>
        </ul>
        <div class="scollTop">
          <div class="carts">
            <i class="iconfont icon-icon-test10"></i>
          </div>
          <div class="Top" @click="backTop" v-if="btnFlag">
            <i class="iconfont icon-icon-test64"></i>
          </div>
        </div>
    </div>
</template>

<script>
import listnav from '@/components/Listnav'
import Axios from 'axios'
import { Indicator } from 'mint-ui'
import Vue from 'vue'
export default {
  data () {
    return {
      meiInfo: null,
      productsTnfo: null,
      meiInfoList: [],
      num: 1,
      btnFlag: false
    }
  },
  components: {
    listnav
  },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    // console.log(this.$route.params.eventId)
    Axios({
      url: `http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.eventId}&key=&sort=&timestamp=1576891751829&summary=81b8528ab12d09d311a56f6ca8e954a1&platform_code=H5`
    }).then(res => {
      // console.log(res.data)
      this.meiInfo = res.data
      this.productsTnfo = res.data.products
      this.meiInfoList = res.data.products
      // console.log(this.meiInfoList)
      // console.log(this.productsTnfo)
      Indicator.close()
      window.addEventListener('scroll', this.scrollToTop)
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
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
        // console.log(this.meiInfoList)
        this.meiInfoList = [...this.meiInfoList, ...res.data.products]
      })
    },
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop () {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      // console.log(that.scrollTop)
      if (that.scrollTop > 1683) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
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
      img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
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
  .scollTop{
    position: fixed;
    right: 0.16rem;
    bottom: 0.2rem;
    .carts{
      width: 0.4rem;
      height: 0.4rem;
      background: rgba($color: #fff, $alpha: 0.8);
      box-shadow: 0 0.013333rem 0.133333rem 0.066667rem rgba(0,0,0,.05);
      line-height: 0.4rem;
      text-align: center;
      border-radius: 100%;
      i.icon-icon-test10{
        font-size: 0.26rem;
        color: #000;
      }
    }
    .Top{
      width: 0.4rem;
      height: 0.4rem;
      background: rgba($color: #fff, $alpha: 0.8);
      box-shadow: 0 0.013333rem 0.133333rem 0.066667rem rgba(0,0,0,.05);
      line-height: 0.4rem;
      text-align: center;
      border-radius: 100%;
      margin-top: 0.1rem;
      i.icon-icon-test64{
        font-size: 0.26rem;
        color: #000;
      }
    }
  }
</style>
