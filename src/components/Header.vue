<template>
  <div>
    <header>
      <div class="container mx-auto px-6 pb-3 pt-6">
        <div class="flex items-center justify-between">
          <div class="hidden w-full text-gray-600 md:flex md:items-center">
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z"
                fill="currentColor"
              />
            </svg>
            <span class="mx-1 text-sm">CL</span>
          </div>
          <div class="w-full flex justify-center align-center">
            <img alt="Vue logo" src="../assets/logo.png" />
          </div>
          <div class="flex items-center justify-end w-full">
            <button
              @click="cartOpen = !cartOpen"
              class="text-gray-600 focus:outline-none mx-4 sm:mx-0 relative"
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
              <span class="rounded-full w-6 -mt-4 -mr-3 absolute top-0 right-0 text-xs text-bold p-1 bg-blue-600 text-white">
                {{ GET_CART_COUNTER }}
              </span>
            </button>

            <div class="flex sm:hidden">
              <button
                @click="isOpen = !isOpen"
                type="button"
                class="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                  <path
                    fill-rule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <nav
          :class="isOpen ? '' : 'hidden'"
          class="sm:flex sm:justify-center sm:items-center mt-4"
        >
          <div class="flex flex-col sm:flex-row">
            <span
              v-for="item in categories"
              class="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0 cursor-pointer"
              :key="item.id"
              @mousedown="setCategory(item)"
              >{{ item.name }}
            </span>
          </div>
        </nav>
        <div class="relative mt-6 max-w-lg mx-auto">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <input
            class="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
            type="text"
            v-model="query"
            placeholder="Buscar"
            @keyup="search"
          />
        </div>
      </div>
    </header>

    <div
      :class="cartOpen ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'"
      class="z-40 fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300"
    >
      <div class="flex my-3 items-center justify-between">
        <h3 class="text-2xl font-medium text-gray-700">Tu carrito</h3>
        <button
          @click="cartOpen = !cartOpen"
          class="text-gray-600 focus:outline-none"
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
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <Cart></Cart>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Cart from "./Cart";
export default {
  name: "Header",
  components: { Cart },
  data() {
    return {
      isOpen: false,
      query: ""
    };
  },
  computed: {
    ...mapState(["categories", "cartIsOpen"]),
    ...mapGetters(["GET_CART_COUNTER"]),
    cartOpen: {
      get: function() {
        return this.cartIsOpen;
      },
      set: function(status) {
        this.SET_CART_OPEN_STATUS(status);
      }
    }
  },
  methods: {
    ...mapActions([
      "SET_CATEGORY",
      "SET_CART_OPEN_STATUS",
      "SET_QTY_BY_PRODUCT",
      "SEARCH_PRODUCTS"
    ]),

    setCategory(category) {
      this.SET_CATEGORY(category);
    },

    search() {
      this.SEARCH_PRODUCTS(this.query);
    }
  }
};
</script>

<style scoped></style>
