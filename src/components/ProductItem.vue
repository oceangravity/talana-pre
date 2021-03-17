<template>
  <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
    <div
      class="flex items-end justify-end h-56 w-full bg-cover"
      :style="{ 'background-image': `url('${product.photo}')` }"
    >
      <button
        @mousedown="product.qty > 0 && ADD_TO_CART(product)"
        :class="{
          'opacity-40': product.qty === 0 || product.qty === undefined
        }"
        class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      </button>
    </div>
    <div class="px-5 py-3">
      <h3 class="text-gray-700 uppercase">{{ product.name }}</h3>
      <div class="flex justify-between">
        <span class="text-gray-500 mt-2">{{ price }}</span>
        <div class="flex items-center mt-1">
          <button
            @mousedown="setQuantity('-', product.id)"
            class="text-gray-500 focus:outline-none focus:text-gray-600"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </button>
          <span class="text-gray-700 text-lg mx-2">{{ quantity }}</span>
          <button
            @mousedown="setQuantity('+', product.id)"
            class="text-gray-500 focus:outline-none focus:text-gray-600"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ProductItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    price() {
      const formatter = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP"
      });

      return formatter.format(this.product.price);
    },
    quantity() {
      return this.product.qty ? this.product.qty : 0;
    }
  },
  methods: {
    ...mapActions(["SET_QTY_BY_PRODUCT", "ADD_TO_CART"]),
    setQuantity(action, id) {
      let current = this.product.qty || 0;
      action === "+" ? (current += 1) : (current -= 1);
      if (current < 0) current = 0;
      this.SET_QTY_BY_PRODUCT({
        qty: current,
        id: id
      });
    }
  }
};
</script>

<style scoped></style>
