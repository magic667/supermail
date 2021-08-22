<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="navBarClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="detail-content"
      :probe-type="3"
      :pull-up-load="true"
      ref="scroll"
      @getPosition="contentScroll"
    >
      <detail-swiper :swiper-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-images-info
        :images-info="imagesInfo"
        @imgLoad="imgLoad"
      ></detail-images-info>
      <detail-param-info
        :param-info="paramInfo"
        ref="param"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods-list="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="detailGoBack()" v-show="isBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./child/DetailNavBar.vue";
import DetailSwiper from "./child/DetailSwiper.vue";
import DetailBaseInfo from "./child/DetailBaseInfo.vue";
import DetailShopInfo from "./child/DetailShopInfo.vue";
import DetailImagesInfo from "./child/DetailImagesInfo.vue";
import DetailParamInfo from "./child/DetailParamInfo.vue";
import DetailCommentInfo from "./child/DetailCommentInfo.vue";
import DetailBottomBar from "./child/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      imagesInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      titleTopY: [],
      currentIndex: 0,
      isBackTop: false,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    Goods,
    DetailBaseInfo,
    Shop,
    DetailShopInfo,
    Scroll,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  created() {
    this.iid = this.$route.params.iid;
    // 请求详情页数据
    getDetail(this.iid).then((res) => {
      // 获取轮播图数据
      this.topImages = res.data.result.itemInfo.topImages;
      // 获取 Goods 数据
      this.goods = new Goods(
        res.data.result.itemInfo,
        res.data.result.columns,
        res.data.result.shopInfo.services
      );
      // 获取 Shop 数据
      this.shop = new Shop(res.data.result.shopInfo);
      // 获取 imagesInfo 数据
      this.imagesInfo = res.data.result.detailInfo;
      // 获取 paramInfo 数据
      this.paramInfo = new GoodsParam(
        res.data.result.itemParams.info,
        res.data.result.itemParams.rule
      );
      // 获取 commentInfo 数据
      if (res.data.result.rate.cRate !== 0) {
        this.commentInfo = res.data.result.rate.list[0];
      }
    });
    // 请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.data.list;
    });
  },
  methods: {
    // 图片加载完执行
    imgLoad() {
      this.$refs.scroll.refresh();
      // 存储各个模块的 offsetTop
      this.titleTopY = [];
      this.titleTopY.push(0);
      this.titleTopY.push(this.$refs.param.$el.offsetTop);
      this.titleTopY.push(this.$refs.comment.$el.offsetTop);
      this.titleTopY.push(this.$refs.recommend.$el.offsetTop);
      this.titleTopY.push(Infinity);
    },
    // 点击标题，滚动到相应内容
    navBarClick(index) {
      this.$refs.scroll.scrollTo(0, -this.titleTopY[index], 0);
    },
    contentScroll(position) {
      // 详情页滚动到的内容与标题一致
      for (let i = 0; i < this.titleTopY.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          -position.y >= this.titleTopY[i] &&
          -position.y < this.titleTopY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 判断是否显示 backTop
      this.isBackTop = -position.y > 200;
    },
    // 返回顶部
    detailGoBack() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 添加到购物车
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 将商品添加到购物车中
      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.showing(res, 2000);
      });
    },
  },
};
</script>

<style scoped>
.detail-content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
}

#detail {
  position: relative;
  height: 100vh;
  z-index: 20;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  background-color: #fff;
}
</style>