<template>

    <div>
    <div class="bannerbox">
      <div class="swiper-slide">
        <img src="https://img.alicdn.com/tfs/TB1WQ91o4z1gK0jSZSgXXavwpXa-750-900.jpg" @click="handeclick(data.di)" />
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
      list: []
    }
  },
  mounted () {
    Axios({
      url: 'http://www.meihigo.hk/appapi/silo/eventForH5?categoryId=women&pageIndex=1&timestamp=1576997710438&summary=0ca8d473177520a42ea581d9d7f2fde6&platform_code=H5'
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
