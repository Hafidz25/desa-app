import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    View, Text, StyleSheet,
    TextInput, TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: '',
            userPassword: '',
        }
    }

    onChangeEmail = text => {
        this.setState({ userEmail: text });
    };

    onChangePassword = text => {
        this.setState({ userPassword: text });
    };

    setPasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    _Login = async () => {
        let username = this.state.userEmail;
        let password = this.state.userPassword;
        if (!username && !password) {
            alert('Silahkan Masukkan Username dan Password Anda');
            return;
        }
        if (!username) {
            alert('Silahkan Masukkan Username Anda');
            return;
        }
        if (!password) {
            alert('Silahkan Masukkan Password Anda');
            return;
        }

        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        let body = {
            "username": username,
            "password": password
        };

        // let url = "http://10.0.0.151:8000/api/auth/login";
        let url = "https://host02.birosolusi.com/edesa/public/api/auth/login";

        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.message)
                if (responseJson.message == 'login success') {
                    this.storeToken(JSON.stringify(responseJson.access_token));
                    this.saveItem('access_token', responseJson.access_token)
                    this.saveItem('refresh_token', responseJson.refresh_token)
                    this.props.navigation.navigate("Utama")
                } else {
                    alert(responseJson.message)
                }
            })
            .catch((error) => {
                console.log(error)
            });
    };

    async storeToken(user) {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    saveItem = async (item, selectedValue) => {
        try {
            await AsyncStorage.setItem(item, JSON.stringify(selectedValue));
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{ marginTop: '15%' }}>
                        <Text style={styles.contentText}>LOGIN</Text>
                    </View>
                </View>
                <View style={{
                    marginTop: '15%',
                    alignContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            value={this.state.userEmail}
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onChangeText={this.onChangeEmail}
                            placeholder="Username"
                            placeholderTextColor="gray" />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            value={this.state.userPassword}
                            autoCorrect={false}
                            autoCapitalize="none"
                            placeholder="Password"
                            placeholderTextColor="gray"
                            keyboardType="default"
                            secureTextEntry={!this.state.hidePassword}
                            onChangeText={this.onChangePassword} />
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.touchableButton}
                            onPress={this.setPasswordVisibility}>
                            <Icon
                                name={this.state.hidePassword ? 'eye' : 'eye-off'}
                                size={25}
                                color="grey"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 18, alignSelf: 'flex-end', right: '9%' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Lupa Password')}>
                            <Text style={styles.textLupa}>
                                Lupa Password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={this._Login}>
                        {/* onPress={() => this.props.navigation.navigate('Utama')}> */}
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Support By Oitocindonesia.id</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7444E'
    },
    content: {
        backgroundColor: 'white',
        height: 190,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    contentText: {
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
    },
    inputView: {
        width: "85%",
        backgroundColor: '#FFF',
        borderRadius: 10,
        height: 50,
        marginTop: '5%',
        justifyContent: "center",
        padding: 25,
    },
    inputText: {
        fontSize: 15,
        color: '#000',
        height: 50,
    },
    loginText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 15,
    },
    loginBtn: {
        width: "85%",
        backgroundColor: '#a12927',
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: '15%',
    },
    textLupa: {
        fontSize: 15,
        color: '#FFF',
    },
    touchableButton: {
        position: 'absolute',
        right: 15,
        justifyContent: "center",
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    footerText: {
        paddingVertical: 25,
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
    },
});