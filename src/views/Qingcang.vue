<template>
  <div id='box'>
      <div class="head">
        <img :src="myImgurl" alt="">
      </div>
      <div class="center" >
          <div class="centertop">
              <div class='centertophead'>
                <h3>周三上新</h3>
                <div>{{totalCount}}款</div>
                <button>查看更多&gt;</button>
              </div>
              <swiper :key="swiperList.length" class="swiper">

                      <div v-for="data in swiperList" :key="data.gls_code" @click="handlePush(data.first_category_id)" class="swiper-slide swiperbox">
                        <div class="slow">
                         <p>直降</p>
                          <p>{{data.priceDiff}}</p>

                        </div>
                        <img :src="data.imageUrl" alt="">
                        <p class="goodsname">{{data.brand_name}}</p>
                          <p class="goodsprice">￥{{data.price}}</p>
                          <p class="dateprice">￥{{data.market_price}}</p>
                      </div>

              </swiper>

          </div>
          <centerbox id='2120000100000000662' :offsettop='top'></centerbox>
          <centerbox id='2035000100000000011' :offsettop='top'></centerbox>
          <centerbox id='2040000100000000746' :offsettop='top'></centerbox>
          <centerbox id='2041000100000000652' :offsettop='top'></centerbox>
          <centerbox id='2041000100000000651' :offsettop='top'></centerbox>
          <centerbox id='2042000100000000571' :offsettop='top' datalistlength='2' class="nowhite"></centerbox>

      </div>
      <list ref="top" :offsettop='top'></list>
  </div>
</template>
<script>
import Axios from 'axios'
import centerbox from '@/views/qingcang/Centerbox'
import swiper from '@/views/qingcang/Swiper'
import list from '@/views/qingcang/qingcanglist'
export default {
  data () {
    return {
      myImgurl: '',

      swiperList: [],

      totalCount: 0,
      pageColor: '',
      iscreate: false,
      top: 0
    }
  },
  async mounted () {
    // header
    var res = await Axios({
      url: 'wh/data/rmc/zebra/v1/446076/7d927402-d665-4024-8117-c10ae68e3c17.json',
      headers: {
        'Conten-Type': 'aplication/json'
      }
    })
    this.myImgurl = JSON.parse(res.data['5441132116'].moqieDataWl[0].jsonStr).imgSrc
    // swiper
    var date = await Axios({
      url: 'https://www.mei.com/appapi/clearance/clearanceNewArrival/v3'
    })
    this.totalCount = date.data.result.totalCount
    this.swiperList = date.data.result.categoryProductList

    this.iscreate = true
  },
  updated () {
    this.top = this.$refs.top.$el.offsetTop
  },
  components: {
    centerbox,
    swiper,
    list
  },
  methods: {
    // 轮播跳转
    handlePush (id) {
      console.log(1111)
      this.top = this.$refs.top.$el.offsetTop
      this.$router.push(`/qingcang/good${id}`)
      // console.log(this.$refs.top.$el.clientHeight)

      //  document.body.scrollTop = this.$refs.top.$el.clientHeight+'px'
      document.documentElement.scrollTop = this.top
    }
  }
}
</script>
<style lang="scss" scoped>
  #box{
    width: 100%;
    height: 100%;

    .head{
      img{
        width: 100%;
      }

    }
    .center{

        background: #a00b0b;
        padding: 0.12rem;
        .centertop{
          border-radius: 0.05rem;
          background: white;
          .centertophead{
            margin-bottom: 0.03rem;
            padding-left: 0.12rem;
            &::after{
              content: '';
              height: 0;
              overflow: hidden;
              display: block;
              clear: both;
              visibility: hidden;
            }
            h3{
              font-weight: bold;
              font-size: 18px;
              float: left;
              margin-right: 5px;
            }
            div{
              width: 0.46rem;
              height: 0.18rem;
              float: left;
              text-align: center;
              line-height: 0.18rem;
              border-left: 1px solid #ccc;
              color: #ccc;
              margin-top: 0.03rem;
            }
            button{
              margin-top: 0.03rem;
              font-size: 12px;
              color: #000;
              background: white;
              border: 1px solid black;
              padding: 0.03rem;
              float: right;
              margin-right: 0.12rem;
            }
          }
        }
        .swiper{
          display: flex;
          justify-content: space-around;
           .swiperbox{

            width: 33.3%;
            .slow{
              margin-left: 0.15rem;
              text-align: center;
              width: 0.34rem;
              height: 0.3rem;
              background: #e02728;
              p{
                font-size: 0.1rem;
                color: #fff;
              }
            }
            img{
              width: 100%;
            }
            p{
              text-align: center;
            }
            .goodsname{
              font-size: 0.11rem;
            }
            .goodsprice{
              font-size: 0.11rem;
              color: #dd2828;
            }
            .dateprice{
              font-size: 0.09rem;
              color: #ccc;
              text-decoration: line-through;
              margin-bottom: 0.3rem
            }
          }

        }
        /deep/ .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
            display: inline-block;
            border-radius:0;
            background: #000;
            opacity: .1;
        }
        /deep/ .swiper-pagination-bullet-active {
            width: 6px;
            height: 6px;
            display: inline-block;
            border-radius:0;
            background: #000;
            opacity: .6;
        }
        .nowhite{
          /deep/ p{
            margin-bottom: 0;
          }
        }

      }
  }
</style>
