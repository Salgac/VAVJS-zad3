<template>
  <div class="product">
    <p>{{ product }}</p>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {},
  },
};
</script>

<style scoped>
</style>
