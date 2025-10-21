import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useCart } from "../../context/CartContext";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { cartApi } from "../../service/cartApi";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get('window');

type CartItem = {
    product: {
        name: string;
        brand: string;
        images: { url: string };
        ratings: { average: number; count: number };
    };
    quantity: number;
    price: number;
    discount: number;
    finalPrice: number;
};

type CartData = {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
};

export function Cart() {
    const cartContext = useCart();
    const dataCart = (cartContext as any)?.dataCart;
    const getCartData = (cartContext as any)?.getCartData;
    const refreshCartCount = (cartContext as any)?.refreshCartCount;
    console.log("dataCart in Cart screen", dataCart);

    useEffect(() => {
        if (getCartData && typeof getCartData === 'function') {
            getCartData();
        }
        if (refreshCartCount && typeof refreshCartCount === 'function') {
            refreshCartCount();
        }
    }, []);

    const removeItemCart = async (productId: string) => {
        // Logic to remove item from cart
        console.log("Removing item with productId:", productId);

        try {
            const res = await cartApi.removeItemCart(productId);
            if (res) {
                Toast.show({
                    type: "success",
                    text1: "Xoá sản phẩm khỏi giỏ hàng thành công",
                })
                // Refresh cart data after removing item
                getCartData();
                refreshCartCount();
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Xoá sản phẩm khỏi giỏ hàng thất bại",
            })
        }
    }

    const renderCartItem = ({ item }: { item: any }) => {
        const { product, quantity, price, discount, finalPrice } = item;
        const discountAmount = (price * discount) / 100;
        const originalPrice = price;

        console.log("item in renderCartItem", item);

        return (
            <View style={styles.cartItemContainer}>
                <Image source={{ uri: product.images.url }} style={styles.productImage} />

                <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                    <Text style={styles.productBrand}>{product.brand}</Text>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>⭐ {product.ratings.average}</Text>
                        <Text style={styles.ratingCount}>({product.ratings.count} đánh giá)</Text>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.finalPrice}>${finalPrice.toFixed(2)}</Text>
                        {discount > 0 && (
                            <View style={styles.discountInfo}>
                                <Text style={styles.originalPrice}>${originalPrice}</Text>
                                <Text style={styles.discountPercent}>-{discount}%</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => removeItemCart(item.product._id)}
                    style={styles.removeButton}>
                    <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
            </View>
        );
    };

    const renderCartSummary = () => {
        if (!dataCart) return null;

        return (
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>

                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tổng sản phẩm:</Text>
                    <Text style={styles.summaryValue}>{dataCart.totalItems} sản phẩm</Text>
                </View>

                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tổng tiền:</Text>
                    <Text style={styles.summaryPrice}>${dataCart.totalPrice.toFixed(2)}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.summaryRow}>
                    <Text style={styles.totalLabel}>Thành tiền:</Text>
                    <Text style={styles.totalPrice}>${dataCart.totalPrice.toFixed(2)}</Text>
                </View>

                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Thanh toán</Text>
                </TouchableOpacity>
            </View>
        );
    };

    if (!dataCart || !dataCart.items || dataCart.items.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Giỏ hàng</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>🛒</Text>
                    <Text style={styles.emptyTitle}>Giỏ hàng trống</Text>
                    <Text style={styles.emptySubtitle}>Hãy thêm sản phẩm vào giỏ hàng</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Giỏ hàng ({dataCart.totalItems})</Text>
            </View>

            <FlatList
                data={dataCart.items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderCartItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {renderCartSummary()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    listContainer: {
        paddingBottom: 20,
    },
    cartItemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginTop: 15,
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    productInfo: {
        flex: 1,
        marginLeft: 12,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
    },
    productBrand: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingText: {
        fontSize: 14,
        color: '#f39c12',
        fontWeight: '600',
    },
    ratingCount: {
        fontSize: 12,
        color: '#95a5a6',
        marginLeft: 8,
    },
    priceContainer: {
        marginBottom: 12,
    },
    finalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#27ae60',
        marginBottom: 4,
    },
    discountInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    originalPrice: {
        fontSize: 14,
        color: '#95a5a6',
        textDecorationLine: 'line-through',
        marginRight: 8,
    },
    discountPercent: {
        fontSize: 12,
        color: '#e74c3c',
        backgroundColor: '#ffeaa7',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        fontWeight: '600',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: '#ecf0f1',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 15,
        color: '#2c3e50',
    },
    removeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    removeButtonText: {
        fontSize: 18,
    },
    summaryContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 15,
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 15,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    summaryValue: {
        fontSize: 14,
        color: '#2c3e50',
        fontWeight: '600',
    },
    summaryPrice: {
        fontSize: 14,
        color: '#2c3e50',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#e9ecef',
        marginVertical: 12,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#27ae60',
    },
    checkoutButton: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 15,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyText: {
        fontSize: 60,
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#7f8c8d',
        textAlign: 'center',
    },
});