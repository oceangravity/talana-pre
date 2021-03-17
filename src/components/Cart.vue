<template>
  <div>
    <div v-for="item in GET_CART" :key="item.id" class="mt-6">
      <div class="flex">
        <img class="h-20 w-20 object-cover rounded" :src="item.photo" alt="" />
        <div>
          <div class="mx-3">
            <h3 class="text-sm text-gray-600">{{ item.name }}</h3>
            <div class="flex items-center mt-1">
              <button
                @mousedown="setQuantity('-', item)"
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
              <span class="text-gray-700 text-lg mx-2">{{ item.qty }}</span>
              <button
                @mousedown="setQuantity('+', item)"
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
          <div class="text-right text-gray-600">{{ price(item) }}</div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <form class="flex items-center justify-center">
        <input
          class="form-input w-48"
          type="text"
          placeholder="Código de Promoción"
        />
        <button
          class="ml-3 flex items-center px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
        >
          <span>Aplicar</span>
        </button>
      </form>
    </div>
    <a
      class="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
    >
      <span>Pagar</span>
      <svg
        class="h-5 w-5 mx-2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
      </svg>
    </a>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Cart",
  data() {
    return {
      isOpen: false,
      query: ""
    };
  },
  computed: {
    ...mapGetters(["GET_CART"])
  },
  methods: {
    ...mapActions(["SET_QTY_BY_PRODUCT"]),

    setQuantity(action, item) {
      let current = item.qty || 0;
      action === "+" ? (current += 1) : (current -= 1);
      if (current < 0) current = 0;
      this.SET_QTY_BY_PRODUCT({
        qty: current,
        id: item.id
      });
    },

    price(item) {
      const formatter = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP"
      });

      return formatter.format(item.price * item.qty);
    }
  }
};
</script>

<style scoped></style>
