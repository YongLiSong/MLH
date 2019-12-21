<template>
    <div v-if="titleList.length">
        <ul v-for="(data,index) in titleList" :key="index">
            <h3>{{data.name}}</h3>
            <li v-for="goodsdata in titleList[index].events" :key="goodsdata.eventId">
                <img :src="goodsdata.imageUrl" alt="">
            </li>
        </ul>
    </div>
</template>
<script>
import { Axios } from 'axios'
export default {
  data () {
    return {
      titleList: []
    }
  },
  mounted () {
    Axios({
      url: 'http://www.mei.com/appapi/home/eventForH5?params=%7B%7D&timestamp=1576909327490&summary=1cc384aff188e5b0ec89cfc3c03947db&platform_code=H5'
    }).then(res => {
      console.log(res.data.lists)
      this.titleList = res.data.lists
    })
  }
}
</script>
