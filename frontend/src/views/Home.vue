<template>
  <div class="home">
    <h1>Stránka produktov</h1>
    <ProductCard
      v-for="product in products"
      :key="product"
      v-bind:product="product"
    />
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

import { sendRequest } from "@/library/apiRequest";
import { ProductRequest } from "@/library/apiRequest";

export default {
  name: "Home",
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    //load products
    var res = await sendRequest(ProductRequest);
    this.products = res.products;
  },
};
</script>
