import React, { useState, createRef } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SCREENS } from "../../helpers/constants";
import BaseUrl from '../url';

const Register = ({ navigation }: { navigation: any }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errortext, setErrortext] = useState('');
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    }
    const emailInputRef = createRef();
    const passwordInputRef = createRef();

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName || !userEmail || !userPassword) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        var dataToSend = {
            name: userName,
            email: userEmail,
            password: userPassword,
        };

        fetch(BaseUrl + 'register', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                //Header Defination
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 'success') {
                    setIsRegistraionSuccess(true);
                } else {
                    setErrortext(responseJson.error);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    if (isRegistraionSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'orange',
                    justifyContent: 'center',
                }}>
                <Text style={styles.successTextStyle}>
                    Đăng ký thành công
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate(SCREENS.LOGIN)}>
                    <Text style={styles.buttonTextStyle}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <SafeAreaView>
            <StatusBar backgroundColor="orange" />
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.text1}>
                        Đăng ký
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.text2}>
                        Hãy tạo một tài khoản mới giúp bạn có trải nghiệm tuyệt vời hơn!
                    </Text>
                    <View>
                        <View style={styles.input}>
                            <TextInput
                                onChangeText={(UserName) => setUserName(UserName)}
                                placeholder='Tên'
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    emailInputRef.current && emailInputRef.current.focus()
                                }
                                blurOnSubmit={false} />
                        </View>
                        <View style={styles.input}>
                            <TextInput placeholder='Email'
                                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                ref={emailInputRef}
                                returnKeyType="next"
                                keyboardType="email-address"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                blurOnSubmit={false} />
                        </View>
                        <View style={styles.input}>
                            <TextInput
                                placeholder='Mật khẩu'
                                secureTextEntry={!isPasswordVisible}
                                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                                returnKeyType="next"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false} />
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <Icon style={{ marginTop: 15, marginLeft: 200 }}
                                    name={"eye-slash"}
                                    size={20}
                                    color="gray" />
                            </TouchableOpacity>
                        </View>
                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}
                    </View>
                    <TouchableOpacity
                        style={styles.signin}
                        onPress={handleSubmitButton} >
                        <Text>Đăng ký</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Creat} onPress={() => navigation.navigate(SCREENS.LOGIN)}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#000000' }}>Đã có tài khoản</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(SCREENS.REGISTER)}>
                        <Text style={{ fontSize: 13, color: 'blue' }}>Kết nối với
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", padding: 5 }}>
                        <TouchableOpacity>
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
export default Register;
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
        paddingTop: 10
    },
    text2: {
        fontSize: 20,
        color: "#000000",
        fontFamily: "popins-semiBold",
        fontWeight: 'bold',
        marginVertical: spacing * 2,
        textAlign: "center",
        maxWidth: '80%'


    },
    input: {
        flexDirection: "row",
        fontFamily: "popins-regular",
        padding: 5,
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        marginVertical: 17,
        width: 350

    }, passwordIcon: {
        padding: 10,
    }
    , signin: {
        padding: 17, backgroundColor: '#FFA500', marginVertical: 15, borderRadius: 10, width: 350, alignItems: 'center',

    },
    Creat: {
        padding: 10, marginVertical: 10, width: 350, alignItems: 'center',

    },
    icon: {
        justifyContent: "flex-start",
        padding: 15
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    }
});