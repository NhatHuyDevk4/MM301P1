import { createContext, useContext, useEffect, useState } from "react";
import { cartApi } from "../service/cartApi";
import Toast from "react-native-toast-message";

// Tạo context cho giỏ hàng
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const [dataCart, setDataCart] = useState(null);

    const refreshCartCount = async () => {
        try {
            const res = await cartApi.countItemCart();
            console.log("res in refreshCartCount", res);
            if (res) {
                setCartCount(res.itemCount);
            } else {
                setCartCount(0);
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Lỗi lấy số lượng sản phẩm trong giỏ hàng",
            })
        }
    };

    const getCartData = async () => {
        try {
            const res = await cartApi.getCart();
            console.log("res in getCartData", res);
            if (res) {
                setDataCart(res.data);
            }
        } catch (error) {
            console.log("Error getting cart data:", error);
            Toast.show({
                type: "error",
                text1: "Lỗi lấy dữ liệu giỏ hàng",
            })
        }
    };

    useEffect(() => {
        refreshCartCount();
        getCartData();
    }, [])

    const value = {
        cartCount,
        dataCart,
        refreshCartCount,
        getCartData,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be use within a CartProvider')
    }

    return context;
}