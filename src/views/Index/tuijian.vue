<template>
  <div>
    <swiper v-if="bannerlist.length" class="bannerbox">
     <div class="swiper-slide" v-for="data in bannerlist" :key="data.di" >
         <img :src="data.main_image" @click="handeclick(data.di)">
         <div class="bannercontent">
           <h2>{{data.main_title}}</h2>
           <span>{{data.sub_title}}</span>
           <span>{{data.description}}</span>
         </div>
     </div>
    </swiper>
    <div v-if="list.length" class="listbox">
       <ul v-for='data in list' :key="data.name">
        <h2>{{data.name}}</h2>
        <li v-for="data2 in data.events" :key="data2.eventId" @click="golist(data2.eventId)">
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
</template>
<script>
import Axios from 'axios'
import swiper from '@/components/Swiper'

export default {
  data () {
    return {
      bannerlist: [],
      list: []
    }
  },
  mounted () {
    Axios({
      url: `http://www.meihigo.hk/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5`
    }).then(res => {
      this.bannerlist = res.data.banners
    })
    Axios({
      url: 'http://www.meihigo.hk/appapi/home/eventForH5?params=%7B%7D&timestamp=1576985820987&summary=fc07b5d4d9c9c1d1131594ebc6906c57&platform_code=H5'
    }).then(res => {
      this.list = res.data.lists
    })
  },
  methods: {
    golist (id) {
      // console.log(this.$router)
      this.$router.push(`/List/${id}`)
    }
  },
  components: {
    swiper
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
      font-size: 0.3rem;
    }
    height: 0.1rem;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    text-align: center;
    color: #fff;
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translate(-50%);
    span{
          font-size: 0.7rem;
    }
    span:nth-of-type(2){
          font-size: 0.37rem;
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
            font-size: 0.37rem;
    }
    position: absolute;
    bottom: 0.2rem;
    left:0.3rem;
    color: white;
    p{
      font-size: 0.37rem;
    }
  }
}

</style>
