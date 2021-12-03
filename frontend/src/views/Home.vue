<template>
  <div class="home">
    <h1>Stránka produktov</h1>
    <div class="grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        v-bind:product="product"
        @addedToCart="addToCart($event)"
      />
    </div>

    <Cart
      v-bind:cart="cart"
      v-bind:products="products"
      v-bind:readonly="false"
    />
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import Cart from "@/components/Cart.vue";

import { sendRequest } from "@/library/apiRequest";
import { ProductRequest } from "@/library/apiRequest";

export default {
  name: "Home",
  components: {
    ProductCard,
    Cart,
  },
  data() {
    return {
      products: [],
      cart: [],
    };
  },
  async mounted() {
    //load products
    var res = await sendRequest(ProductRequest);
    this.products = res.products;
  },
  methods: {
    addToCart(object) {
      var updated = false;
      this.cart.forEach((item) => {
        if (item.id == object.id) {
          item.pcs += object.pcs;
          updated = true;
        }
      });
      if (!updated) this.cart.push(object);
    },
  },
};
</script>
<style scoped>
.grid {
  padding-left: 20px;
  padding-right: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 20px;
  align-items: stretch;
}
</style>