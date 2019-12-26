<template>
  <div id="box">
    <div class="box">
      <div>
        <img :src="dataobj.columnImg" alt="">

      </div>
      <div v-for="data in datalist" :key="data.productId">
        <img :src="data.imageUrl" alt="">
        <p class="goodsname">{{data.brandName}}</p>
        <p class="goodsprice">￥{{data.itemPriceDto.price}}</p>
        <p class="dateprice">￥{{data.marketPrice}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  data () {
    return {
      dataobj: {},
      datalist: []
    }
  },
  mounted () {
    Axios({
      url: 'https://www.mei.com/appapi/clearance/cmsDetailInfo/v3?cmsId=2120000100000000662'
    }).then(res => {
      this.dataobj = res.data.cmsDto
      this.datalist = res.data.cmsDto.productDtos
    })
  }
}
</script>
<style lang="scss" scoped>
  #box{
    border-radius: 0.05rem;
    margin-top: 0.1rem;
    width: 100%;

    background: white;
    border-radius: 0.05rem;

    .box{
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      div{
        position: relative;
        width: 33.3%;

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

        }
        &:nth-child(2){
          &:after{
            content: "";
            position: absolute;
            right: 0;
            top:5%;
            width: 1px;
            height: 90%;
            background-color:#ccc;
          }

        }
        &:nth-child(4){
          &:after{
            content: "";
            position: absolute;
            right: 0;
            top:5%;
            width: 1px;
            height: 90%;
            background-color:#ccc;
          }

        }
        &:nth-child(5){
          &:after{
            content: "";
            position: absolute;
            right: 0;
            top:5%;
            width: 1px;
            height: 90%;
            background-color:#ccc;
          }

        }
      }

    }

  }
</style>
