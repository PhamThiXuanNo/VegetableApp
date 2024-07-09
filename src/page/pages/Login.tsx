import React, { useState, createRef } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SCREENS } from "../../helpers/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from "../url";
import { Image } from 'react-native';

const LoginPage = ({ navigation }: { navigation: any }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    }
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errortext, setErrortext] = useState('');
    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail || !userPassword) {
            alert('Vui lòng điền đủ thông tin');
            return;
        }

        let dataToSend = { email: userEmail, password: userPassword };

        fetch(BaseUrl + 'login', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.status === 'success') {
                    console.log(responseJson.data);
                    try {
                        await AsyncStorage.setItem('user', JSON.stringify(responseJson.data)).then(() => {
                            navigation.replace('Home');
                        });
                    } catch (error) {
                        console.error('Error reading or writing user data:', error);
                    }
                } else {
                    setErrortext(responseJson.error);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <SafeAreaView>
            <StatusBar backgroundColor="orange" />
            <View style={styles.container}>
                <View style={{ flexDirection: "row", }}>
                    <Icon style={styles.icon} name="angle-left" size={30} color="black" />
                    <Text style={styles.text1}>
                        Đăng nhập
                    </Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                <Image source={require("../../assets/image/logo2.png")} style={{ height: 200, width: 400, borderRadius: 20 }} />
                    <View>
                        <View style={styles.input}>
                            <TextInput
                                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                placeholder='Email'
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                                blurOnSubmit={false} />
                        </View>
                        <View style={styles.input}>
                            <TextInput
                                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                                placeholder='Mật khẩu'
                                secureTextEntry={!isPasswordVisible}
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                returnKeyType="next" />
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <Icon style={{ marginTop: 15, marginLeft: 200 }}
                                    name={"eye-slash"}
                                    size={20}
                                    color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'popins-semiBold', fontSize: 15, color: 'blue', marginLeft: 150 }}>
                            Quên mật khẩu
                        </Text>
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}
                    <TouchableOpacity style={styles.signin} onPress={handleSubmitPress}>
                        <Text>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(SCREENS.REGISTER)} style={styles.Creat}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#000000' }}>Tạo tài khoản mới</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={{ fontSize: 13, color: 'blue' }}>Kết nối với</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", padding: 5 }}>
                        <TouchableOpacity >
                            <Icon style={styles.icon} name="google" size={40} color="red" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon style={styles.icon} name="apple" size={40} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon style={styles.icon} name="facebook" size={40} color="blue" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
export default LoginPage;
const spacing = 10;
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 10,
    },
    text1: {
        fontSize: 30,
        color: "#FFA500",
        fontFamily: "popins-bold",
        //marginVertical: spacing * 3,
        fontWeight: 'bold',
        marginLeft: 80,
        marginTop: 10,
        marginBottom: 15
    },
    text2: {
        fontSize: 20,
        color: "#000000",
        fontFamily: "popins-semiBold",
        fontWeight: 'bold',
        marginVertical: spacing * 2,
        textAlign: "center",
        maxWidth: '60%'
    },
    input: {
        flexDirection: "row",
        fontFamily: "popins-regular",
        padding: 5,
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        marginVertical: 17,
        width: 350
    },
    passwordIcon: {
        padding: 10,
    },
    signin: {
        padding: 15, backgroundColor: '#FFA500', marginVertical: 15, borderRadius: 10, width: 350, alignItems: 'center',
        marginTop: 30
    },
    Creat: {
        padding: 15, marginVertical: 10, width: 350, alignItems: 'center',
        marginTop: 15,
    },
    icon: {
        justifyContent: "flex-start",
        padding: 15,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});