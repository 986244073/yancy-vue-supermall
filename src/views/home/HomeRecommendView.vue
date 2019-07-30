<template>
    <div class="recommend">
        <div v-for="recommend in recommends" :key="recommend.id" class="recommend-item">
            <a :href="recommend.link">
                <img :src="recommend.image" alt="">
                <div>{{recommend.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeRecommendView",
        props: {
            recommends: Array
        }
    }
</script>

<style scoped>
    .recommend {
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;
        padding: 15px 0 30px;
        border-bottom: 8px solid #eee;
    }

    .recommend-item {
        flex: 1
    }

    .recommend-item img {
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
    }
</style>
