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
    <div class="newday" v-if="newday.length">
      <ul v-for="(newdata,index) in newday" :key="index" >
        <h3>{{newdata.main_title}}<span>{{newdata.sub_title}}</span></h3>
        <li v-for="(newlistdata,aaaa) in newdata.products" :key="aaaa">
          <img :src="newlistdata.picUrl">
          <span>{{newlistdata.tag}}</span>
        </li>
      </ul>
    </div>
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
      list: [],
      newday: []
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
    Axios({
      url: 'http://www.meihigo.hk/appapi/ninenew/operational/v1?credential='
    }).then(res => {
      this.newday = res.data.show2
      console.log(this.newday)
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
