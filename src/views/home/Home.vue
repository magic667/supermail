<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"
      ><template #center><div>购物街</div></template>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabControlClick="homeTabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @getPosition="homeScroll"
      :pull-up-load="true"
      @pullUp="homeLoadMore"
    >
      <swiper>
        <swiper-item v-for="item in banner" :key="item.id">
          <a :href="item.link">
            <img :src="item.image" @load="swiperLoad" />
          </a>
        </swiper-item>
      </swiper>
      <recommend-view :recommend-view="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabControlClick="homeTabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods-list="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="homeGoBack()" v-show="isBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
import Scroll from "components/common/scroll/Scroll.vue";

import RecommendView from "./child/RecommendView.vue";
import FeatureView from "./child/FeatureView.vue";

import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home.js";

export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  components: {
    NavBar,
    Swiper,
    SwiperItem,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 请求数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated() {
    // 刷新数据，防止直接返回顶部
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 保存历史页面位置
    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    // 事件监听
    homeScroll(position) {
      // 判断是否显示 backTop
      this.isBackTop = -position.y > 1000;
      // 判断 tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    homeLoadMore() {
      this.getHomeGoods(this.currentType);
    },
    // 监听swiper的图片是否加载完成
    swiperLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 回到顶部
    homeGoBack() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 切换商品数据
    homeTabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // tabControl 吸顶前后选项保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 网络请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //函数执行完res回收，res指向的对象箭头断开， result指向的对象不会被回收
        this.banner = res.data.data.banner.list;
        this.recommend = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        // 继续上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
}

#home {
  position: relative;
  height: 100vh;
}

.home-nav {
  position: relative;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: var(--color-tint);
  color: #fff;
}

.tab-control {
  position: relative;
  top: 0;
  left: 0;
  z-index: 10;
}
</style>