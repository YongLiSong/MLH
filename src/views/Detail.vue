<template>
    <div v-if="detailInfo">
      <listnav>
        <div class="detail_title">
            <span class="brand">{{detailInfo.brand}}</span>
            <span class="price">¥{{detailInfo.price}}</span>
        </div>
      </listnav>
      <swiper v-if="detailBanner.length"  class="bannerbox">
        <div class="swiper-slide" v-for="(items,index) in detailInfo.images" :key="index">
            <img :src="items.bigImgUrl">
         </div>
      </swiper>
      <div class="detail_menu">
        <h3>{{ detailInfo.name }}</h3>
        <span class="marketPrice">{{detailInfo.marketPrice}}</span>
        <span class="price">￥{{detailInfo.price}}</span>
        <span class="discount">{{detailInfo.discount}}</span>
        <i>买手推荐</i>
        <div class="estimated_date">{{detailInfo.deliver_date}}</div>
        <div class="line1"></div>
        <h4>闪购</h4>
        <div class="back_time">{{countDownList}}</div>
        <div class="line1"></div>
        <h4>服务</h4>
        <ul class="artos">
          <li v-for="(artos,index) in detailInfo.service_labels" :key="index">
            {{ artos.label_title }}
          </li>
        </ul>
        <div class="line1"></div>
        <h4>尺码</h4>
        <ul class="size">
          <li v-for="size in detailInfo.size" :key="size.productId" @click="handlclick(size.productId)" :class="activeClass == size.productId ? 'size_choose':''">
            {{size.sizeLabel}}
          </li>
        </ul>
         <div class="line1"></div>
      </div>
      <div class="detail_parameter">
        <h2>商品参数</h2>
        <img :src="detailInfo.description.material_quality_img" alt="">
        <ul>
          <li v-for="(dist,index) in detailParameter" :key="index">
           <p class="name"> {{ dist.name }}</p>
           <p class="value"> {{ dist.value }}</p>
          </li>
        </ul>
      </div>
      <div class="detail_item">
        <h2>商品详情</h2>
        <p>{{detailInfo.description.design}}</p>
        <div v-for="(items,index) in detailInfo.images" :key="index" class="imgs_box">
            <img :src="items.bigImgUrl">
        </div>
      </div>
      <!-- 底部固定 -->
      <div class="detail_bar">
        <i class="iconfont icon-icon-test10"></i>
        <p class="addCart" @click="showmun">加入购物车</p>
        <span></span>
        <p class="buynow">立即购买</p>
      </div>
      <!-- 展开的购物车 -->
      <div class="toincart_bg"  v-show="isShow">
        <transition name="kerwinbounce">
        <div class="toincart" v-show="isShow" ref="mycarts">
          <div class="toincart_img"  v-for="(items,index) in detailInfo.images.slice(0,1)" :key="index">
            <img :src="items.bigImgUrl" style="width:0.76rem;" ref="myimg">
          </div>
          <i class="iconfont icon-icon-test44" @click="nonemun"></i>
          <span class="price_unit">￥</span>
          <h2 ref="myprice">{{detailInfo.price}}</h2>
          <ul class="color">
            <li v-for="(dist,index) in detailParameter.slice(5,6)" :key="index">
             <span>已选： </span><p class="value" ref="myvalue">{{ dist.value }}</p>
            </li>
          </ul>
          <ul class="size">
          <i>尺码</i>
          <li v-for="size in detailInfo.size" :key="size.productId" @click="handlclick(size.productId)" :class="activeClass == size.productId ? 'size_choose':''">
            <p ref="mysize">{{size.sizeLabel}}</p>
          </li>
          </ul>
          <div class="itemnum">
            <i>数量</i>
            <button class="min" @click="min">-</button>
            <span ref="mynum"> {{num}}</span>
            <button class="add" @click="add">+</button>
          </div>
          <div class="add_buy">
            <button class="addCart1" @click="addCart">加入购物车</button>
            <button class="buynow1">立即购买</button>
          </div>
        </div>
        </transition>
      </div>

      <div class="button_box"></div>
    </div>
