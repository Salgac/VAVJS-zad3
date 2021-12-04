<template>
  <div class="home">
    <h1>Admin rozhranie</h1>
    <h3>Tabulka objednávok</h3>
    <div class="table">
      <table>
        <tr>
          <th>Zákazník</th>
          <th>Produkty</th>
          <th>Stav</th>
          <th>Zaplatené</th>
        </tr>
        <tr v-for="order in orders" :key="order.state">
          <td>
            <pre>{{ formatCustomer(order.customer) }}</pre>
          </td>
          <td>
            <pre>{{ formatProducts(order.products) }}</pre>
          </td>
          <td>{{ order.state }}</td>
          <td>
            <button :disabled="order.state == 'Paid'" @click="markPaid(order)">
              Zaplatiť
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div class="advert">
      <h3>Zmena reklamy</h3>
      <Advert :key="advertKey" />
      <div class="linkChange>">
        <input type="text" v-model="advertLink" />
        <button @click="changeLink">Zmeniť link</button>
        <br />
        <input type="file" @change="onFilePicked" accept="'.jpg'" />
        <button @click="changeFile">Zmeniť obrázok</button>
      </div>
    </div>
  </div>
</template>

<script>
import Advert from "@/components/Advert.vue";

import { sendRequest } from "@/library/apiRequest";
import { sendRequestWithData } from "@/library/apiRequest";
import { OrderRequest } from "@/library/apiRequest";
import { ProductRequest } from "@/library/apiRequest";
import { CustomerRequest } from "@/library/apiRequest";
import { OrderStateRequest } from "@/library/apiRequest";
import { AdvertRequest } from "@/library/apiRequest";
import { AdvertImageRequest } from "@/library/apiRequest";

export default {
  name: "Admin",
  components: { Advert },
  data() {
    return {
      orders: [],
      products: [],
      customers: [],
      advertLink: "",
      advertFile: "",

      advertKey: 0,
    };
  },
  async mounted() {
    //load orders
    var res = await sendRequest(OrderRequest);
    this.orders = res.orders;

    //load products
    res = await sendRequest(ProductRequest);
    this.products = res.products;

    //load customers
    res = await sendRequest(CustomerRequest);
    this.customers = res.customers;
  },
  methods: {
    formatCustomer(customerId) {
      var str = "";
      this.customers.forEach((customer) => {
        if (customer.id == customerId) {
          str =
            customer.name +
            "\n" +
            customer.email +
            "\n" +
            customer.address +
            "\n" +
            customer.postcode +
            "\n" +
            customer.city;
        }
      });
      return str;
    },
    formatProducts(items) {
      var str = "";
      items.forEach((item) => {
        var name;
        this.products.forEach((product) => {
          if (product.id == item.id) name = product.name;
        });
        str += name + ": " + item.pcs + " ks\n";
      });
      return str;
    },
    async markPaid(order) {
      await sendRequestWithData(OrderStateRequest, { state: "Paid" }, order.id);
      order.state = "Paid";
    },
    onFilePicked(event) {
      this.advertFile = event?.target.files[0];
    },
    async changeLink() {
      if (this.advertLink == "") {
        alert("Insert a link before sending.");
        return;
      }
      await sendRequestWithData(AdvertRequest, { href: this.advertLink });
      this.advertKey++;
    },
    async changeFile() {
      if (this.advertFile == "") {
        alert("Pick a .jpg file before sending.");
        return;
      }
      await sendRequestWithData(AdvertImageRequest, this.advertFile);
      this.advertKey++;
    },
  },
};
</script>
<style scoped>
.table {
  display: flex;
  justify-content: center;
}
</style>