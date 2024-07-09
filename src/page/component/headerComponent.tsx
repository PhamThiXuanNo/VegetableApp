import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import { COLORS, TEXT_TYPES, kDefaultPadding } from '../../helpers/constants';
import TextComponent from './textComponent';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const HeaderComponent = ({ navigation }: { navigation: any }) => {

  const [keyword, setKeyword] = useState("")

  return (
    <View style={styles.body}>
      {/* <View style={styles.inputForm}>
        <SyS16_SearchIcon width={18} height={18} />
        <TextInput
          returnKeyType="search"
          verticalAlign="bottom"
          style={[styles.textInput]}
          placeholder="Search Product"
          onSubmitEditing={() => keyword&& navigation.navigate(SCREENS.ExploreScreen, { keyword: keyword })}
          placeholderTextColor={COLORS.textPrimaryColor}
          onChangeText={text => setKeyword(text)}
        />
      </View> */}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        {/* <LogoComponent size={35} /> */}
        <Image source={require("../../assets/image/logo.jpg")} style={{ height: 50, width: 50, borderRadius: 25 }} />
        <TextComponent data={{
          type: TEXT_TYPES.heading4,
          text: "THẾ GIỚI RAU SẠCH",
          style: {
            color: '#6B8E23',
            marginLeft: 8,
            fontWeight: 'bold' 
          }
        }} />
      </View>
      <View style={styles.iconBtn}>
      <Icon name="heart" size={28} style={{color:'gray'}}/>

      </View>
      <View style={styles.iconBtn}>
      <Icon name="bell" size={28} style={{color:'gray'}}/>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    // flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
    padding: kDefaultPadding * 1.6,
    borderColor: COLORS.borderColor,
  },
  inputForm: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
    borderColor: COLORS.borderColor,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: COLORS.textPrimaryColor,
  },
  iconBtn: {
    marginLeft: 16,
  },
});

export default HeaderComponent;
