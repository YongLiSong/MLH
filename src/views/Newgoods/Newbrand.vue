<template>
    <div>
        <ul v-for="data in newbrandlist" :key="data.eventId">
            <h3>{{data.englishName}}</h3>
            <li v-for="data2 in data.products" :key="data2.productId">
                <img :src="data2.imageUrl" alt="">
            </li>
        </ul>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
  data () {
    return {
      newbrandlist: []
    }
  },
  mounted () {
    Axios({
      url: 'https://www.mei.com/appapi/ninenew/newBrandEvent/v1?pageIndex=1&credential'
    }).then(res => {
      this.newbrandlist = res.data.eventList.splice(0, 3)
      console.log(this.newbrandlist)
      this.list2 = res.data.eventList
    })
  }
}
</script>
