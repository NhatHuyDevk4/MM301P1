import Toast from "react-native-toast-message";
import axiosClient from "./axiosClinet";

export const cartApi = {
  getCart: async () => {
    try {
      const res = await axiosClient.get("/cart");
      return res;
    } catch (error) {
      console.log("error", error);
      Toast.show({
        type: "error",
        text1: "Lấy giỏ hàng thất bại",
      });
    }
  },
  addToCart: async (productId: string, quantity: number) => {
    try {
      const res = await axiosClient.post("/cart/add", { productId, quantity });
      return res;
    } catch (error) {
      console.log("error", error);
      Toast.show({
        type: "error",
        text1: "Thêm vào giỏ hàng thất bại",
      });
    }
  },
  countItemCart: async () => {
    try {
      const res = await axiosClient.get("/cart/count");
      console.log("res in cartApi", res);
      return res;
    } catch (error) {
      console.log("error", error);
      Toast.show({
        type: "error",
        text1: "Lấy số lượng sản phẩm trong giỏ hàng thất bại",
      });
    }
  },
  removeItemCart: async (productId: string) => {
    try {
      const res = await axiosClient.delete(`/cart/remove/${productId}`);
      return res;
    } catch (error) {
      console.log("error", error);
      Toast.show({
        type: "error",
        text1: "Xoá sản phẩm khỏi giỏ hàng thất bại",
      });
    }
  },
};
