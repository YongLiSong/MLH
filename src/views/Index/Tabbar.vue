<template>
    <div>
        <ul>
            <!-- <li tag="li" to="">推荐</li> -->
            <router-link  v-for="data in routerlist" :key="data.id" tag="li" active-class="active" :to="data.path">
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
export default {
  data () {
    return {
      navlist: [],
      routerlist: [
        {
          path: 'index',
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
          path: 'index',
          name: '即将推出'
        }
      ]
    }
  },
  methods: {
    heanderclick (id) {
      this.$store.commit('getNavId', id)
      console.log(this.$store.state.navId)
      console.log('123123')
    }
  },
  mounted () {
    // Axios.get('http://www.mei.com/appapi/silo/navigationAll/v3?timestamp=1576578231421&summary=01ea05ec80bceb3efa31547cad850ef9').then(res => {
    //   this.navlist = res.data.lists
    //   console.log(res.data)
    // })
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
        margin-top: 10px;
        width: 125%;
        display: flex;
        li{
            color: #fff;
            flex-flow: row;
            &:last-of-type{
                word-wrap:normal;
            }
            flex: 1;
            line-height: 36px;
            font-size: 16px;
            text-align: center;
        }
    }
</style>
