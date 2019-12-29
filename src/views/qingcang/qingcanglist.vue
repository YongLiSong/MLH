<template>
  <div id="box">
    <h2>热卖排行</h2>
    <nav :class="isFixed?'fixed':''" ref="myNav">
      <ul class="navul">
        <router-link :to="'good'+data.first_category_id" tag="li" v-for="data in navlist" :key="data.first_category_id" activeClass='active' @click.native="handleClick">
          {{data.first_category_name}}
        </router-link>

        <!-- https://www.mei.com/appapi/clearance/clearanceCategoryProductList/v3?pageIndex=1&sort&key&brandNames&firstCategoryId=570&frontFirstCategoryIds&frontSecondCategoryIds&thirdCategories&productSizes&cmsId&size
        https://www.mei.com/appapi/clearance/clearanceCategoryProductList/v3?pageIndex=1&sort&key&brandNames&firstCategoryId&frontFirstCategoryIds&frontSecondCategoryIds&thirdCategories&productSizes&cmsId&size -->
      </ul>
    </nav>
    <div class="goodslistborder" v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="500"
    infinite-scroll-immediate-check=false
    infinite-scroll-listen-for-event='isshow'>
        <div class="goodslist" v-for="item in goodslist" :key="item.productId" @click="handlePush(item.productId)">
            <img :src="item.imageUrl" alt="">
            <div class="size" v-if="item.productSizes.length"><span v-for='(goodsize,number) in item.productSizes' :key="number">{{goodsize.size}}</span></div>
            <p class="engName">{{item.brandName.toUpperCase()}}</p>
            <p class="cnName">{{item.productName}}</p>
            <p class="goodPrice">￥{{item.price}}<span class="marketPrice">￥{{item.marketPrice}}</span><span class="price">{{parseFloat(item.itemPriceDto.discount)}}折</span></p>
            <div class="information">
                <div v-for="(it,index) in item.tagListDto" :key="index" :style="{background:'#'+it.fontBackgroudColor,color:'#'+it.fontColor,border:'1px solid #'+it.frameColor}">{{it.tag}}</div>
            </div>

        </div>
    </div>
    <div class="load" v-if='isloadshow'>
      <mt-spinner :type="3" color="#ccc" :size='26'></mt-spinner>
      <p>加载中...</p>
    </div>
  </div>
</template>
<script>

import { Indicator } from 'mint-ui'
import Vue from 'vue'
import axios from 'axios'
var bus = new Vue()

