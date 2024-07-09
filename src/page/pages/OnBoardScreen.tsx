import React from 'react';
import { Text, StyleSheet, View, Image ,SafeAreaView, Button} from 'react-native';
import { SCREENS } from '../../helpers/constants';
import TabNavigation from '../../navigation/tab';

const OnBoardScreen = ({navigation}) => {
  
 return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ height: 400 }}>
        <Image
          style={{
            width: '100%',
            resizeMode: 'contain',
            
          }}
          source={require('../../assets/image/logo_app.jpg')}
        />
      </View>
      <View style={style.textContainer}>
        <View>
          <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>
            THẾ GIỚI RAU SẠCH
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              textAlign: 'center',
              color: "grey"
            }}>
            Siêu thị thực phẩm sạch online
          </Text>
        </View>
        <View style={style.indicatorContainer}>
          <View style={style.currentIndicator} />
          <View style={style.indicator} />
          <View style={style.indicator} />
        </View>
        <Button title="Mua sắm thôi" color={"orange"} onPress={() => navigation.navigate('Auth')} />
      </View>
    </SafeAreaView>
 );
};

const style = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  indicatorContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: "orange",
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "grey",
    marginHorizontal: 5,
  },
});

export default OnBoardScreen;
    


