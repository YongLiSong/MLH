<template>
    <div>
      <div class="box_fixed" id="boxFixed" :class="{'is_fixed' : isFixed}">
        <seatch></seatch>
        <tabbar></tabbar>
      </div>
      <div class="ntn_height" id="isHeight" :class="{'isHeight' : isHeight}"></div>
        <router-view v-if="$store.state.allShow"></router-view>
    </div>
</template>
<script>
import Axios from 'axios'
import tabbar from '@/views/Index/Tabbar'
import seatch from '@/components/Search'

export default {
  data () {
    return {
      bannerslist: [],
      goodsList: [],
      isFixed: false,
      isHeight: false,
      offsetTop: 0
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
    initHeight () {
      // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 如果被卷曲的高度大于吸顶元素到顶端位置 的距离
      this.isFixed = scrollTop > this.offsetTop
      this.isHeight = scrollTop > this.offsetTop
      // console.log('吸顶')
    }
  },
  // 回调中移除监听
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
    tabbar,
    seatch
  }
}
</script>
<style lang="scss" scoped>
  .ntn_height{
    height: 3.6rem;
        height: 3.9rem;
  }
  .isHeight{
    height: 4.8rem;
  }
  .box_fixed{
    width: 100%
  }
   .is_fixed{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    .searchHead{
      background: rgba($color: #fff, $alpha: 1.0);
    }

  }
</style>
