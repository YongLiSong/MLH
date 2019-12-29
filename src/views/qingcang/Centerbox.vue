<template>
  <div id="box">
    <div class="box">
      <div @click="handleGood()">
        <img :src="dataobj.columnImg" alt="">
        <p class="mainTitle">{{dataobj.mainTitle}}<span>{{dataobj.total}}款</span></p>
        <p class="subTitle">{{dataobj.subTitle}}</p>

      </div>
      <div v-for="data in datalist" :key="data.productId" @click="handleClick(data.productId)">
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
import Vue from 'vue'
var bus = new Vue()
export default {
  data () {
    return {
      dataobj: {},
      datalist: []

    }
  },
  props: ['id', 'datalistlength', 'offsettop'],
  mounted () {
    Axios({
      url: `https://www.mei.com/appapi/clearance/cmsDetailInfo/v3?cmsId=${this.id}`
    }).then(res => {
      this.dataobj = res.data.cmsDto
      let length = this.datalistlength
      if (!length) {
        length = res.data.cmsDto.productDtos.length
      }
      this.datalist = res.data.cmsDto.productDtos.splice(0, Number(length))
    })
  },
  methods: {
    handleClick (id) {
      this.$router.push(`/Detail/${id}`)
      console.log(id)
    },
    handleGood () {
      this.$router.push('/qingcang/good')
      // console.log(this.$refs.top.$el.clientHeight)

      //  document.body.scrollTop = this.$refs.top.$el.clientHeight+'px'
      document.documentElement.scrollTop = this.offsettop

      bus.$emit('qiehuangoods')
    }
  }
}
</script>
<style lang="scss" scoped>
  #box{
    border-radius: 0.05rem;
    margin-top: 0.1rem;
    width: 100%;

    overflow: hidden;
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
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .goodsprice{
          font-size: 0.11rem;
          color: #dd2828;
        }
        .dateprice{
          font-size: 0.09rem;
          color: #ccc;
          text-decoration: line-through;
          margin-bottom: 0.1rem;
        }
        &:nth-child(1){
          .mainTitle{
            position: absolute;
            left: 0.07rem;
            top: 0.14rem;
            font-size: 0.16rem;
            color: white;
            span{
              font-size: 0.1rem;
              color: #f4d8ce;
              margin-left: 0.06rem
            }
          }
          .subTitle{
            position: absolute;
            left: 0.07rem;
            top: 0.35rem;
            font-size: 0.12rem;
            color: white;
          }

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
