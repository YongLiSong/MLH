<template>
      <div id='newbrand'>
        <h2>
          品牌上新 <span>{{getdate}}</span>
        </h2>
         <ul v-for="data in newbrandlist" :key="data.eventId">
            <h3>
              <p>{{data.englishName}}</p>
              <span>{{data.newBrandCountContent}}</span>
              <span>{{data.chineseName}}</span>
            </h3>
            <li v-for="data2 in data.products.slice(0,2)" :key="data2.productId">
              <div>
                <img :src="data2.imageUrl" alt="">
                <span @click="godetail(data2.productId)"></span>
              </div>
                <p>¥{{data2.itemPriceDto.price}}</p>
                <p><s>¥{{data2.marketPrice}}</s></p>
            </li>
            <li class="fourcase">
              <img :src="data3.imageUrl" alt="" v-for="data3 in data.products.slice(2,6)" :key="data3.productId">
              <span @click="gotolist(data.eventId)"></span>
            </li>
              <p class="lookmore" @click="gotolist(data.eventId)">查看更多</p>
          </ul>
      </div>
</template>
<script>
import Axios from 'axios'
import moment from 'moment'
export default {
  data () {
    return {
      newbrandlist: []
    }
  },
  computed: {
    getdate () {
      return moment().format('D.MMM')
    }
  },
  methods: {
    godetail (id) {
      this.$router.push(`/detail/${id}`)
    },
    gotolist (id) {
      this.$router.push(`/list/${id}`)
    }
  },
  mounted () {
    Axios({
      url: 'https://www.mei.com/appapi/ninenew/newBrandEvent/v1?pageIndex=1&credential'
    }).then(res => {
      this.newbrandlist = res.data.eventList.splice(0, 3)
      // console.log(this.newbrandlist)
      this.list2 = res.data.eventList
    })
  }
}
</script>
<style lang="scss" scoped>
  #newbrand{
    background-color: #f5f5f5;
    h2{
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
      border-radius: 0.05rem;
      width: 3.52rem;
      height: 2.4rem;
      background-color: #fff;
      margin: 0.1rem auto;
      padding:0.14rem;
      box-sizing: border-box;
      h3{
        margin-bottom: 0.2rem;
        p{
          font-size: 0.18rem;
          line-height: 0.18rem;
          margin-bottom: 0.07rem;
          font-weight:bolder;
        }
        span{
          &:nth-of-type(1){
              display: inline-block;
              font-size: 0.1rem;
              border:1px solid #000;
              border-radius: 0.02rem;
              margin-right: 0.1rem;
          }
          &:nth-of-type(2){
              font-size: 0.1rem;
              color: #c0c0c0;
          }
        }
      }
      li{
            overflow: hidden;
            margin-right: 0.1rem;
           float: left;
           border-radius: 0.05rem;
           position: relative;
            text-align: center;
            p{
              &:first-of-type{
                color: red;
              }
            }
             s{
               color: #9d9d9d;
             }
           div{
              position: relative;
              width: 0.9rem;
              height: 1.1rem;
             float: left;
             img{
             height: 100%;
             }

           }
           &:last-of-type{
             height: 1.1rem;
             width: 1.1rem;
             img{
               float: left;
               width: 0.5rem;
              height: 0.54rem;
              margin-left: 0.04rem;
             }
           }
           span{
               display: block;
               height: 100%;
               width: 100%;
               background: rgba($color: #000000, $alpha: 0.05);
               position: absolute;
               top: 0;
               left: 0;
             }
         }
            .lookmore{
               height: 0.5rem;
               line-height: 0.5rem;
               text-align: center;
             }
    }
  }
</style>
