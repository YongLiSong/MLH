<template>

    <div>
    <div class="bannerbox">
      <div class="swiper-slide">
        <img src="TB1WQ91o4z1gK0jSZSgXXavwpXa-750-900.jpg" />
      </div>
    </div>
    <div v-if="list.length" class="listbox">
       <ul v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
        <li v-for="data2 in list" :key="data2.eventId" @click="golist(data2.eventId)">
          <img :src="data2.imageUrl" :alt="data2.englishName">
          <div class="listcontent">
            <h3>{{data2.englishName}}</h3>
            <p>{{data2.chineseName}}</p>
            <p>{{data2.discountText}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
    <!-- 海外 -->

</template>
<script>
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

export default {
  data () {
    return {
      list: [],
      info: null,
      num: 1
    }
  },
  methods: {
    loadMore () {
      this.num++
      if (this.num > this.info.totalPages) {
        return
      }
      Axios({
        url: `http://www.meihigo.hk/appapi/silo/eventForH5?categoryId=women&pageIndex=${this.num}&timestamp=1576997710438&summary=0ca8d473177520a42ea581d9d7f2fde6&platform_code=H5`
      }).then(res => {
        this.list = [...this.list, ...res.data.eventList]
        // console.log(res.data)
      })
    },
    golist (id) {
      this.$router.push(`/list/${id}`)
    }
  },
  mounted () {
    Axios({
      url: `http://www.meihigo.hk/appapi/silo/eventForH5?categoryId=women&pageIndex=${this.num}&timestamp=1576997710438&summary=0ca8d473177520a42ea581d9d7f2fde6&platform_code=H5`
    }).then(res => {
      this.list = res.data.eventList
      this.info = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
.bannerbox{
      position: absolute;
        top: 0;
        width: 100%;

    }
  .bannercontent{
    h2{
      font-size: 0.28rem;
    }
    height: 0.1rem;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    text-align: center;
    color: #fff;
    position: absolute;
    bottom: 0.64rem;
    left: 50%;
    transform: translate(-50%);
    .sub_title{
      font-size: 0.16rem;
    }
    .description{
      font-size: 0.16rem;
    }
  }
   img{
        width: 100%;
    }

.listbox{
  ul{
    margin-bottom:0.3rem;
    h2{
      margin-left: 0.2rem;
    }
  }
  h2{
    font-size:0.26rem;
    font-weight: normal;
  }
  li{
    box-sizing: border-box;
    position: relative;
    padding: 0.1rem 0.16rem;
  }
  .listcontent{
    h3{
      font-weight: normal;
      font-size: 0.18rem;
    }
    position: absolute;
    bottom: 0.2rem;
    left:0.3rem;
    color: white;
    p{
      font-size: 0.18rem;
    }
  }
}

</style>
