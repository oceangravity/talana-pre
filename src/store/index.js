import Vue from "vue";
import Vuex from "vuex";
import Talana from "../api/talana";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    currentCategory: {},
    cartIsOpen: false,
    cart: [],
    results: [],
    query: ""
  },
  getters: {
    GET_PRODUCTS_BY_CATEGORY(state) {
      return state.currentCategory.id
        ? state.products.filter(
            item => item.category.id === state.currentCategory.id
          )
        : [];
    },

    GET_CART(state) {
      return state.cart.filter(item => item.qty > 0);
    },

    GET_CART_COUNTER(state, getters) {
      let count = 0;
      getters.GET_CART.forEach(item => (count += item.qty));
      return count;
    }
  },
  mutations: {
    GET_PRODUCTS(state, products) {
      state.products = products.data;
    },

    GET_CATEGORIES(state, categories) {
      state.currentCategory = categories.data.length ? categories.data[0] : {};
      state.categories = categories.data;
    },

    SET_CATEGORY(state, data) {
      state.currentCategory = data;
    },

    SET_CART_OPEN_STATUS(state, data) {
      state.cartIsOpen = data;
    },

    ADD_TO_CART(state, data) {
      if (state.cart.filter(e => e.id === data.id).length === 0) {
        state.cart.push(data);
      }
    },

    SET_QTY_BY_PRODUCT(state, data) {
      const index = state.products.findIndex(e => e.id === data.id);
      Vue.set(state.products[index], "qty", data.qty);
    },

    SEARCH_PRODUCTS(state, data) {
      state.query = data;
      state.results = state.products.filter(
        item => item.name.toLowerCase().search(data.toLowerCase()) > -1
      );
    }
  },
  actions: {
    async GET_PRODUCTS({ commit }) {
      commit("GET_PRODUCTS", await Talana.getProducts());
    },

    async GET_CATEGORIES({ commit }) {
      commit("GET_CATEGORIES", await Talana.getCategories());
    },

    SET_CATEGORY({ commit }, data) {
      commit("SET_CATEGORY", data);
    },

    SET_CART_OPEN_STATUS({ commit }, data) {
      commit("SET_CART_OPEN_STATUS", data);
    },

    ADD_TO_CART({ commit }, data) {
      commit("ADD_TO_CART", data);
    },

    SET_QTY_BY_PRODUCT({ commit }, data) {
      commit("SET_QTY_BY_PRODUCT", data);
    },

    SEARCH_PRODUCTS({ commit }, data) {
      commit("SEARCH_PRODUCTS", data);
    }
  },
  modules: {}
});
