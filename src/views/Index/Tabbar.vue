<template>
    <div>
        <ul id="isWhite" :class="{'isWhite' : isWhite}">
            <router-link  v-for="data in routerlist" :key="data.id" tag="li" active-class="active" :to="data.path" @click.native="getid(data.id)">
              <span id="isBlack" :class="{'isBlack' : isBlack}">
                {{data.name}}
              </span>
            </router-link>
        </ul>
    </div>
</template>
<script>
import Axios from 'axios'
import Vuex from 'vuex'

export default {
  data () {
    return {
      isBlack: false,
      isWhite: false,
      navlist: [],
      routerlist: [
        {
          path: 'index',
          id: '2013000100000000008',
          name: '推荐'
        },
        {
          path: '/index/crossborder',
          id: '2013000100000000011',
          name: '海外'
        },
        {
          path: '/index/women',
          id: '2013000100000000001',
          name: '女士'
        },
        {
          path: '/index/men',
          id: '2013000100000000002',
          name: '男士'
        },
        {
          path: '/index/cosmetics',
          id: '2013000100000000003',
          name: '美妆'
        },
        {
          path: '/index/lifestyle',
          id: '2013000100000000004',
          name: '家居'
        },
        {
          path: '/index/kids',
          id: '2013000100000000005',
          name: '婴童'
        },
        {
          path: 'index2',
          name: '即将推出'
        }
      ]
    }
  },
  mounted () {
    window.addEventListener('scroll', this.initHeight)
    this.$nextTick(() => {
      // 获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
      this.offsetTop = document.querySelector('#boxFixed').offsetTop
      this.offsetTop = document.querySelector('#isHeight').offsetTop
    })
  },
  methods: {
    getid (id) {
      this.$store.dispatch('getNavId', id)
      // console.log(this.$store.state.bannerlist)
      // console.log('id:' + id)
    },
    initHeight () {
      // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 如果被卷曲的高度大于吸顶元素到顶端位置 的距离
      this.isBlack = scrollTop > this.offsetTop
      this.isWhite = scrollTop > this.offsetTop
      // console.log('吸顶')
    }
  },
  // 回调中移除监听
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
div{
   width: 100%;
    overflow: scroll;
    white-space: nowrap;
    position: relative;
    z-index: 100;
    color: #fff;
 }
      .isWhite{
        background: #fff;
        box-shadow: 0 0.013333rem 0.133333rem 0.066667rem rgba(0,0,0,.09);
      }
    ul{
      height: 0.4rem;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: justify;
      justify-content: space-between;
      .active{
          position: relative;
          &::after{
              content: "";
              display: block;
              width: 0.2rem;
              height: 0.03rem;
              background: #fff;
              border-radius: 0.15rem;
              position: absolute;
              top: 0.24rem;
              left: 50%;
              margin-left: -0.1rem;
          }
          }
        padding-top: 0.1rem;
        width: 116%;
        padding-left:0.1rem;
        .isBlack{
          color: #000;
        }
        li{
          margin-right: 0.2rem;
            float: left;
            font-size: 0.16rem;
            text-align: center;
        }
    }
</style>
