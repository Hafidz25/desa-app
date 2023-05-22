import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: [],
    };
  }

  async getToken() {
    try {
      let userData = await AsyncStorage.getItem("access_token");
      let data = JSON.parse(userData);
      this.setState({ access_token: data });
      this._onCheckUser();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  _onCheckUser = async () => {
    if (this.state.access_token === null) {
      this.props.navigation.replace("Login");
    } else {
      this.props.navigation.replace("Utama");
    }
  };

  render() {
    return (
      // <View style={styles.container} onTouchStart={() => this.getToken()}>
      <View
        style={styles.container}
        onTouchStart={() => this.props.navigation.replace("Login")}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 250,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 35, fontWeight: "800", color: "#FFF" }}>
            {" "}
            Desa Digital{" "}
          </Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.content}>
            <View>
              <Text style={styles.contentText}>
                Adalah bagian dari one step service untuk memudahkan warga /
                masyarakat, dalam mengurus berkas ke pemerintah desa.
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.contentText}>
                Aplikasi ini di peruntukkan untuk RT.
              </Text>
            </View>
          </View>
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
    height: 275,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  contentText: {
    fontSize: 16,
    width: 300,
    lineHeight: 25,
    textAlign: "justify",
  },
  footerText: {
    paddingVertical: 25,
    backgroundColor: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
});
