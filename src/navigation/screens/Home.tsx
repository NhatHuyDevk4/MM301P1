import { Text } from '@react-navigation/elements';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaViewBase, ScrollView, StyleSheet, TouchableOpacity, View, Dimensions, RefreshControl } from 'react-native';
import { getToken } from '../../untils/tokenManager';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { productApi } from '../../service/productApi';

const { width } = Dimensions.get('window');

export function Home() {
  const [products, setProducts] = useState([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigation();


  const fetchDataProducts = async () => {
    try {
      const res = await productApi.getAll()
      setProducts(res?.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchDataProducts()
  }, [])


  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchDataProducts();
    setRefreshing(false);
  }, [])

  const renderItemList = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate.navigate('ProductDetail', { id: item._id, name: item.name, img: item.images.url } as never)} //
        style={styles.productCard}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.images.url }} style={styles.productImage} />
          {item.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{item.discount}%</Text>
            </View>
          )}
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.productBrand}>{item.brand}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>${item.price}</Text>
            {item.discount > 0 && (
              <Text style={styles.originalPrice}>${(item.price / (1 - item.discount / 100)).toFixed(2)}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItemList}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ff6347" // Màu của vòng xoay trên iOS
            colors={['#ff6347']} // Màu của vòng xoay trên Android
            progressBackgroundColor="#f0f0f0" // Màu nền của vòng xoay trên Android
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
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
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    gap: 10,
  },
  productCard: {
    width: (width / 2) - 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#e74c3c',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  originalPrice: {
    fontSize: 12,
    color: '#95a5a6',
    textDecorationLine: 'line-through',
  },
});
