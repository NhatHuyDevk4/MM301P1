import axiosClient from "./axiosClinet";

export const productApi = {
  getAll: async () => {
    try {
      const res = await axiosClient.get("/products");
      return res;
    } catch (error) {
      console.log("error", error);
    }
  },

  getProductById: async (id: string) => {
    try {
      const res = await axiosClient.get(`/products/${id}`);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  },
};
