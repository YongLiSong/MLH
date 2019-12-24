<template>
  <div>
    <swiper v-if="bannerlist.length" class="bannerbox">
     <div class="swiper-slide" v-for="data in bannerlist" :key="data.di" >
         <img :src="data.main_image">
         <div class="bannercontent">
           <h2>{{data.main_title}}</h2>
           <span class="sub_title">{{data.sub_title}}</span>
           <span class="description">{{data.description}}</span>
         </div>
     </div>
    </swiper>
    <div class="newday" v-if="newday.length">
      <!-- 每日新栏 -->
      <ul v-for="(newdata,index) in newday" :key="index" @click="gonewgoods()">
        <h3>{{newdata.main_title}}<span>{{newdata.sub_title}}</span></h3>
        <li v-for="(newlistdata,aaaa) in newdata.products" :key="aaaa" >
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
      // console.log(this.newday)
    })
  },
  methods: {
    gonewgoods () {
      this.$router.push('/newgoods')
    },
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
  position: relative;
  ul{
    margin-bottom:0.3rem;
    h2{
      margin-left: 0.2rem;
    }
  }
  h2{
    font-size:0.2rem;
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
.newday{
  width: 100%;
  height: 1.8rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  padding-left: 0.1rem;
  ul{
    padding: 0.1rem;
    box-sizing: border-box;
    float: left;
    height: 1.5rem;
    position: relative;
    &:after{
        content: "";
        display: block;
        height: 1.6rem;
        width: 1.7rem;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba($color: #000000, $alpha: 0.03)
      }
    h3{
      font-weight:500;
      font-size: 0.15rem;
    }
    h3>span{
      margin-left: 0.1rem;
      font-size:0.13rem;
      color:#777;
    }
    li{
      background-color: rgba($color: #000000, $alpha: 0.03);
      margin-right: 0.15rem;
      float: left;
      width: 40%;
      position: relative;

      img{
        width: 100%;
        float: left;
      }
      span{
        font-size: 0.1rem;
        text-align: center;
        width: 100%;
        position: relative;
        left: 0.06rem;
        border: 1px solid #000;
      }
    }
  }
}
</style>
