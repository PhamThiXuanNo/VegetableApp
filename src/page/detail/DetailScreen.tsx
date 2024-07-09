import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BaseUrl from '../url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodModel } from '../../models/foods.model';

const DetailsScreen = ({ route, navigation }) => {
  const { foodName, foodImage, foodPrice, id, foodNote } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(0);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = async () => {
    let items = await AsyncStorage.getItem('cartItems');
    items = items ? JSON.parse(items) : []; // Chuyển đổi chuỗi thành một đối tượng JavaScript hoặc gán một mảng rỗng nếu không có giá trị
  
    const newItem: FoodModel = {
      id: id,
      name: foodName,
      price: foodPrice,
      image: foodImage,
      note: foodNote,
      quantity: 1, // Đặt số lượng là 1 cho mục mới được thêm vào
    };
  
    items.push(newItem); // Thêm mục mới vào mảng items
  
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
      ToastAndroid.show(
        'Đã thêm sản phẩm vào giỏ hàng thành công',
        ToastAndroid.SHORT
      );
      navigation.navigate('Cart');
    } catch (error) {
      console.error(error);
    }
  
    // Cập nhật tổng số lượng trong giỏ hàng
    setCartQuantity(cartQuantity + 1);
  };
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={styles.header}>
        <Icon name="angle-left" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8 }}>Sản phẩm</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 250,
          }}>
          <Image source={{ uri: BaseUrl + foodImage }} style={{ height: 220, width: 220 }} />
        </View>
        <View style={styles.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>
              {foodName}
            </Text>
            {/* <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              {foodPrice} VND
            </Text> */}
            <View style={styles.iconContainer}>
              <Icon name="heart" color={'orange'} size={25} />
</View>
</View>
          <Text style={styles.detailsText}>
            {foodNote}
          </Text>
          {/* <Text style={styles.detailsText}>
            Bạn sẽ yên tâm, không còn phải lo lắng về bữa ăn của gia đình mình nữa khi chọn mua các sản phẩm hữu cơ
            của chúng tôi vì quá trình sản xuất đảm bảo không sử dụng phân bón hoá học, thuốc trừ sâu,
            trừ cỏ độc hại, không dùng chất kích thích tăng trưởng hay chất bảo quản.
          </Text> */}
        </View>
        <View style={styles.quantity}>
          
          <View style={{ flexDirection: 'row', marginTop: 40, }}>
<Text style={{fontSize:18, marginLeft:10, fontWeight:'bold', marginRight:10, alignSelf:'center'}}>SỐ LƯỢNG</Text>
            <View style={{flexDirection: 'row', width: 160}}>
            <TouchableOpacity
              style={{ width: '30%', backgroundColor: 'orange',borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
              onPress={decreaseQuantity}>
              <Text style={{ fontSize: 30, textAlign: 'center', color: '#fff' }}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={{ borderWidth: 0.5, borderColor:'orange', width: '30%', textAlign: 'center', fontSize:20 }}
              keyboardType="numeric"
              value={quantity.toString()}
            />
            <TouchableOpacity
              style={{ width: '30%', backgroundColor: 'orange',borderTopRightRadius: 10, borderBottomRightRadius:10}}
              onPress={increaseQuantity}>
              <Text style={{ fontSize: 30, textAlign: 'center', color: '#fff' }}>+</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.price}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight:10 }}>
              {foodPrice} VND
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={{
              backgroundColor: 'orange',
              width: 250,
              padding: 15,
              borderRadius: 30,
              marginTop: 30,
              marginLeft: 70,
            }}
            onPress={addToCart}>
            <Text style={{ textAlign: 'center', color: '#fff', fontWeight:'bold' }}>THÊM VÀO GIỎ HÀNG</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  details: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    backgroundColor: 'orange',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: 'white',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText:{
    marginTop: 10,
lineHeight: 22,
fontSize: 16,
    color: 'white',
  },
  quantity: {
    // flexDirection:'row',
  },
  price:{
    backgroundColor: 'white',
    height: 50,
    width: 150,
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default DetailsScreen;
