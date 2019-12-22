<template>
  <div>
    <div v-if="bannerlist.length" class="bannerbox">
      <div class="swiper-slide" v-for="data in bannerlist" :key="data.di">
        <img :src="data.main_image" @click="handeclick(data.di)" />
        <div class="bannercontent">
          <h2>{{ data.main_title }}</h2>
          <span>{{ data.sub_title }}</span>
          <span>{{ data.description }}</span>
        </div>
      </div>
    </div>
    <div v-if="list.length" class="listbox">
       <ul>
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
import Vuex from 'vuex'
import Axios from 'axios'

export default {
  data () {
    return {
      bannerlist: [],
      list: []
    }
  },
  mounted () {
    Axios({
      url: 'http://www.meihigo.hk/appapi/home/mktBannerApp/v3?silo_id=2013000100000000005&platform_code=PLATEFORM_H5'
    }).then(res => {
      this.bannerlist = res.data.banners
    })
    Axios({
      url: 'http://www.meihigo.hk/appapi/silo/eventForH5?categoryId=kids&pageIndex=1&timestamp=1576997107329&summary=111bb03d1e8469e7ff1def4b0e6dcd57&platform_code=H5'
    }).then(res => {
      this.list = res.data.eventList
      console.log(this.list)
    })
  }
}
</script>
<style lang="scss" scoped>
    .bannerbox{
      position: relative;
        top: 0;
        width: 100%;
        top:-96px;
    }
  .bannercontent{
    h2{
      font-size: 30px;
    }
    height: 100px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    text-align: center;
    color: #fff;
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%)
  }
   img{
        width: 100%;
    }

.listbox{
  ul{
    margin-bottom:30px;
    h2{
      margin-left: 20px;
    }
  }
  h2{
    font-size: 26px;
    font-weight: normal;
  }
  li{
    box-sizing: border-box;
    position: relative;
    padding: 10px 16px;
  }
  .listcontent{
    h3{
      font-weight: normal;
    }
    position: absolute;
    bottom: 20px;
    left:30px;
    color: white;
  }
}
</style>
