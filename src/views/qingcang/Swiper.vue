<template>

       <div class="swiper-container">
          <div class="swiper-wrapper">
            <slot></slot>

          </div>
       <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>

</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  mounted () {
    new Swiper('.swiper-container', {
      // slidesPerView: 3,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        color: 'black'
      }

    })
  }
}
</script>
<style lang="scss" scoped>

   .swiper-pagination-bullet{
     border-radius: 0%;
     border-top-left-radius:0%;
     background: red;
   }

</style>
