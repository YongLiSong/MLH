<template>
    <div>
        <ul>
            <!-- <li tag="li" to="">推荐</li> -->
            <router-link  v-for="data in routerlist" :key="data.id" tag="li" active-class="active" :to="data.path" @click.native="getid(data.id)">
              <span>
                {{data.name}}
              </span>
            </router-link>
            <!-- <li tag="li" @click="heanderclick()" to="">即将上新</li> -->
        </ul>
    </div>
</template>
<script>
import Axios from 'axios'
import Vuex from 'vuex'

export default {
  data () {
    return {
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
  methods: {
    getid (id) {
      this.$store.dispatch('getNavId', id)
      console.log(this.$store.state.bannerlist)
      console.log('id:' + id)
    }
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
}
    ul{
      height: 0.5rem;
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
        color: #fff;
        margin-top: 0.1rem;
        width: 100%;
        padding-left:0.1rem;
        li{
          margin-right: 0.2rem;
            float: left;
            font-size: 0.16rem;
            text-align: center;
        }
    }
</style>
