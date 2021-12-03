<template>
  <div class="product">
    <img v-bind:src="image" height="300" />
    <p>{{ name }}</p>
    <p>{{ price }}€</p>

    <button v-on:click="orderItem()">Objednať</button>
    <button v-on:click="addToBasket()">Do košíka</button>
  </div>
</template>

<script>
import { sendRequest } from "@/library/apiRequest";
import { ProductImageRequest } from "@/library/apiRequest";

export default {
  name: "ProductCard",
  props: {
    product: {},
  },
  data() {
    return {
      id: 0,
      name: "",
      image: "",
      price: 0.0,
    };
  },
  async mounted() {
    //parse product
    this.id = this.product.id;
    this.name = this.product.name;
    this.price = this.product.price;

    //get image
    var res = await sendRequest(ProductImageRequest, this.id);
    var img = await res.blob();
    this.image = URL.createObjectURL(img);
  },
  methods: {
    orderItem() {
      console.log("Order " + this.id);
    },
    addToBasket() {
      console.log("Basket " + this.id);
    },
  },
};
</script>

<style scoped>
.product {
  border: solid black 1px;
  width: 400px;
  height: 450px;
}

button {
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
  margin: 10px;
}
</style>
