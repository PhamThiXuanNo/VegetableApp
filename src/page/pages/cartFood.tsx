import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FoodModel } from '../../models/foods.model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../url';
import { ToastAndroid } from 'react-native';

const COLORS = {
  white: 'white',
  primary: '#9ACD32',
};

type CartFoodProps = {
  navigation: any;
};

const CartFood = ({ navigation }: CartFoodProps) => {
  const [product, setProduct] = useState<FoodModel[]>([]);
  const [total, setTotal] = useState(0);

  const fetchCartItems = async () => {
    try {
      const items = await AsyncStorage.getItem('cartItems');
      if (items) {
        const parsedItems: FoodModel[] = JSON.parse(items);
        setProduct(parsedItems);
        calculateTotal(parsedItems);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const calculateTotal = (items: FoodModel[]) => {
    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
      totalPrice += items[i].price * items[i].quantity;
    }
    setTotal(totalPrice);
  };

  const handleDelete = async (itemFood: FoodModel) => {
    let items = await AsyncStorage.getItem('cartItems');
    items = items ? JSON.parse(items) : [];

    // Lọc các mục có id khác với id của mục cần xóa
    const updatedItems = items.filter((item: FoodModel) => item.id !== itemFood.id);

    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
      ToastAndroid.show('Đã xóa sản phẩm khỏi giỏ hàng', ToastAndroid.SHORT);
      // Cập nhật danh sách sản phẩm và tổng giá trị
      setProduct(updatedItems);
      calculateTotal(updatedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const FoodItem = ({ itemFood }: { itemFood: FoodModel }) => (
    <View style={styles.cartCard}>
      <Image source={{ uri: BaseUrl + itemFood.image }} style={{ height: 80, width: 80 }} />
      <View style={{ height: 100, marginLeft: 10, paddingVertical: 20, flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#6B8E23' }}>{itemFood.name}</Text>
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#9ACD32' }}>{itemFood.price} VND</Text>
        <Text style={{ fontSize: 16, color: 'gray' }}>Số lượng: {itemFood.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(itemFood)}>
          <Icon name='trash' size={28}></Icon>
        </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tổng giá trị</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{total} VND</Text>
</View>
      <View style={{ marginHorizontal: 30 }}>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>THANH TOÁN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={28} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: 'bold' }}>Giỏ hàng</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={product}
        renderItem={({ item }) => <FoodItem itemFood={item} />}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
   paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartFood;
