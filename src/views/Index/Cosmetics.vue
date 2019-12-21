<template>
    <div>
        <swiper v-if="bannerslist.length">
            <div class="swiper-slide" :key="banner.id" v-for="banner in bannerslist">
                <img :src="banner.main_image" :alt="banner.main_title">
            </div>
        </swiper>
    </div>
</template>
