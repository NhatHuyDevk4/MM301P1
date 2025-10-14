import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getRefreshToken, getToken } from "../untils/tokenManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://localhost:3000/api"; // Thay đổi URL tùy theo cấu hình của bạn

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 giây
});

// Biến trạng thái refresh token
let isRefreshing = false; // tránh việc gọi nhiều lần khi token hết hạn bị lỗi 401
let failedQueue: any[] = []; // hàng đợi các request bị lỗi 401 trong khi đang refresh token

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Giả sử bạn có hàm getToken để lấy token từ AsyncStorage hoặc nơi lưu trữ khác
    if (token) {
      // Nếu có token, thêm nó vào header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hàm xử lý hàng đợi khi refresh token hoàn thành
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Rfresh Token
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    // AxiosRequestConfig là kiểu dữ liệu của config trong axios
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    //Nếu bị lỗi 401 (Unauthorized) thì thực hiện refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      //401 lỗi Unauthorized
      // Kiểm tra nếu đang refresh token thì thêm request vào hàng đợi
      if (isRefreshing) {
        // nếu đang refresh token thì chờ đến khi hoàn thành
        return new Promise<string | null>(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (!originalRequest.headers) {
              originalRequest.headers = {};
            }
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken(); // Lấy refresh token từ nơi lưu trữ
        if (!refreshToken) {
          // Nếu không có refresh token, chuyển hướng người dùng đến trang đăng nhập
          return Promise.reject(error);
        }

        // Gọi API để lấy access token mới
        const response = await axios.post(
          "http://localhost:3000/api/auth/refresh-token",
          {},
          {
            withCredentials: true, // Gửi kèm cookie
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = response.data.accessToken;
        await AsyncStorage.setItem("accessToken", newAccessToken);

        // Xử lý hàng đợi với token mới
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Gắn token mới vào header và thực hiện lại request ban đầu
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        // Lưu access token mới vào nơi lưu trữ (ví dụ: AsyncStorage)
        // await saveToken(newAccessToken); // Giả sử bạn có hàm saveToken để lưu token
      } catch (error) {
        processQueue(error, null);
        isRefreshing = false;

        // Nếu refresh token cũng không hợp lệ, chuyển hướng người dùng đến trang đăng nhập
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
