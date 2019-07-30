<template>
    <div id="detail">
        <!--        导航-->
        <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <Scorll class="content" ref="scorll">
            <!--        swiper-->
            <detail-swiper :top-images="topImages"></detail-swiper>
            <!--        基本信息-->
            <detail-base-info :goods="goods"/>

            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo" @imageLoade="imageLoad"/>
            <detail-param-info :paramInfo="paramsInfo"/>
        </Scorll>
    </div>
</template>

<script>
    import DetailNavBar from "./DetailNavBar";
    import {getDetail, Goods, GoodsParam, Shop} from "../../network/detail";
    import DetailSwiper from "./DetailSwiper";
    import DetailBaseInfo from "./DetailBaseInfo";
    import DetailShopInfo from "./DetailShopInfo";
    import Scorll from "../../components/common/scroll/Scorll";
    import DetailGoodsInfo from "./DetailGoodsInfo";
    import DetailParamInfo from "./DetailParamInfo";

    export default {
        name: "Detail",
        data() {
            return {
                iid: '',
                res: '',
                topImages: null,
                goods: {},
                shop: {},
                detailInfo: {},
                paramsInfo: {}

            }
        },
        created() {
            // 传入iid
            this.iid = this.$route.params.iid
            //    根据iid请求数据
            getDetail(this.iid).then(res => {
                console.log(res);
                //   轮播数据
                const data = res.result;
                this.topImages = res.result.itemInfo.topImages;

                //    获取商品信息

                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                // 3.创建店铺信息的对象

                this.shop = new Shop(data.shopInfo)

                this.detailInfo = data.detailInfo
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            })


        },
        methods: {
            imageLoad() {
                this.$refs.scorll.refresh()
            }
        },
        components: {
            Scorll,
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo

        }
    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .content {
        height: calc(100% - 44px);
    }
</style>
