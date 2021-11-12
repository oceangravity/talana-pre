import axios from "axios";

const BASE_URL = "https://sva.talana.com:8000/api";

export default {
  getProducts() {
    return axios.get(`${BASE_URL}/product/?format=json`);
  },

  getCategories() {
    return axios.get(`${BASE_URL}/product-category/?format=json`);
  }
};
