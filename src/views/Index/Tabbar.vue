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
    overflow:scroll;
    position: relative;
    z-index: 100;
}

    ul{
      .active{
          color: black;
          }
        color: #fff;
        margin-top: 10px;
        width: 110%;
        padding-left:10px;
        li{

          margin-right: 20px;
            float: left;
            line-height: 36px;
            font-size: 16px;
            text-align: center;
        }
    }
</style>
