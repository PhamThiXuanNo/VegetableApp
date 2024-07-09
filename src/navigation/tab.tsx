import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import FoodHome from "../page/pages/FoodHome";
import CartFood from "../page/pages/cartFood";
import SetScreen from "../page/pages/Setting";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "defaultIconName";
          if (route.name === "Trang chủ") {
            iconName = "home";
          } else if (route.name === "Giỏ hàng") {
            iconName = "shopping-cart";
          } else if (route.name === "Cài đặt") {
            iconName = "gear";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Trang chủ"
        component={FoodHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Giỏ hàng"
        component={CartFood}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cài đặt"
        component={SetScreen}
        options={{
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="gear" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
