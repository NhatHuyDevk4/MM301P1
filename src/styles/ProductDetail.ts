import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollView: {
    flex: 1,
  },

  imageContainer: {
    width: width,
    height: height * 0.4,
    backgroundColor: "#F8F9FA",
    position: "relative",
  },

  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  favoriteButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  brandText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 8,
  },

  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
    lineHeight: 32,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  starContainer: {
    flexDirection: "row",
    marginRight: 8,
  },

  ratingText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  currentPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#EF4444",
    marginRight: 12,
  },

  originalPrice: {
    fontSize: 18,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
    marginRight: 8,
  },

  discountBadge: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },

  discountText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
    marginTop: 20,
  },

  description: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  infoLabel: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },

  infoValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
  },

  stockContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  inStock: {
    backgroundColor: "#10B981",
  },

  outOfStock: {
    backgroundColor: "#EF4444",
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    marginBottom: 20,
  },

  tag: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },

  tagText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },

  bottomContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
  },

  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginHorizontal: 20,
    minWidth: 40,
    textAlign: "center",
  },

  addToCartButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  addToCartButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },

  addToCartButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  loadingText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 12,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },

  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },

  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
