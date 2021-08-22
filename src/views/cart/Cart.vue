<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <template #center>
        <div>购物车({{ cartLength }})</div>
      </template>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import CartList from "./child/CartList.vue";
import CartBottomBar from "./child/CartBottomBar.vue";

import NavBar from "components/common/navbar/NavBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
  },
};
</script>

<style>
#cart {
  height: 100vh;
}

.cart-nav {
  position: relative;
  top: 0;
  left: 0;
  z-index: 20;
  background-color: #ff8198;
  color: #fff;
}
</style>