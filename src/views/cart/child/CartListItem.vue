<template>
  <div class="shop-item">
    <div class="item-selector">
      <check-button
        :is-checked="itemInfo.checked"
        @click.native="checking()"
      ></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ itemInfo.price }}</div>
        <div class="item-count right">x{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";

export default {
  name: "CartListItem",
  components: { CheckButton },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checking() {
      this.itemInfo.checked = !this.itemInfo.checked;
    },
  },
};
</script>

<style>
.shop-item {
  display: flex;
  width: 100%;
  padding: 5px;
  font-size: 0;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  display: flex;
  width: 20px;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
}

.item-img img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
}

.item-info {
  position: relative;
  overflow: hidden;
  padding: 5px 10px;
  font-size: 17px;
  color: #333;
}

.item-info .item-desc {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.info-bottom {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  margin-top: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>