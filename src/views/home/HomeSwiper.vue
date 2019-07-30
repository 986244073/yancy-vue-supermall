<template>
    <div>
        <swiper :options="swiperOption" class="home-swiper">
            <swiper-slide v-for="banner in banners" :key="banner.id" class="swiper-slide">
                <a :href="banner.link">
                    <img :src="banner.image" alt="">
                </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: "HomeSwiper",
        props: {
            banners: Array
        },
        components: {
            swiper, swiperSlide
        },
        data() {
            return {
                swiperOption: {
                    //开启循环模式
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination'
                    },

                    mousewheel: true,
                    //自动轮播
                    autoplay: {
                        delay: 400
                    },

                }
            }
        },
    }
</script>

<style scoped>
    .swiper-slide img {
        max-width: 100%;
        height: auto;
    }
</style>
