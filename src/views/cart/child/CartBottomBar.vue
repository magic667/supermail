<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkingAll()"
      ></check-button>
      <span>全选</span>
    </div>
    <span class="total">合计：{{ totalPrice }}</span>
    <span class="caculate" @click="calcClick()">结算({{ totalLength }})</span>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: { CheckButton },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => item.checked)
          .reduce((prev, curr) => {
            return prev + curr.price * curr.count;
          }, 0)
          .toFixed(2)
      );
    },
    totalLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) {
        return false;
      }
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkingAll() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.showing("请选择要购买的商品", 2000);
      } else {
        this.$toast.showing("付款中......");
      }
    },
  },
};
</script>

<style>
.cart-bottom-bar {
  display: flex;
  position: relative;
  bottom: 40px;
  height: 40px;
  background-color: #eee;
  justify-content: space-between;
}

.check-content {
  display: flex;
  align-items: center;
}

.check-button {
  margin: 0 10px;
}

.total,
.caculate {
  line-height: 40px;
  text-align: center;
}

.caculate {
  width: 100px;
  background-color: #ff8198;
  color: #fff;
}
</style>