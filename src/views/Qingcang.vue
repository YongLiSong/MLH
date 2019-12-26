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
              <swiper :key="list.length">

                  <div class="swiper-slide">
                      <div v-for="data in swiperList1" :key="data.gls_code" class="swiperbox">
                        <div class="slow">
                         <p>直降</p>
                          <p>{{data.priceDiff}}</p>

                        </div>
                        <img :src="data.imageUrl" alt="">
                        <p class="goodsname">{{data.brand_name}}</p>
                          <p class="goodsprice">￥{{data.price}}</p>
                          <p class="dateprice">￥{{data.market_price}}</p>
                      </div>
                  </div>

                  <div class="swiper-slide">
                    <div v-for="item in swiperList2" :key="item.gls_code" class="swiperbox">
                      <div class="slow">
                         <p>直降</p>
                          <p>{{item.priceDiff}}</p>

                        </div>
                        <img :src="item.imageUrl" alt="">
                        <p class="goodsname">{{item.brand_name}}</p>
                          <p class="goodsprice">￥{{item.price}}</p>
                          <p class="dateprice">￥{{item.market_price}}</p>
                      </div>
                  </div>

                  <div class="swiper-slide">
                      <div v-for="it in swiperList1" :key="it.gls_code" class="swiperbox">
                        <div class="slow">
                         <p>直降</p>
                          <p>{{it.priceDiff}}</p>

                        </div>
                        <img :src="it.imageUrl" alt="">
                        <p class="goodsname">{{it.brand_name}}</p>
                          <p class="goodsprice">￥{{it.price}}</p>
                          <p class="dateprice">￥{{it.market_price}}</p>
                      </div>
                  </div>

              </swiper>

          </div>
          <centerbox class="centerbottom"></centerbox>
          <centerbox class="centerbottom"></centerbox>
      </div>
  </div>
</template>
<script>
import Axios from 'axios'
import centerbox from '@/views/qingcang/Centerbox'
import swiper from '@/views/qingcang/Swiper'
export default {
  data () {
    return {
      myImgurl: '',
      list: [],
      swiperList1: [],
      swiperList2: [],
      swiperList3: [],
      totalCount: 0,
      pageColor: ''
    }
  },
  mounted () {
    // header
    Axios({
      url: 'wh/data/rmc/zebra/v1/446076/7d927402-d665-4024-8117-c10ae68e3c17.json',
      headers: {
        'Conten-Type': 'aplication/json'
      }
    }).then(res => {
      this.myImgurl = JSON.parse(res.data['5441132116'].moqieDataWl[0].jsonStr).imgSrc
    })
    // swiper
    Axios({
      url: 'https://www.mei.com/appapi/clearance/clearanceNewArrival/v3'
    }).then(res => {
      this.totalCount = res.data.result.totalCount
      this.list = res.data.result.categoryProductList
      for (var i = 0; i < this.list.length; i++) {
        if (i < 3) {
          this.swiperList1.push(this.list[i])
        } else if (i >= 3 && i < 6) {
          this.swiperList2.push(this.list[i])
        } else if (i >= 6 && i < 9) {
          this.swiperList3.push(this.list[i])
        }
      }
    })
  },
  components: {
    centerbox,
    swiper
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
        .swiper-slide{
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
        .centerbottom{
          width: 100%;

          overflow: hidden;
        }
      }
  }
</style>
