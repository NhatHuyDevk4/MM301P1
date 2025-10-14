import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");
//  const { height } = Dimensions.get("window");:
// Lấy chiều cao của cửa sổ thiết bị hiện tại

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },

  content: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10, // Chỉ áp dụng cho Android để tạo hiệu ứng bóng đổ
  },

  logo: {
    alignSelf: "center",
    marginBottom: 20,
  },

  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4F46E5",
    textAlign: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
    textAlign: "center",
  },

  subTitle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    color: "#111827",
  },

  inputFocused: {
    borderColor: "#4F46E5",
    backgroundColor: "#FFFFFF",
    shadowColor: "#4F46E5",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  loginButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#4F46E5",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  forgotPassword: {
    textAlign: "center",
    color: "#4F46E5",
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: "underline",
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  signupText: {
    color: "#6B7280",
    fontSize: 14,
  },

  signupLink: {
    color: "#4F46E5",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },

  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 40,
  }
});

// shadowOffset: là thuộc tính xác định độ dịch chuyển của bóng đổ
// width: 0, height: 10: Bóng đổ không dịch chuyển theo chiều ngang (width: 0)
// nhưng dịch chuyển 10 đơn vị theo chiều dọc (height: 10)
