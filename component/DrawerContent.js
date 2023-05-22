import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Title, Caption, Drawer } from "react-native-paper";
import { DrawerItem } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: [],
      refresh_token: [],
    };
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    try {
      let userData = await AsyncStorage.getItem("access_token");
      let data = JSON.parse(userData);
      this.setState({ access_token: data });
      this.getRefreshToken();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async getRefreshToken() {
    try {
      let userData = await AsyncStorage.getItem("refresh_token");
      let data = JSON.parse(userData);
      this.setState({ refresh_token: data });
      this.getRefreshToken();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  _RefreshToken = async () => {
    let token = this.state.refresh_token;
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    let body = {
      refresh_token: token,
    };

    let url = "http://10.0.0.151:8000/api/auth/refresh";

    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ access_token: responseJson.access_token });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  _Logout = async () => {
    let token = this.state.access_token;
    let headers = {
      "x-access-token": token,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    let url = "http://10.0.0.151:8000/api/auth/logout";

    fetch(url, {
      method: "DELETE",
      headers,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message == "Token is Expired") {
          this._RefreshToken();
        } else if (responseJson.message == "User successfully signed out") {
          this._BerhasilLogout();
        }
      });
  };

  _BerhasilLogout = async () => {
    try {
      await AsyncStorage.clear();
      this.props.navigation.replace("Auth");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#3C486B" }}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <View style={{ marginLeft: 5, flexDirection: "column" }}>
                <Title style={styles.title}>Ahmad Hasanudin</Title>
                <Caption style={styles.caption}>
                  RT 03 RW 05 KEL JAMBESARI
                </Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Home"
              labelStyle={{ color: "#FFF" }}
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              label="Profil"
              labelStyle={{ color: "#FFF" }}
              onPress={() => {
                this.props.navigation.navigate("Profil");
              }}
            />
            <DrawerItem
              label="Layanan"
              labelStyle={{ color: "#FFF" }}
              onPress={() => {
                this.props.navigation.navigate("Layanan");
              }}
            />
          </Drawer.Section>
        </View>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="LOGOUT"
            labelStyle={{
              color: "#FFF",
              fontSize: 15,
              fontWeight: "700",
              textAlign: "center",
              left: 15,
            }}
            // onPress={() => this._Logout()}
            onPress={() => this._BerhasilLogout()}
          />
        </Drawer.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    color: "#FFF",
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
    color: "#FFF",
  },
  drawerSection: {
    marginTop: 40,
    left: 10,
  },
  bottomDrawerSection: {
    height: 50,
    top: 4,
    backgroundColor: "#F45050",
  },
});
