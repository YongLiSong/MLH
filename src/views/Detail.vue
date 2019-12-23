<template>
    <div>
        详情页
    </div>
</template>

<script>
import Axios from 'axios'
export default {
  mounted () {
    Axios({
      url: 'http://www.mei.com/appapi/product/detail/v3?categoryId=2120005100000003429&productId=2041204199000618409&platform_code=H5&timestamp=1577067298102&summary=b558c216920bbc762468d976457e41f3'
    }).then(res => {
      console.log(res.data.infos)
    })
  }
}
</script>
