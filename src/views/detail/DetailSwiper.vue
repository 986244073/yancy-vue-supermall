<template>
    <div>
        <swiper class="detail-swiper">
            <swiper-slide class="detail-swiper-item" v-for="item in topImages" :key="item.id">
                <img :src="item">
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: "DetailSwiper",
        props: {
            topImages: Array
        },
        components: {
            swiperSlide, swiper
        }
    }
</script>

<style scoped>
    .detail-swiper {
        height: 400px;
        overflow: hidden;
    }

    .detail-swiper-item img{
        max-width: 100%;
        height: auto;
    }
</style>
