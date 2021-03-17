import axios from "axios";

const BASE_URL = "http://sva.talana.com:8000/api";

export default {
  getProducts() {
    return axios.get(`${BASE_URL}/product`);
  },

  getCategories() {
    return axios.get(`${BASE_URL}/product-category`);
  }
};