export default {

  data () {
    return {
      navlist: [],
      goodslist: [],

      loading: false,
      num: 1,
      page: null,
      information: '',
      isFixed: false,
      // navtop: 0,
      isloadshow: false
    }
  },
  props: ['offsettop'],
  created () {
    this.information = this.$route.params.myid.replace('good', '')
  },
  async mounted () {
    // 方框页面
    var res = await axios({
      url: 'https://www.mei.com/appapi/clearance/clearanceCategoryList/v3'
    })
    this.navlist = res.data.result
    // nav页面全部信息
    var date = await axios({
      url: `https://www.mei.com/appapi/clearance/clearanceCategoryProductList/v3?pageIndex=1&sort&key&brandNames&firstCategoryId=${this.information}&frontFirstCategoryIds&frontSecondCategoryIds&thirdCategories&productSizes&cmsId&size`
    })
    this.goodslist = date.data.products
    window.onscroll = this.handleScroll
  },
  methods: {
    // 吸顶
    handleScroll () {
      // console.log(this.offsetTop)
      if ((document.documentElement.scrollTop || document.body.scrollTop) >= this.offsettop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    // 点击切换页面信息
    async handleClick () {
      document.documentElement.scrollTop = this.offsettop
      this.information = this.$route.params.myid.replace('good', '')
      // console.log(this.information)
      this.num = 1
      let res = await axios({
        url: `https://www.mei.com/appapi/clearance/clearanceCategoryProductList/v3?pageIndex=1&sort&key&brandNames&firstCategoryId=${this.information}&frontFirstCategoryIds&frontSecondCategoryIds&thirdCategories&productSizes&cmsId&size`
      })
      this.goodslist = res.data.products
      this.page = res.data.totalPages
    },
    loadMore () {
      ++this.num
      if (this.num > this.page) {
        this.isloadshow = false
        return
      }
      this.loading = true
      this.isloadshow = true
      // Indicator.open({
      //   text: '加载中...',
      //   spinnerType: 'fading-circle'
      // })

      axios({
        url: `https://www.mei.com/appapi/clearance/clearanceCategoryProductList/v3?pageIndex=${this.num}&sort&key&brandNames&firstCategoryId=${this.information}&frontFirstCategoryIds&frontSecondCategoryIds&thirdCategories&productSizes&cmsId&size`
      }).then(res => {
        this.goodslist = [...this.goodslist, ...res.data.products]

        this.isloadshow = false
        this.loading = false

        // Indicator.close();
      })
    },
    handlePush (id) {
      this.$router.push(`/Detail/${id}`)
    }
  }

}
</script>
<style lang="scss" scoped>
    h2{
      height: 0.57rem;
      line-height: 0.57rem;
      padding-left: 0.12rem;
      font-size: 0.18rem;
      font-weight: bold;
    }
    nav{
      display: flex;
      width: 3.5rem;
      margin-left:0.12rem;
      margin-bottom: 0.3rem;
      align-items: flex-start;
      justify-content: center;
      .navul{
        width: 3.5rem;
        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;

        li{
          box-sizing: border-box;
          margin-top: 0.04rem;
          width: 0.682rem;
          height: 0.22rem;
          line-height: 0.22rem;
          text-align: center;
          font-size: 0.14rem;
          color: black;
        }
        .active{
          border:1px solid red;
          border-radius:2px;
          color: red;
          font-weight: bold;
        }
      }
    }
    .goodslistborder{

      width: 3.45rem;
      margin: 0 auto;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      .goodslist{
        border: 1px solid #f7f7f7;
        margin-bottom: 0.28rem;
        position: relative;
        width: 1.68rem;
        overflow: hidden;
        img{
          width: 100%;
          border-bottom: 1px solid #f7f7f7;
          background: #f7f7f7;
        }
        .size{
          position: absolute;
          font-size: 0.07rem;
          color: white;
          padding: 0.03rem 0.1rem;
          background: #636363;
          border-radius: 0.07rem;
          left: 50%;
          transform: translateX(-50%);
          top: 2.04rem;
          span{
            &:after{
              content: '/'
            }
            &:last-child{
              &:after{
                 content: ''
              }
            }
          }
        }
        .engName{
          // font: 600 10px '微软雅黑';
          font-size: 0.12rem;
          font-weight:bolder;
          height: 0.24rem;
          line-height: 0.24rem;
        }
        .cnName{
          font-size: 0.12rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 0.06rem;
        }
        .goodPrice{
          font-size: 0.12rem;
          color: #dd2828;
          font-weight: bold;
          .marketPrice{
            font-size: 0.08rem;
            color: #ccc;
            text-decoration: line-through;
            margin-left: 0.1rem;
          }
          .price{
            font-size: 0.10rem;
            color: #666;
            font-weight: 500;
            float: right;
            margin-right: 0.04rem;
          }

          }
          .information{
            margin-top: 0.02rem;
            display: flex;
            div{
              font-size: 0.12rem;
              margin-right: 0.05rem;
              padding: 0.02rem;
              margin-bottom: 0.06rem;
            }
        }
      }
    }
   .fixed{
     position: fixed;
     top: 0;
     left: 0.12rem;
     z-index: 100;
     background: white;
     margin-left: 0;

   }
   .load{
     display: flex;
     justify-content: center;
     position: relative;
     bottom: 0.16rem;
     align-items: center;
     p{
       font-size: 0.12rem;
       height: 0.12rem;
       line-height: 0.12rem;
       margin-left:0.06rem;
       font-weight: 600;
     }
   }
</style>
