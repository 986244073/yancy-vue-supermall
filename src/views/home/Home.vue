<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">主页</div>
        </nav-bar>
        <Scorll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <!-- Swiper-->
            <home-swiper :banners="banners"></home-swiper>
            <!--        recommend-->
            <home-recommend-view :recommends="recommends"></home-recommend-view>
            <!--        feature-->
            <feature-view/>

            <!--        tab-->
            <tab-control :titles="['新款','流行','精品']" ref="tabControl" class="tab-control" @tabClick="tabClick">
            </tab-control>
            <goods-list :goods="goods[currentType].list"/>
        </Scorll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    import HomeRecommendView from "./HomeRecommendView";
    import FeatureView from "./FeatureView";
    import NavBar from "../../components/common/bavbar/NavBar";
    import {getHomeMultidata, getHomeGoods} from "../../network/home";
    import HomeSwiper from "./HomeSwiper";
    import TabControl from "../../components/content/tabControl/TabControl";
    import GoodsList from "../../components/content/goods/GoodsList";
    import Scorll from "../../components/common/scroll/Scorll";
    import BackTop from "../../components/content/backTop/BackTop";
    import {debounce} from "../../common/utils.js";

    export default {
        name: "Home",
        components: {
            GoodsList,
            NavBar, HomeSwiper, HomeRecommendView, FeatureView, TabControl, Scorll, BackTop
        }, created() {
            //请求数据
            this.getHomeMultidata();
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');

            this.tabOffsetTop = this.$refs.tabControl
        }, mounted() {
            // 1.图片加载完成的事件监听
            const refresh = debounce(this.$refs.scroll.refresh, 50)
            this.$bus.$on('itemImageLoad', () => {
                refresh()
            })
        },
        activated() {
            this.$refs.scroll.scrollTo(0, this.saveY, 0)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            this.saveY = this.$refs.scroll.getScrollY
        },
        methods: {
            backClick() {
                this.$refs.scroll.scroll.scrollTo(0, 0, 500)
            },
            contentScroll(position) {
                this.isShowBackTop = (-position.y) > 1000
            },
            loadMore() {
                this.getHomeGoods(this.currentType)
            },

            tabClick(index) {
                console.log(index);
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
            },
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    // this.result = res;
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1
                    this.$refs.scroll.finishPullUp()
                }, error => {
                    console.log(error);
                })
            }
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentType: 'pop',
                isShowBackTop: false,
                tabOffsetTop: 0,
                saveY: 0
            }
        },
    }
</script>

<style scoped>
    #home {
        /*padding-top: 44px;*/
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: white;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }

    .tab-control {
        position: sticky;
        top: 44px;
        z-index: 9;
    }

    .content {
        overflow: hidden;

        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>
