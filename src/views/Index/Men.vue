<template>
  <div>
    <div class="bannerbox">
      <div class="swiper-slide">
        <img src="https://img.alicdn.com/tfs/TB1WQ91o4z1gK0jSZSgXXavwrema-750-900.jpg" @click="handeclick(data.di)" />
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
      list: []
    }
  },
  methods: {
    golist (id) {
      this.$router.push(`/list/${id}`)
    }
  },
  mounted () {
    Axios({
      url: 'http://www.meihigo.hk/appapi/silo/eventForH5?categoryId=men&pageIndex=1&timestamp=1576997395324&summary=04bd48926970714b89729e7bb3f5e6dd&platform_code=H5'
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
        top:-0.96rem;
    }
   img{
        width: 100%;
    }

.listbox{
  ul{
    margin-bottom:0.30rem;
    h2{
      margin-left: 0.20rem;
    }
  }
  h2{
    font-size: 0.26rem;
    font-weight: normal;
  }
  li{
    box-sizing: border-box;
    position: relative;
    padding: 0.10rem 0.16rem;
  }
  .listcontent{
    h3{
      font-weight: normal;
    }
    position: absolute;
    bottom: 0.20rem;
    left:0.30rem;
    color: white;
  }
}
</style>
