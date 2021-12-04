<template>
  <div class="order">
    <h1>Stránka objednávky</h1>
    <Cart
      v-bind:cart="JSON.parse(cart)"
      v-bind:products="JSON.parse(products)"
      v-bind:readonly="true"
    />
    <div class="form">
      <h3>Formulár</h3>
      <input type="email" v-model="customer.email" placeholder="Email" /> <br />
      <input type="text" v-model="customer.name" placeholder="Meno" /> <br />
      <input type="text" v-model="customer.address" placeholder="Ulica" />
      <br />
      <input
        type="number"
        v-model="houseNumber"
        placeholder="Popisné číslo"
        min="1"
      />
      <br />
      <input type="text" v-model="customer.city" placeholder="Mesto" /> <br />
      <input
        type="number"
        v-model="customer.postcode"
        placeholder="Psč"
        min="1"
      />
      <br />
      <button v-on:click="sendOrder()">Odoslať objednávku</button>
    </div>
  </div>
</template>

<script>
import Cart from "@/components/Cart.vue";

import { sendRequestWithData } from "@/library/apiRequest";
import { OrderRequest } from "@/library/apiRequest";

export default {
  name: "Order",
  props: {
    cart: String,
    products: String,
  },
  components: {
    Cart,
  },
  data() {
    return {
      customer: {
        email: "",
        name: "",
        address: "",
        city: "",
        postcode: "",
      },
      houseNumber: "",
    };
  },
  methods: {
    async sendOrder() {
      //check form data
      if (
        this.customer.email == "" ||
        this.customer.name == "" ||
        this.customer.adress == "" ||
        this.customer.city == "" ||
        this.customer.postcode == ""
      ) {
        alert("Form fields must not be empty.");
        return;
      }

      //prepare data
      this.customer.address += " " + this.houseNumber;
      var json = {
        customer: JSON.parse(JSON.stringify(this.customer)),
        products: JSON.parse(this.cart),
      };

      //post data
      await sendRequestWithData(OrderRequest, json);

      //redirect
      this.$router.push({
        name: "Fin",
      });
    },
  },
};
</script>
<style scoped>
</style>