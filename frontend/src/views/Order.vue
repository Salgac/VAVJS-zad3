<template>
  <div class="order">
    <h1>Stránka objednávky</h1>
    <p>{{ products }}</p>
    <div class="form">
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
import { sendRequestWithData } from "@/library/apiRequest";
import { OrderRequest } from "@/library/apiRequest";

export default {
  name: "Order",
  props: {
    products: String,
  },
  components: {},
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
      //prepare data
      this.customer.address += " " + this.houseNumber;
      var json = {
        customer: JSON.parse(JSON.stringify(this.customer)),
        products: JSON.parse(this.products),
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