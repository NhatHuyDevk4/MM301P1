import AsyncStorage from "@react-native-async-storage/async-storage";

// Lưu token
const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("accessToken", token);
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

const saveRefreshToken = async (refreshToken: string) => {
  try {
    await AsyncStorage.setItem("refreshToken", refreshToken);
  } catch (error) {
    console.error("Error saving refresh token:", error);
  }
};

const getRefreshToken = async () => {
  try {
    await AsyncStorage.getItem("refreshToken");
  } catch (error) {
    console.error("Error getting refresh token:", error);
  }
};

// Lấy token
const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// Xóa token
const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    console.log("Token removed successfully");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

export { saveToken, getToken, removeToken, saveRefreshToken, getRefreshToken };
