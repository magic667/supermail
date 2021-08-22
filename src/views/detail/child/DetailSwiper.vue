<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in swiperImages" :key="item.id">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  name: "DetailSwiper",
  props: {
    swiperImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style>
.detail-swiper {
  height: 300px;
}
</style>