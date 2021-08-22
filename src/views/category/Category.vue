<template>
  <div class="category">
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <slide-bar :slide-bar-list="categoryList" />
    <scroll class="scroll-height" :pull-up-load="true">
      <subcategory :category-list="subcategoryList" />
      <tab-control :titles="titleList" />
      <goods-list :goods="categoryDetailList" :goods-height="false" />
    </scroll>
  </div>
</template>

<script>
import SlideBar from "./children/SlideBar";
import NavBar from "components/common/navbar/NavBar";
import Subcategory from "./children/Subcategory";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

export default {
  name: "Category",
  data() {
    return {
      // 分类内容数据
      subcategoryList: [],
      categoryDetailList: [],
      // 分类侧边栏数据
      categoryList: [],
      titleList: ["流行", "新款", "精选"],
      currentIndex: 0,
    };
  },
  components: { GoodsList, TabControl, Scroll, Subcategory, NavBar, SlideBar },
};
</script>

<style scoped>
.category-nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}

.scroll-height {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 100px;
  overflow: hidden;
}
</style>
