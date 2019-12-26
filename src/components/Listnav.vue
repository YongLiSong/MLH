<template>
    <div>
        <div class="list_top">
        <i class="iconfont icon-icon-test59" @click="handleback"></i>
          <slot></slot>
        <i class="iconfont icon-icon-test39" @click="showmun"></i>
        <div class="list_top_mun"  v-show="isShow">
            <ul>
            <li v-for="(list,index) in munlist" :key="index" @click="handlto(list.path)">
                {{ list.name }}
            </li>
            </ul>
        </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: false,
      munlist: [
        {
          path: '/index',
          name: '首页'
        },
        {
          path: '/shoppingcar',
          name: '购物袋'
        },
        {
          path: '/center',
          name: '个人中心'
        }
      ]
    }
  },
  methods: {
    showmun () {
      this.isShow = !this.isShow
    },
    handleback () {
      this.$router.back()
    },
    handlto (path) {
      this.$router.push(`${path}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.list_top{
    position: relative;
    width: 100%;
    height: 0.42rem;
    background: #fff;
    display: flex;
    box-sizing: border-box;
    padding: 0 0.08rem;
    i.icon-icon-test59{
      font-size: 0.4rem;
      color: #2a2a2a;
    }
    i.icon-icon-test39{
      font-size: 0.36rem;
      color: #2a2a2a;
    }
    .list_top_mun{
      position: absolute;
      top: 0.44rem;
      right: 0;
      width: 1.05rem;
      height: 1.55rem;
      background: #f5f5f5;
      z-index: 5000;
      li{
        height: 0.52rem;
        border-bottom: 1px solid #d6d6d6;
        line-height: 0.52rem;
        text-align: center;
      }
      li:last-child{
          border: none;
        }
    }
    p{
      margin: 0 auto;
      font-weight: bold;
      line-height: 0.42rem;
      font-size: 0.2rem;
      color: #2a2a2a;
    }
  }
</style>
