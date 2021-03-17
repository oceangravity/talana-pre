<template>
  <div class="bg-white">
    <Header></Header>

    <ProductList></ProductList>

    <Footer></Footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
export default {
  components: { ProductList, Footer, Header },
  async mounted() {
    await this.GET_CATEGORIES();
    await this.GET_PRODUCTS();
  },
  methods: {
    ...mapActions(["GET_PRODUCTS", "GET_CATEGORIES"])
  }
};
</script>