</template>

<script>
import Axios from 'axios'
import listnav from '@/components/Listnav'
import swiper from '@/components/Swiper'
import $ from 'jquery'
export default {
  data () {
    return {
      detailInfo: null,
      detailBanner: [],
      detailParameter: [],
      countDownList: '00天00时00分00秒',
      actEndTime: '2020-11-19 18:50:00',
      activeClass: 0,
      num: 1,
      isShow: false
    }
  },
  created () {
    this.countDown()
  },
  components: {
    listnav,
    swiper
  },
  mounted () {
    // console.log(this.$route.params.glsCode)
    Axios({
      url: `http://www.mei.com/appapi/product/detail/v3?categoryId=2120005100000003429&productId=${this.$route.params.glsCode}&platform_code=H5&timestamp=1577067298102&summary=b558c216920bbc762468d976457e41f3`
    }).then(res => {
      console.log(res.data.infos)
      this.detailInfo = res.data.infos
      this.detailBanner = this.detailInfo.images
      this.detailParameter = this.detailInfo.description.attributesList
      // console.log(this.detailParameter)
      // console.log(this.detailBanner)
    })
  },
  methods: {
    addCart: function () {
      // localStorage.setItem(myprice, myvalue, mysize, mynum)
      // console.log(Number(this.$refs.myprice.innerHTML))
      // console.log(this.$refs.mysize.filter('size_choose').html())
      // console.log($('.toincart').find('.size_choose').text())
      // console.log(Number(this.$refs.mynum.innerHTML))
      // console.log(this.$refs.myimg[0].src)
      var myprice = Number(this.$refs.myprice.innerHTML)
      var mysize = $('.toincart').find('.size_choose').text()
      // var myvalue = this.$refs.myvalue[0].innerHTML
      var myvalue = $('.toincart').find('.value').text()
      console.log(myvalue)
      var myimg = this.$refs.myimg[0].src
      var mynum = Number(this.$refs.mynum.innerHTML)

      console.log(JSON.stringify(myprice))
      localStorage.setItem('价格', JSON.stringify(myprice))
      localStorage.setItem('已选', JSON.stringify(myvalue))
      localStorage.setItem('尺码', JSON.stringify(mysize))
      localStorage.setItem('图片', JSON.stringify(myimg))
      localStorage.setItem('数量', JSON.stringify(mynum))

      alert('添加成功')
    },
    showmun () {
      this.isShow = !this.isShow
    },
    nonemun () {
      this.isShow = !this.isShow
    },
    add () {
      this.num++
    },
    min () {
      this.num--
      if (this.num < 1) {
        this.num = 1
      }
    },
    handlclick (id) {
      this.activeClass = id
      // if(this.activeClass === 'size_choose'){
      //   console.log(this.activeClass)
      // }
    },
    timeFormat (param) {
      return param < 10 ? '0' + param : param
    },
    countDown (it) {
      var interval = setInterval(() => {
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime()
        // 对结束时间进行处理渲染到页面
        let endTime = new Date(this.actEndTime).getTime()
        let obj = null
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          let time = (endTime - newTime) / 1000
          // 获取天、时、分、秒
          let day = parseInt(time / (60 * 60 * 24))
          let hou = parseInt(time % (60 * 60 * 24) / 3600)
          let min = parseInt(time % (60 * 60 * 24) % 3600 / 60)
          let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60)
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          }
        } else { // 活动已结束，全部设置为'00'
          obj = {
            day: '00',
            hou: '00',
            min: '00',
            sec: '00'
          }
          clearInterval(interval)
        }
        this.countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒'
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>

    .kerwinbounce-enter-active {
        animation: aaa 0.5s;
    }
    .kerwinbounce-leave-active {
        animation: aaa 0.5s reverse;
    }
    @keyframes aaa {
        0% {
          opacity: 0;
          transform: translateY(100px);
        }

        100% {
          opacity: 1;
          transform: translateY(0px);
        }
    }

  .detail_title{
    width: 100%;
    span{
      display: block;
      width: 100%;
      text-align: center;
    }
    span.price{
      color: #e14343;
    }
    span.brand{
       font-size: 0.12rem;
        color: #1d1d1d;
        font-weight: bold;
        text-transform: Uppercase;
    }
  }
  .bannerbox{
    width:3.35rem;
    height: 4.03rem;
    box-shadow: 0 0.013333rem 0.133333rem 0.066667rem rgba(0,0,0,.05);
    .swiper-slide{
      img{
        width: 100%
      }
    }
  }
  .detail_menu{
    box-sizing: border-box;
    padding: 0 0.2rem;
    h3{
      font-size: 0.2rem;
      margin-top: 0.15rem;
      color: #1d1d1d;
    }
    .marketPrice{
      display: block;
      font-size: 0.1rem;
      color: #c9c9c9;
      text-decoration: line-through;
      margin-top: 0.11rem;
    }
    .price{
      font-size: 0.12rem;
      color: #e14343;
      font-weight: bold;
      margin-top: 0.08rem;
      margin-right: 0.09rem;
    }
    .discount{
       font-size: 0.1rem;
      width: 0.33rem;
      height: 0.18rem;
      border: 1px solid #1d1d1d;
      color: #1d1d1d;
      line-height: 0.18rem;
      text-align: center;
      margin-right: 0.09rem;
    }
    i{
      display: inline;
      font-size: 0.1rem;
      border: 1px solid #1d1d1d;
      color: #1d1d1d;
      line-height: 0.18rem;
      text-align: center;
    }
    .estimated_date{
      margin-top: 0.11rem;
    }
    .line1{
      width: 100%;
      height: 1px;
      background: #c9c9c9;
      margin: 0.3rem 0;
    }
    h4{
      display: inline;
      margin-right: 0.18rem;
      color: #666666;
    }
    .back_time{
      display: inline;
      font-size: #000;
      font-weight: bold;
    }
    .artos{
      width: 2.85rem;
      float: right;
      li{
        float: left;
        padding-right: 0.12rem;
        margin-right: 0.12rem;
        box-sizing: border-box;
        border-right: 1px solid #c9c9c9;
        &:last-child{
          border: none;
          padding: 0;
          margin: 0;
        }
      }
    }
    .size{
      width: 2.85rem;
      float: right;
      margin-bottom: 0.2rem;
      li{
        float: left;
        width: 0.31rem;
        height: 0.27rem;
        line-height: 0.27rem;
        text-align: center;
        margin-right: 0.16rem;
        box-sizing: border-box;
        box-shadow: 0 0.013333rem 0.133333rem 0.066667rem rgba(0,0,0,.05);
        &:last-child{
          padding: 0;
          margin: 0;
        }
      }
    }
    .size_choose{
      float: left;
        width: 0.31rem;
        height: 0.27rem;
        color: #fff;
        background: #000;
        line-height: 0.27rem;
        text-align: center;
        margin-right: 0.16rem;
        box-sizing: border-box;
        &:last-child{
          padding: 0;
          margin: 0;
    }
  }
}
.detail_parameter{
    box-sizing: border-box;
    padding: 0 0.2rem;
    h2{
      font-size: 0.2rem;
      color: #000;
      font-weight: bold;
      margin-bottom: 0.2rem;
    }
    img{
      width: 100%;
      margin-bottom: 0.2rem;
    }
    ul{
        width: 3.34rem;
        height: 2.5rem;
        border-bottom: 1px solid #c9c9c9;
             margin-bottom: 0.2rem;
      li{
        width: 3.34rem;
        height: 0.24rem;
        p{
          float: left;
        }
        p.name{
          color: #999;
          width: 1.13rem;
        }
        p.value{
          color: #000;
          width: 2.19rem;
        }
      }
    }
}
.detail_item{
    box-sizing: border-box;
    padding: 0 0.2rem;
      h2{
      font-size: 0.2rem;
      color: #000;
      font-weight: bold;
      margin-bottom: 0.2rem;
      }
            .imgs_box{
        width: 100%;
        img{
          width: 100%;
          margin-bottom: 0.26rem;
        }
    }
}
.detail_bar{
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  height: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0.013333rem 0.133333rem 0.066667rem rgba(0,0,0,.05);
  i.icon-icon-test10{
    font-size: 0.35rem;
    margin-right: 0.3rem;
  }
  .addCart{
    font-size: 0.17rem;
    color: #000;
    font-weight: bold;
  }
  span{
    display: block;
    height: 100%;
    width: 1px;
    background: #c9c9c9;
  }
  .buynow{
    font-size: 0.17rem;
    color: #e14343;
    font-weight: bold;
    margin-right: 0.2rem;
  }
}
.button_box{
  height: 0.5rem;
  width: 100%;
}
.toincart_bg{
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 700;
  overflow-y: hidden;
  .toincart{
    width: 100%;
    height: 4.5rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    z-index: 800;
    opacity: 1;
    .toincart_img{
      width: 0.75rem;
      height: 1rem;
      position: absolute;
      left: 0.15rem;
      top: -0.27rem;
      box-shadow: 0 0.013333rem 0.133333rem 0.066667rem rgba(0,0,0,.05);
      background: #fff;
      img{
        width: 100%;
      }
    }
    i.icon-icon-test44{
      font-size: 0.3rem;
      position: absolute;
      right: 0.15rem;
      top: 0.15rem;
      color: #828282;
    }
    .price_unit{
      position: absolute;
      left: 1.11rem;
      top: 0.32rem;
    }
    h2{
      font-size: 0.16rem;
      color: #000;
      position: absolute;
      left: 1.27rem;
      top: 0.32rem;
      font-weight: bold;
    }
    .color{
      position: absolute;
      left: 1.11rem;
      top: 0.55rem;
      color: #666666;
      span{
        float: left;
      }
      p.value{
        width: 1.9rem
      }
    }
  .size{
      width: 2.85rem;
      float: right;
      margin-bottom: 0.2rem;
      position: absolute;
      top: 1.4rem;
      left: 0.15rem;
      i{
        position: absolute;
        top: -0.4rem;
      }
      li{
        float: left;
        width: 0.31rem;
        height: 0.27rem;
        line-height: 0.27rem;
        text-align: center;
        margin-right: 0.16rem;
        box-sizing: border-box;
        box-shadow: 0 0.013333rem 0.133333rem 0.066667rem rgba(0,0,0,.05);
        &:last-child{
          padding: 0;
          margin: 0;
        }
      }
    }
    .size_choose{
      float: left;
        width: 0.31rem;
        height: 0.27rem;
        color: #fff;
        background: #000;
        line-height: 0.27rem;
        text-align: center;
        margin-right: 0.16rem;
        box-sizing: border-box;
        &:last-child{
          padding: 0;
          margin: 0;
      }
    }
    .itemnum{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 1.97rem;
      width: 3.47rem;
      i{
        margin-right: 2.0rem;
      }
      button{
        width: 0.3rem;
        height: 0.3rem;
        background: #eeeeee;
        border: none;
      }
      button.min{
        margin-right: 0.18rem;
      }
      button.add{
        margin-left: 0.18rem;
      }
    }
    .add_buy{
      width: 100%;
      height: 0.5rem;
      background: #fff;
      box-shadow: 0 0.013333rem 0.133333rem 0.066667rem rgba(0,0,0,.05);
      display: flex;
      justify-content: space-around;
      position: absolute;
      bottom: 0;
      button{
        background: #fff;
        border: none;
        font-size: 0.16rem;
        font-weight: bold;
      }
      button.buynow1{
        color: #e14343;
      }
    }
  }
}
</style>
