<template>
  <div class="fin">
    <h1>Poďakovanie</h1>
    <h3>Ďakujeme za objednávku</h3>
    <br />
    <router-link :to="{ name: 'Home' }"> Späť na hlavnú stránku </router-link>
    <br />
    <br />
    <a v-bind:href="advert.href">
      <img v-bind:src="image" height="400" />
    </a>
    <p>Počítadlo: {{ advert.counter }}</p>
  </div>
</template>

<script>
import { sendRequest } from "@/library/apiRequest";
import { AdvertRequest } from "@/library/apiRequest";
import { AdvertImageRequest } from "@/library/apiRequest";

export default {
  name: "Fin",
  props: {},
  components: {},
  data() {
    return {
      advert: {
        href: "",
        counter: 0,
      },
      image: "",
    };
  },
  async mounted() {
    //get advert
    this.advert = await sendRequest(AdvertRequest);

    //get image
    var res = await sendRequest(AdvertImageRequest);
    var img = await res.blob();
    this.image = URL.createObjectURL(img);
  },
  methods: {},
};
</script>
<style scoped>
</style>