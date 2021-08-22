<template>
  <div class="cart-list">
    <scroll class="cart-list-content" :pull-up-load="true" ref="cartScroll">
      <div v-for="item in cartList" :key="item.id">
        <cart-list-item :item-info="item"></cart-list-item>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import CartListItem from "./CartListItem.vue";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
  },
  activated() {
    this.$refs.cartScroll.refresh();
  },
};
</script>

<style>
.cart-list {
  height: calc(100% - 44px - 49px);
}

.cart-list-content {
  width: 100%;
  height: 100%;
}
</style>