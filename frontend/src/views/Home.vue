<template>
  <div class="home">
    <h1>Stránka produktov</h1>
    <div class="grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        v-bind:product="product"
      />
    </div>
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