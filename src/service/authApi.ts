import axiosClient from "./axiosClinet";

export const authApi = {
  loginAuth: async (data: { email: string; password: string }) => {
    try {
      const res = await axiosClient.post("/auth/login", data);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  },

  registerAuth: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await axiosClient.post("/auth/signup", data);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  },
};
