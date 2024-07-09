import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, TouchableHighlight, FlatList, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { CategoriesModel } from "../../models/categories.model";
import { FoodModel } from "../../models/foods.model";
import { SCREENS, kDefaultPadding } from "../../helpers/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseUrl from "../url";
import EventBus from "../EventBus";
import BannerComponent from "../component/bannerComponent";
import HeaderComponent from "../component/headerComponent";

const { width } = Dimensions.get('window'); // Lấy kích thước màn hình
const cardWidth = width / 2 - 20; // Tính toán kích thước cho card

type CategoryItemProps = {
  itemCategory: CategoriesModel;
  onPress: () => void;
};

//'img_foods/onboard.png'
const CategoryList = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [categories, setCategories] = useState([]);

  const CategoryItem = ({ itemCategory, onPress }: CategoryItemProps) => (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.categoryBtn, backgroundColor: "#9ACD32" }}>
        <View style={{borderRadius:100, backgroundColor: 'white'}}>
        <Image
          source={{ uri: BaseUrl + itemCategory.image }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        </View>
        
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            marginLeft: 10,
            color: "white",
          }}
        >
          {itemCategory.name}
        </Text>
      </View>
    </TouchableOpacity>
    
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(BaseUrl + 'category');
        if (response.status === 200) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesListContainer}
    >
      {categories.map((category, index) => (
        <CategoryItem
          key={category.id}
          itemCategory={category}
          onPress={() => setSelectedCategoryIndex(index)}
        />
        
      ))}
    </ScrollView>
    
    
  );
};

type FoodItemProps = {
  itemFood: FoodModel;
  onPressF: () => void;
};

const FoodItem = ({ itemFood, onPressF }: FoodItemProps) => (
  
  <TouchableHighlight underlayColor={"white"} activeOpacity={0.9} onPress={onPressF}>
    
    <View style={styles.card}>
      <View style={{ alignItems: 'center', top: -40 }}>
        <Image source={{ uri: BaseUrl + itemFood.image }} style={{ height: 100, width: 100 }} />
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#6B8E23'}}>{itemFood.name}</Text>
      </View>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#9ACD32'}}>
          {itemFood.price} VND
        </Text>
        <View style={styles.addToCartBtn}>
          <Icon name="plus" size={20} color={"white"} onPress={()=>navigation.navigate('cartFood')}/>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

const FoodHome = ({ navigation }: { navigation: any }) => {
  const goToDetailScreen = (name: string, image: string, price: number, note: string, id: number) => {
    navigation.navigate(SCREENS.DETAIL, {
      foodName: name,
      foodImage: image,
      foodPrice: price,
      foodNote: note,
      id: id,
    });
  };

  const [foods, setFoods] = useState([]);
  const [user, setUser] = useState<any>([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = () => {
    console.log('Đang tìm kiếm:', searchText);
    navigation.navigate('Search', { searchResults });
    // Thực hiện quá trình tìm kiếm dựa trên searchText
    // Lưu kết quả vào setSearchResults
  };
  const User = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value) {
        const userData = JSON.parse(value);
        setUser(userData);
        // console.log(userData);
      }
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await fetch(BaseUrl + 'products');
      if (response.status === 200) {
        const data = await response.json();
        setFoods(data);
      }
    } catch (error) {
      console.error('Error fetching food:', error);
    }
  };

  const handleUserChange = (newUser: any) => {
    setUser(newUser);
  };

  useEffect(() => {
    fetchFoods();
    User();
    EventBus.on('userChanged', handleUserChange);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderComponent navigation={navigation} />
      <View style={{
        marginTop: 40,
        flexDirection: "row",
        paddingHorizontal: 20,
      }}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="search" size={28} />
          </TouchableOpacity>
           <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Tìm kiếm tại đây"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />     
           
        </View>

      </View>
      <View>
        <CategoryList />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={foods}
        renderItem={({ item }) => (
          <FoodItem
            itemFood={item}
            onPressF={() => {
              goToDetailScreen(item.name, item.image, item.price, item.note, item.id);
            }}
          />
        )}
      />

    </SafeAreaView>
  );
};

export default FoodHome;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 45,
    borderRadius: 15,
    flexDirection: "row",
    backgroundColor: "rgba(192, 192, 192, 0.5)",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 50,
    width: 120,
    marginRight: 7,
    borderRadius: 100,
    alignItems: "center",
    paddingHorizontal: 1,
    flexDirection: "row",
  },
  card: {
    height: 200,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: "white",

    flexDirection: "column",
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: "orange",
    justifyContent: 'center',
    alignItems: 'center',
  },
  element: {
    flex: 1,
    paddingHorizontal: kDefaultPadding * 1.6,

    alignSelf: 'stretch',
  },
});
