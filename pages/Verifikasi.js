import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default class Verifikasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
    };
  }

  onChangeEmail = (text) => {
    this.setState({ userEmail: text });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={{ marginTop: "5%" }}>
            <Text style={styles.contentText}>Verifikasi OTP</Text>
            <View style={{ marginTop: 25, marginBottom: "10%" }}>
              <Text style={styles.ketText}>
                Masukkan OTP yang telah kami kirimkan ke Nomor Anda.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.otpContainer}>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={this.onChangeEmail}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={this.onChangeEmail}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={this.onChangeEmail}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={this.onChangeEmail}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={this.onChangeEmail}
            />
          </View>
        </View>
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.loginBtn} onPress={() => {}}>
            <Text style={styles.loginText}>KIRIM</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 10, alignSelf: "flex-end", right: "9%" }}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.textLupa}>Kirim Ulang OTP</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#EE4A4A",
  },
  content: {
    backgroundColor: "white",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  contentText: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  ketText: {
    fontSize: 15,
    width: 300,
    lineHeight: 25,
    textAlign: "justify",
  },
  otpContainer: {
    marginTop: "20%",
    marginHorizontal: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otpBox: {
    width: "15%",
    borderRadius: 10,
    backgroundColor: "#FFF",
    borderColor: "gray",
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    color: "#000",
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  loginText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
  },
  loginBtn: {
    width: "85%",
    backgroundColor: "#AA0E0E",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "7%",
  },
  textLupa: {
    fontSize: 15,
    color: "#FFF",
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
