import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { CategoriesModel } from '../../models/categories.model';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FoodModel } from '../../models/foods.model';


type ItemProps = {
  itemFood: FoodModel;
  onPressF: () => void;
}
const Card = ({}) => {
  const foods: FoodModel[] = [
    {
      id: '1',
      name: 'Meat Pizza',
      ingredients: 'Mixed Pizza',
      price: '8.30',
      image: require('../../assets/meatPizza.png')
    },
    {
      id: '2',
      name: 'Cheese Pizza',
      ingredients: 'Cheese Pizza',
      price: '7.10',
      image: require('../../assets/cheesePizza.png')
    },
    {
      id: '3',
      name: 'Chicken Burger',
      ingredients: 'Fried Chicken',
      price: '5.10',
      image: require('../../assets/chickenBurger.png')
    },
    {
      id: '4',
      name: 'Sushi Makizushi',
      ingredients: 'Salmon Meat',
      price: '9.55',
      image: require('../../assets/sushiMakizushi.png'),
    }
  
  ];
  const FoodItem = ({itemFood,onPressF} : ItemProps ) => (
    <TouchableHighlight underlayColor={"white"} activeOpacity={0.9} onPress={onPressF}>
      <View style={styles.card}>
        <View style={{alignItems: 'center', top: -40}}>
          <Image source={itemFood.image} style={{height: 120, width: 120}} />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{itemFood.name}</Text>
          <Text style={{fontSize: 14, color: "grey", marginTop: 2}}>
            {itemFood.ingredients}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            ${itemFood.price}
          </Text>
          <View style={styles.addToCartBtn}>
            <Icon name="add" size={20} color={"white"} />
          </View>
        </View>
        </View>
    </TouchableHighlight>
  );
 
};

export default Card;
const styles = StyleSheet.create({
  card: {
    height: 220,
    width: "auto",
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: "white",
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: "primary",
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem:{

  },
  categoryImage:{

  },
  categoryName:{
    
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  }

})
