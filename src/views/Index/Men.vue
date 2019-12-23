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
      position: absolute;
        top: 0;
        width: 100%;
<<<<<<< HEAD

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
=======
        top:-0.96rem;
>>>>>>> 69bc85e7dab323d14aa69c10dac3480caaec1aaf
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
<<<<<<< HEAD
    margin-bottom:0.3rem;
    h2{
      margin-left: 0.2rem;
    }
  }
  h2{
    font-size:0.26rem;
=======
    margin-bottom:0.30rem;
    h2{
      margin-left: 0.20rem;
    }
  }
  h2{
    font-size: 0.26rem;
>>>>>>> 69bc85e7dab323d14aa69c10dac3480caaec1aaf
    font-weight: normal;
  }
  li{
    box-sizing: border-box;
    position: relative;
<<<<<<< HEAD
    padding: 0.1rem 0.16rem;
=======
    padding: 0.10rem 0.16rem;
>>>>>>> 69bc85e7dab323d14aa69c10dac3480caaec1aaf
  }
  .listcontent{
    h3{
      font-weight: normal;
      font-size: 0.18rem;
    }
    position: absolute;
<<<<<<< HEAD
    bottom: 0.2rem;
    left:0.3rem;
=======
    bottom: 0.20rem;
    left:0.30rem;
>>>>>>> 69bc85e7dab323d14aa69c10dac3480caaec1aaf
    color: white;
    p{
      font-size: 0.18rem;
    }
  }
}

</style>
