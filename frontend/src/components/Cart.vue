<template>
  <div>
    <h3>Košík</h3>
    <ul>
      <li v-for="item in cart" :key="item.id">
        {{ getProductName(item.id) }}: {{ item.pcs }} ks
      </li>
    </ul>
    <button v-if="!readonly" v-on:click="orderItems()">Objednať</button>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    readonly: Boolean,
    products: Array,
    cart: Array,
  },
  data() {
    return {};
  },
  methods: {
    getProductName(id) {
      var name = "";
      this.products.forEach((product) => {
        if (product.id == id) {
          name = product.name;
        }
      });
      return name;
    },
    orderItems() {
      //check if not empty
      if (this.cart.length == 0) {
        alert("Cart is empty! Add products before ordering.");
        return;
      }

      this.$router.push({
        name: "Order",
        params: {
          cart: JSON.stringify(this.cart),
          products: JSON.stringify(this.products),
        },
      });
    },
  },
};
</script>

<style scoped>
</style>
