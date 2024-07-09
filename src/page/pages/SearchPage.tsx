import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import BaseUrl from "../url";
import { FoodModel } from '../../models/foods.model';
import { SCREENS } from '../../helpers/constants';

const SearchPage = ({ route, navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [foods, setFoods] = useState([]);

  const handleSearch = () => {
    const processedSearchText = searchText.replace(/[^\p{L}\s]/gu, '');
    const results = foods.filter(item => item.name.toLowerCase().includes(processedSearchText.toLowerCase()));
    setSearchResults(results);
  };
  type FoodItemProps = {
    itemFood: FoodModel;
    onPressF: () => void;
  };
  const FoodItem = ({ itemFood, onPressF }: FoodItemProps) => (
    <TouchableHighlight underlayColor={"white"} activeOpacity={0.9} onPress={() => navigateToDetails(itemFood)}>
      <View style={styles.card}>
        <View style={{ alignItems: 'center', top: -40 }}>
          <Image source={{ uri: BaseUrl + itemFood.image }} style={{ height: 100, width: 100 }} />
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{itemFood.name}</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {itemFood.price} VND
          </Text>
          <View style={styles.addToCartBtn}>
            <Icon name="plus" size={20} color={"white"} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  const goToDetailScreen = (name, image, price, note) => {
    navigation.navigate(SCREENS.DETAIL, {
      foodName: name,
      foodImage: image,
      foodPrice: price,
      foodNote: note
    });
  };
  
  const navigateToDetails = (item) => {
    // Gọi hàm goToDetailScreen với các tham số tương ứng từ item
    goToDetailScreen(item.name, item.image, item.price, item.note);
  };
  
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(BaseUrl + 'products');
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFoods();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={styles.header}>
        <Icon name="angle-left" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8 }}>Tìm kiếm</Text>
      </View>
      <ScrollView>
<View style={styles.inputContainer}>
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="search" size={28} />
          </TouchableOpacity>
          <TextInput
            style={{ flex: 1, fontSize: 18 , fontFamily:'Roboto'}}
            placeholder="Tìm kiếm tại đây"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={searchResults}
          renderItem={({ item }) => (
            // <FoodItem itemFood={item}/>
            <FoodItem
              itemFood={item}
              onPressF={() => {
                goToDetailScreen(item.name, item.image, item.price, item.note);
              }}
            />               
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 45,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: 'rgba(192, 192, 192, 0.5)',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  card: {
    height: 230,
    width: '95%',
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
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
});