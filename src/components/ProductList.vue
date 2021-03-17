<template>
  <main class="my-8">
    <div class="container mx-auto px-6">
      <h3 class="text-gray-700 text-2xl font-medium">
        {{ currentCategory.name }}
      </h3>
      <span class="mt-3 text-sm text-gray-500">
        {{ query.length ? results.length : GET_PRODUCTS_BY_CATEGORY.length }}
        Productos
      </span>
      <div
        class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"
      >
        <template v-for="product in results">
          <ProductItem
            v-if="results.length"
            :product="product"
            :key="product.id"
          ></ProductItem>
        </template>
        <template v-for="product in GET_PRODUCTS_BY_CATEGORY">
          <ProductItem
            v-if="results.length === 0 && query.length === 0"
            :product="product"
            :key="product.id"
          ></ProductItem>
        </template>
      </div>
      <div class="flex justify-center">
        <div class="flex rounded-md mt-8">
          <a
            href="#"
            class="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white"
            ><span>Previous</span></a
          >
          <a
            href="#"
            class="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
            ><span>1</span></a
          >
          <a
            href="#"
            class="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
            ><span>2</span></a
          >
          <a
            href="#"
            class="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
            ><span>3</span></a
          >
          <a
            href="#"
            class="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white"
            ><span>Next</span></a
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ProductItem from "./ProductItem";
import { mapGetters, mapState } from "vuex";
export default {
  name: "ProductList",
  components: { ProductItem },
  computed: {
    ...mapState(["currentCategory", "results", "query"]),
    ...mapGetters(["GET_PRODUCTS_BY_CATEGORY"])
  }
};
</script>

<style scoped></style>
