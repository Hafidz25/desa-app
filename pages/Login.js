import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../lib/axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
    };
  }

  onChangeEmail = (text) => {
    this.setState({ userEmail: text });
  };

  onChangePassword = (text) => {
    this.setState({ userPassword: text });
  };

  setPasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  _Login = async () => {
    let username = this.state.userEmail;
    let password = this.state.userPassword;

    if (!username && !password) {
      return Alert.alert(
        "Form kosong!",
        "Mohon masukkan username dan password Anda",
      );
    }

    if (!username) {
      return Alert.alert("Username kosong!", "Mohon Masukkan username Anda");
    }

    if (!password) {
      return Alert.alert("Password kosong!", "Mohon masukkan password Anda");
    }

    const res = await axios
      .post("auth/login", { username, password })
      .catch((err) => err);

    if (res.status !== 200) {
      return alert(res.response.data.message);
    }

    this.storeToken(JSON.stringify(res.data.access_token));
    this.saveItem("access_token", res.data.access_token);
    this.saveItem("refresh_token", res.data.refresh_token);
    this.props.navigation.navigate("Utama");
  };

  async storeToken(user) {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, JSON.stringify(selectedValue));
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={{ marginTop: "15%" }}>
            <Text style={styles.contentText}>LOGIN</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: "15%",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              value={this.state.userEmail}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={this.onChangeEmail}
              placeholder="Username"
              placeholderTextColor="gray"
            />
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
              onChangeText={this.onChangePassword}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.touchableButton}
              onPress={this.setPasswordVisibility}
            >
              <Icon
                name={this.state.hidePassword ? "eye" : "eye-off"}
                size={25}
                color="grey"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 18,
              alignSelf: "flex-end",
              right: "9%",
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Lupa Password")}
            >
              <Text style={styles.textLupa}>Lupa Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={this._Login}>
            {/* onPress={() => this.props.navigation.navigate('Utama')}> */}
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Support By Oitocindonesia.id</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7444E",
  },
  content: {
    backgroundColor: "white",
    height: 190,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  contentText: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },
  inputView: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 50,
    marginTop: "5%",
    justifyContent: "center",
    padding: 25,
  },
  inputText: {
    fontSize: 15,
    color: "#000",
    height: 50,
  },
  loginText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
  },
  loginBtn: {
    width: "85%",
    backgroundColor: "#a12927",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
  },
  textLupa: {
    fontSize: 15,
    color: "#FFF",
  },
  touchableButton: {
    position: "absolute",
    right: 15,
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  footerText: {
    paddingVertical: 25,
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
});
