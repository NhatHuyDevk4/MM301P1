import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    SafeAreaView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { productApi } from '../../service/productApi'
import { styles } from '../../styles/ProductDetail'
import Toast from 'react-native-toast-message'
import { cartApi } from '../../service/cartApi'
import { useCart } from '../../context/CartContext'

// {
//     "images": {
//         "url": "https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2024/09/apple-iphone-17-air-concept.jpg",
//         "alt": "iPhone 17  front and back view"
//     },
//     "ratings": {
//         "average": 4.9,
//         "count": 4210
//     },
//     "_id": "68e51b5344b4348ea2ed96ab",
//     "name": "iPhone 17",
//     "description": "Flagship smartphone with advanced A-series chip, ProMotion display, and improved camera system.",
//     "brand": "Apple",
//     "category": [
//         "66f3d07b2a4f3c9b18c12345"
//     ],
//     "price": 3299,
//     "discount": 6,
//     "stock": 77,
//     "tags": [
//         "smartphone",
//         "apple",
//         "ios",
//         "5G"
//     ],
//     "isActive": true,
//     "createdBy": "68da85a56654376895bf88e6",
//     "createdAt": "2025-10-07T13:53:23.359Z",
//     "updatedAt": "2025-10-07T13:53:23.359Z",
//     "__v": 0
// }


interface IProductDetail {
    images: {
        url: string,
        alt: string,
    },
    ratings: {
        average: number,
        count: number,
    },
    _id: string,
    name: string,
    description: string,
    brand: string,
    category: string[],
    price: number,
    discount: number,
    stock: number,
    tags: string[],
    isActive: boolean,
    createdBy: string,
    createdAt: string,
    updatedAt: string,
}

const ProductDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { refreshCartCount, getCartData } = useCart();
    const { id } = route.params as { id: string };

    const [product, setProduct] = useState<IProductDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const fetchProductDetail = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await productApi.getProductById(id);
            if (res?.data) {
                setProduct(res.data);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Không thể tải thông tin sản phẩm. Vui lòng thử lại.',
                })
            }
        } catch (error) {
            setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    }

    const handleQuantityChange = (change: number) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
            setQuantity(newQuantity);
        }
    }

    const handleAddToCart = async () => {
        if (!product) {
            return;
        }

        if (product.stock === 0) {
            Toast.show({
                type: 'error',
                text1: 'Sản phẩm đã hết hàng.',
            })
            return;
        }
        try {
            // console.log(product);
            // console.log(quantity);
            const res = await cartApi.addToCart(product._id, quantity);
            console.log("res", res);
            refreshCartCount();
            Toast.show({
                type: 'success',
                text1: 'Thêm vào giỏ hàng thành công!',
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Thêm vào giỏ hàng thất bại. Vui lòng thử lại.',
            })
        }
    }

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Text key={i} style={{ color: "#FCD34D", fontSize: 16 }}>★</Text>);
        }

        if (hasHalfStar) {
            stars.push(<Text key="half" style={{ color: "#FCD34D", fontSize: 16 }}>☆</Text>);
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Text key={`empty-${i}`} style={{ color: "#E5E7EB", fontSize: 16 }}>☆</Text>);
        }

        return stars;
    }

    const calculateDiscountedPrice = (price: number, discount: number) => {
        return price - (price * discount / 100);
    }

    useEffect(() => {
        fetchProductDetail();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4F46E5" />
                <Text style={styles.loadingText}>Đang tải...</Text>
            </View>
        );
    }

    if (error || !product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error || "Không tìm thấy sản phẩm"}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchProductDetail}>
                    <Text style={styles.retryButtonText}>Thử lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const discountedPrice = calculateDiscountedPrice(product.price, product.discount);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.images.url }}
                        style={styles.productImage}
                    />

                    {/* Back Button */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ fontSize: 18, color: "#374151" }}>←</Text>
                    </TouchableOpacity>

                    {/* Favorite Button */}
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => setIsFavorite(!isFavorite)}
                    >
                        <Text style={{ fontSize: 18, color: isFavorite ? "#EF4444" : "#6B7280" }}>
                            {isFavorite ? "♥" : "♡"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Product Info */}
                <View style={styles.contentContainer}>
                    <Text style={styles.brandText}>{product.brand}</Text>
                    <Text style={styles.productName}>{product.name}</Text>

                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        <View style={styles.starContainer}>
                            {renderStars(product.ratings.average)}
                        </View>
                        <Text style={styles.ratingText}>
                            {product.ratings.average} ({product.ratings.count} đánh giá)
                        </Text>
                    </View>

                    {/* Price */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.currentPrice}>
                            {discountedPrice.toLocaleString('vi-VN')}đ
                        </Text>
                        {product.discount > 0 && (
                            <>
                                <Text style={styles.originalPrice}>
                                    {product.price.toLocaleString('vi-VN')}đ
                                </Text>
                                <View style={styles.discountBadge}>
                                    <Text style={styles.discountText}>-{product.discount}%</Text>
                                </View>
                            </>
                        )}
                    </View>

                    {/* Description */}
                    <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    {/* Product Information */}
                    <Text style={styles.sectionTitle}>Thông tin sản phẩm</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Thương hiệu</Text>
                        <Text style={styles.infoValue}>{product.brand}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Trạng thái</Text>
                        <View style={styles.stockContainer}>
                            <View style={[
                                styles.stockDot,
                                product.stock > 0 ? styles.inStock : styles.outOfStock
                            ]} />
                            <Text style={styles.infoValue}>
                                {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>SKU</Text>
                        <Text style={styles.infoValue}>{product._id.slice(-8).toUpperCase()}</Text>
                    </View>

                    {/* Tags */}
                    {product.tags && product.tags.length > 0 && (
                        <>
                            <Text style={styles.sectionTitle}>Tags</Text>
                            <View style={styles.tagsContainer}>
                                {product.tags.map((tag) => (
                                    <View key={tag} style={styles.tag}>
                                        <Text style={styles.tagText}>#{tag}</Text>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomContainer}>
                {/* Quantity Selector */}
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{quantity}</Text>

                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stock}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Add to Cart Button */}
                <TouchableOpacity
                    style={[
                        styles.addToCartButton,
                        product.stock === 0 && styles.addToCartButtonDisabled
                    ]}
                    onPress={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    <Text style={styles.addToCartButtonText}>
                        {product.stock === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductDetail