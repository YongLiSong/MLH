<template>
    <div class="swiper-container colin">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  mounted () {
    new Swiper('.colin', {
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      },
      autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: true
      }
    })
  }
}
</script>
