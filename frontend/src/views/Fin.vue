<template>
  <div class="fin">
    <h1>Poďakovanie</h1>
    <h3>Ďakujeme za objednávku</h3>
    <br />
    <router-link :to="{ name: 'Home' }"> Späť na hlavnú stránku </router-link>
    <br />
    <br />
    <Advert />
  </div>
</template>

<script>
import Advert from "@/components/Advert.vue";

export default {
  name: "Fin",
  props: {},
  components: {
    Advert,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
</style>