<template>
  <div>
    <div v-if="bannerlist.length" class="bannerbox">
      <div class="swiper-slide" v-for="data in bannerlist" :key="data.di">
        <img :src="data.main_image" />
        <div class="bannercontent">
          <h2>{{ data.main_title }}</h2>
          <span>{{ data.sub_title }}</span>
          <span>{{ data.description }}</span>
        </div>
      </div>
    </div>
    <div v-if="list.length" class="listbox">
       <ul
            v-infinite-scroll="loadMore"
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
    <!-- 海外 -->
  </div>
</template>
<script>
import Vue from 'vue'
import Axios from 'axios'

export default {
  data () {
    return {
      bannerlist: [],
      list: [],
      num: 1,
      info: null
    }
  },
  methods: {
    loadMore () {
      this.num++
      if (this.num > this.info.totalPages) {
        return
      }
      Axios({
        url: `http://www.meihigo.hk/appapi/silo/eventForH5?categoryId=crossborder&pageIndex=${this.num}&timestamp=1576996731180&summary=f7f6ca48f5fba9a833637ee4157cdfc8&platform_code=H5`
      }).then(res => {
        this.list = [...this.list, ...res.data.eventList]
        // console.log(this.list)
      })
    },
    golist (id) {
      this.$router.push(`/list/${id}`)
    }
  },
  mounted () {
    Axios({
      url: 'http://www.meihigo.hk/appapi/home/mktBannerApp/v3?silo_id=2013000100000000011&platform_code=PLATEFORM_H5'
    }).then(res => {
      this.bannerlist = res.data.banners
    })
    Axios({
      url: 'http://www.meihigo.hk/appapi/silo/eventForH5?categoryId=crossborder&pageIndex=1&timestamp=1576996731180&summary=f7f6ca48f5fba9a833637ee4157cdfc8&platform_code=H5'
    }).then(res => {
      this.list = res.data.eventList
      this.info = res.data
      // console.log(this.list)
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
