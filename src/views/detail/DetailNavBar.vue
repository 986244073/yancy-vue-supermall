<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="@/assets/img/common/back.svg" alt="back">
            </div>
            <div slot="center" class="title">
                <div v-for="(title,index) in titles" :key="title.id" class="title-item" :class="{active:index===currentIndex}" @click="clickItem(index)">
                    {{title}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from "../../components/common/bavbar/NavBar";

    export default {
        name: "DetailNavBar",
        components: {
            NavBar
        },
        data() {
            return {
                titles: ['商品', '参数', '评论', '推荐'],
                currentIndex:0
            }
        },
        methods: {
            clickItem(index) {
                this.currentIndex=index
            },
            backClick(){
                this.$router.go(-1)
            }
        },
    }
</script>

<style scoped>
    .title {
    display: flex;
    }
    .title-item{
        flex:1
    }
    .active{
        color: var(--color-high-text);
    }
    .back img{
        margin-top: 10px;
    }
</style>
