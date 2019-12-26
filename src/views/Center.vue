<template>
    <div>
      <listnav>
        <div class="detail_title">
          <p>个人中心</p>
        </div>
      </listnav>
      <div class="center_missage">
        <p>欢迎{{ username }}</p>
        <div class="user-header">
            <img  alt="" :src='imgStr' class="user-header-img user-header-com">
            <input type="file" name="image" accept="image/*" @change='onchangeImgFun'
            class="header-upload-btn user-header-com">
            <span class="tip">图片限制50kb <span class="error">{{errorStr}}</span></span>
        </div>
      </div>
      <div class="to">
        <button @click="toHome">返回首页</button>
        <button @click="toCart">购物车</button>
        <div class="cartsNum" id="cartsNum" v-show="isNumShow">
          <p id="P">
            {{cartNums}}
          </p>
        </div>
      </div>
    </div>
</template>
<script>
import listnav from '@/components/Listnav'
export default {
  data () {
    return {
      myphone: '',
      username: '',
      imgStr: require('@/assets/logo.png'),
      errorStr: '',
      cartNums: 0,
      isNumShow: false
    }
  },
  mounted () {
    var valueMyUserName = decodeURIComponent(window.atob(localStorage.getItem('token')))
    this.username = valueMyUserName
  },
  updated () {
    let localcartNums = this.getCartStorage() || []
    this.cartNums = localcartNums.length
    // console.log(this.cartNums)
    if (this.cartNums !== 0) {
      this.isNumShow = true
    } else {
      this.isNumShow = false
    }
  },
  components: {
    listnav
  },
  methods: {
    getCartStorage () {
      return JSON.parse(localStorage.getItem('cart'))
    },
    toHome () {
      this.$router.push('/index')
    },
    toCart () {
      this.$router.push('/shoppingcar')
    },
    onchangeImgFun (e) {
      var file = e.target.files[0]
      // console.log(file)
      // 获取图片的大小，做大小限制有用
      let imgSize = file.size
      // console.log(imgSize)
      var _this = this // this指向问题，所以在外面先定义
      // 比如上传头像限制5M大小，这里获取的大小单位是b
      if (imgSize <= 50 * 1024) {
        // 合格
        _this.errorStr = ''
        // console.log('大小合适')
        // 开始渲染选择的图片
        // base64方法
        var reader = new FileReader()
        reader.readAsDataURL(file) // 读出 base64
        reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result
          // console.log(dataURL)
          _this.imgStr = dataURL
          localStorage.setItem('headPortrait', _this.imgStr)
          if (localStorage.getItem('headPortrait')) {
            // console.log('有头像了')
            _this.imgStr = localStorage.getItem('headPortrait')
          } else {
            // console.log('没有头像')
          }
        }
      } else {
        // console.log('大小不合适')
        _this.errorStr = '图片大小超出范围'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .detail_title{
        width: 100%;
        p{
           text-align: center;
        }
    }
    .center_missage{
      width: 3.29rem;
      background: #fff;
      margin: 0.2rem auto;
      border-bottom: 1px solid #9d9d9d;
      p{
        text-align: center;
        font-size: 0.2rem;
        font-weight: bold;
        color:#9d9d9d;
      }
      .user-header{
         img{
            width: 0.6rem;
            height: 0.6rem;
            background: #9d9d9d;
            border-radius: 100%;
            margin: 0.2rem auto;
        }
        input{
          display: block;
          margin: 0 auto;
          width: 0.7rem;
        }
        span{
          display: block;
          text-align: center;
          font-size: 0.14rem;
          color: #9d9d9d;
          margin-top: 0.2rem;
        }
      }
    }
    .to{
      width: 3.29rem;
      background: #fff;
      margin:0 auto;
      margin-top:  0.2rem;
      padding-bottom:  0.2rem;
      box-sizing: border-box;
      border-bottom: 1px solid #9d9d9d;
      display: flex;
      justify-content: space-around;
      position: relative;
      button{
        background: none;
        border: none;
      }
      .cartsNum{
        width: 0.15rem;
        height: 0.15rem;
        background: #dd2828;
        border-radius: 100%;
        position: absolute;
        right: 0.37rem;
        bottom: 0.25rem;
        p{
          color: #eeeeee;
          text-align: center;
          line-height: 0.15rem;
          font-size: 0.08rem;
        }
      }
    }
</style>
