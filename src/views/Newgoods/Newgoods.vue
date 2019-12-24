<template>
    <div v-if="title" >
        <h2>
            {{title.title}}<span>{{title.subTitle}}</span>
            <img :src="title.headImg" alt="">
        </h2>
        <div class="newgoods">
        <ul v-if="titlelist.length" class="goodsnav">
            <router-link tag="li" to='#' @click.native="godetail(titledata.first_category_id)" v-for="(titledata,index) in titlelist" :key="index" active-class="avtive">
                    {{titledata.first_category_name}}
            </router-link>
        </ul>
        <ul class="newgoodslist"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
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
    </div>
</template>
<script>
import Axios from 'axios'
import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      titlelist: [],
      goodslisttop: [],
      meiInfoList: [],
      title: null,
      num: 1,
      meiInfo: null
    }
  },
  methods: {
    handlclick (id) {
      this.$router.push(`/detail/${id}`)
    },
    loadMore () {
      this.num++
      this.loading = true
      if (this.num > this.meiInfo) {
        return
      }
      Axios({
        url: `https://www.mei.com/appapi/ninenew/getCategoryProductList/v3?pageIndex=${this.num}&sort&key&newType=1&minPrice&maxPrice&brandNames&frontFirstCategoryIds&frontSecondCategoryIds&frontThirdCategoryIds&productSizes&cmsId&size`
      }).then(res => {
        // console.log(this.meiInfoList)
        this.meiInfoList = [...this.meiInfoList, ...res.data.products]
      })
    }
  },
  mounted () {
    Axios({
      url: `/wh/data/rmc/zebra/v1/454352/35864e02-b1d8-4053-b377-28e266017320.json`
    }).then(res => {
      console.log(res.data['2188294902'])
      this.title = res.data['2188294902'].config
    })
    Axios({
      url: `https://www.mei.com/appapi/ninenew/categoryList/v3?newType=1`
    }).then(res => {
      this.titlelist = res.data.result
      console.log(this.titlelist)
    })
    Axios({
      url: `https://www.mei.com/appapi/ninenew/getCategoryProductList/v3?pageIndex=${this.num}&sort&key&newType=1&minPrice&maxPrice&brandNames&frontFirstCategoryIds&frontSecondCategoryIds&frontThirdCategoryIds&productSizes&cmsId&size`
    }).then(res => {
      this.meiInfoList = res.data.products
      this.meiInfo = res.data.totalPage
    })
  }
}
</script>
<style lang="scss" scoped>
    // background: #f5f5f5;
h2{
    position: relative;
    img{
        position: absolute;
        top:0;
        left: 0;
        z-index:-100;
        height: 100%;
        width: 100%;
    }
      height: 0.32rem;
      line-height: 0.32rem;
      font-size: 0.18rem;
      position: relative;
      padding-left:0.14rem;
      margin-bottom: 0.08rem;
      span{
        font-size:0.1rem ;
        color: #5b5b5b;
        margin:0.2rem;
      &:before{
        content: "";
        height: 0.18rem;
        width: 2px;
        background-color: #757575;
        position: absolute;
        left: 0.98rem;
        top: 0.07rem;
      }
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
  .active{
      color: red;
  }
  .goodsnav{
      width: 100%;
      background: #fff;
      border-bottom: 1px solid #888;
      margin-bottom: 0.2rem;
      li{
          float: left;
          width: 0.68rem;
          height: 0.24rem;
          margin: 0.1rem;
      }
  }
</style>
