import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo from "../../assets/images.png";

export default class DetailWarga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      sex: this.props.route.params.sex,
      access_token: "",
      data: [],
      dataCareer: [],
      dataName: [],
      dataName2: [],
      dataNation: [],
      dataReligion: [],
      religionFile: [],
      dataLife: [],
      dataKotaLahir: [],
      dataFile: [],
      fileKtp: false,
      fileTtd: false,
      fileAgama: false,
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
      this._GetDataWarga();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  _GetDataWarga = async () => {
    let token = this.state.access_token;
    let id = this.state.id;
    let headers = {
      "x-access-token": token,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // let url = "http://10.0.0.151:8000/api/v1/penduduks/"+id;
    let url =
      "https://host02.birosolusi.com/edesa/public/api/v1/penduduks/" + id;

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
          dataCareer: responseJson.data.career,
          dataName: responseJson.data.legal_name,
          dataName2: responseJson.data.alias_name,
          dataNation: responseJson.data.nationality.value,
          dataReligion: responseJson.data.religion.value,
          religionFile: responseJson.data.religion.document,
          dataLife: responseJson.life_period.birth,
          dataKotaLahir: responseJson.life_period.birth.region,
          dataFile: responseJson.data.file,
        });
        console.log(responseJson.data.religion);
      });
  };

  showAliasName = () => {
    if (this.state.dataName2 == "") {
      return (
        <View style={styles.userDetail}>
          <Text style={styles.judul}>Alias</Text>
          <Text style={styles.isi}>-</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.userDetail}>
          <Text style={styles.judul}>Alias</Text>
          <View style={{ flexDirection: "column" }}>
            {this.state.dataName2.map((x, k) => (
              <Text key={k} style={styles.isi}>
                {x}
              </Text>
            ))}
          </View>
        </View>
      );
    }
  };

  ShowPekerjaan = () => {
    if (this.state.dataCareer == "") {
      return (
        <View>
          <View style={styles.userBg}>
            <View style={styles.menuItem}>
              <Icon name="briefcase-outline" size={20} />
              <Text style={styles.menuItemText}>Pekerjaan/Karir</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.bgText}>-</Text>
            </View>
          </View>
          <View style={styles.userBg}>
            <View style={styles.menuItem}>
              <Icon name="eyedrop-outline" size={20} />
              <Text style={styles.menuItemText}>Detail Pekerjaan</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.bgText}>-</Text>
            </View>
          </View>
          <View style={styles.userBg}>
            <View style={styles.menuItem}>
              <Icon name="time-outline" size={20} />
              <Text style={styles.menuItemText}>Tanggal Mulai Bekerja</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.bgText}>-</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.userBg}>
            <View style={styles.menuItem}>
              <Icon name="briefcase-outline" size={20} />
              <Text style={styles.menuItemText}>Pekerjaan/Karir</Text>
            </View>
            {this.state.dataCareer.map((a, b) => (
              <View key={b} style={styles.menuItem}>
                <Text style={styles.bgText}>{a.as}</Text>
              </View>
            ))}
          </View>
          <View style={styles.userBg}>
            <View style={styles.menuItem}>
              <Icon name="eyedrop-outline" size={20} />
              <Text style={styles.menuItemText}>Detail Pekerjaan</Text>
            </View>
            {this.state.dataCareer.map((c, d) => (
              <View key={d} style={styles.menuItem}>
                <Text style={styles.bgText}>{c.detail}</Text>
              </View>
            ))}
          </View>
          <View style={styles.userBg}>
            <View style={styles.menuItem}>
              <Icon name="time-outline" size={20} />
              <Text style={styles.menuItemText}>Tanggal Mulai Bekerja</Text>
            </View>
            {this.state.dataCareer.map((e, f) => (
              <View key={f} style={styles.menuItem}>
                <Text style={styles.bgText}>{e.since}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    }
  };

  showKtp = () => {
    if (this.state.dataFile != "") {
      return;
    } else {
      return;
    }
  };

  renderFileFoto() {
    if (this.state.datafile != "") {
      return (
        <Image
          source={{ uri: this.state.dataFile.profile }}
          style={{
            width: 140,
            height: 140,
            borderWidth: 2,
            borderRadius: 100,
            borderColor: "#cdcdcd",
          }}
        />
      );
    } else {
      return (
        <Image
          source={Logo}
          style={{
            width: 140,
            height: 140,
            borderWidth: 2,
            borderRadius: 100,
            borderColor: "#cdcdcd",
          }}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={{ marginTop: 10, marginBottom: 10, padding: 10 }}></View>
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.userInfoSection}>
              <View style={{ alignItems: "center", alignSelf: "center" }}>
                {this.renderFileFoto()}
                <View>
                  <Text
                    style={[
                      styles.title,
                      {
                        marginTop: 10,
                        textAlign: "center",
                        marginBottom: 5,
                      },
                    ]}
                  >
                    {this.state.dataName.value}
                  </Text>
                  <Text
                    style={[
                      styles.caption,
                      {
                        textAlign: "center",
                        marginBottom: 15,
                      },
                    ]}
                  >
                    {this.state.data.nik}
                  </Text>
                </View>
              </View>
              <View style={styles.userDetail}>
                <Text style={styles.judul}>Jenis Kelamin</Text>
                <Text style={styles.isi}>{this.state.sex}</Text>
              </View>
              <View style={styles.userDetail}>
                <Text style={styles.judul}>Tanggal Lahir</Text>
                <Text style={styles.isi}>{this.state.dataLife.time}</Text>
              </View>
              <View style={styles.userDetail}>
                <Text style={styles.judul}>Kota Lahir</Text>
                <Text style={styles.isi2}>{this.state.dataKotaLahir.text}</Text>
              </View>
              <View style={styles.userDetail}>
                <Text style={styles.judul}>Tempat Lahir</Text>
                <Text style={styles.isi}>{this.state.dataLife.location}</Text>
              </View>
              <View style={styles.userDetail}>
                <Text style={styles.judul}>Obgyne</Text>
                <Text style={styles.isi}>{this.state.dataLife.obgyne}</Text>
              </View>
              <View style={styles.userDetail}>
                <Text style={styles.judul}>Agama</Text>
                <Text style={styles.isi}>{this.state.dataReligion.text}</Text>
              </View>
              {this.showAliasName()}
              <View style={styles.userDetail}>
                <Text style={styles.judul}>Kewarganegaraan</Text>
                <Text style={styles.isi}>{this.state.dataNation.text}</Text>
              </View>
              <View style={styles.userDetail}>
                <Text style={styles.judul}>Golongan Darah</Text>
                <Text style={styles.isi}>{this.state.data.bloodtype}</Text>
              </View>
              <View style={styles.search}>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() =>
                    this.props.navigation.navigate("Edit Data Warga")
                  }
                >
                  <Text style={styles.loginText}>Edit Data</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.userInfoSection2}>{this.ShowPekerjaan()}</View>
            <View style={styles.userInfoSection3}>
              <View style={styles.itemWrap}>
                <Text style={styles.textItem}>File KTP</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "flex-start",
                  }}
                >
                  <TouchableOpacity
                    style={styles.fileBtn}
                    onPress={() => {
                      this.setState({ fileKtp: true });
                    }}
                  >
                    <Text style={styles.fileText}>Show File</Text>
                  </TouchableOpacity>
                  <Modal
                    backdropOpacity={0.5}
                    isVisible={this.state.fileKtp}
                    onBackdropPress={() => {
                      this.setState({ fileKtp: false });
                    }}
                    style={styles.contentView}
                  >
                    <View style={styles.options}>
                      <Image
                        source={{ uri: this.state.dataFile.ktp }}
                        style={{
                          width: 350,
                          height: 220,
                          borderWidth: 2,
                          borderColor: "#cdcdcd",
                          borderRadius: 25,
                          resizeMode: "cover",
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          marginTop: 10,
                          backgroundColor: "#4E4F6F",
                          borderRadius: 7,
                          height: 30,
                          width: 70,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={() => {
                          this.setState({ fileKtp: false });
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 15,
                          }}
                        >
                          Tutup
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                </View>
              </View>
              <View style={styles.itemWrap}>
                <Text style={styles.textItem}>File Tanda Tangan</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "flex-start",
                  }}
                >
                  <TouchableOpacity
                    style={styles.fileBtn}
                    onPress={() => {
                      this.setState({ fileTtd: true });
                    }}
                  >
                    <Text style={styles.fileText}>Show File</Text>
                  </TouchableOpacity>
                  <Modal
                    backdropOpacity={0.5}
                    isVisible={this.state.fileTtd}
                    onBackdropPress={() => {
                      this.setState({ fileTtd: false });
                    }}
                    style={styles.contentView}
                  >
                    <View style={styles.options}>
                      <Image
                        source={{ uri: this.state.dataFile.signature }}
                        style={{
                          width: 350,
                          height: 220,
                          borderWidth: 2,
                          borderRadius: 25,
                          borderColor: "#cdcdcd",
                          backgroundColor: "#fff",
                          resizeMode: "cover",
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          marginTop: 10,
                          backgroundColor: "#4E4F6F",
                          borderRadius: 7,
                          height: 30,
                          width: 70,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={() => {
                          this.setState({ fileTtd: false });
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 15,
                          }}
                        >
                          Tutup
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                </View>
              </View>
              <View style={styles.itemWrap}>
                <Text style={styles.textItem}>File Agama</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "flex-start",
                  }}
                >
                  <TouchableOpacity
                    style={styles.fileBtn}
                    onPress={() => {
                      this.setState({ fileAgama: true });
                    }}
                  >
                    <Text style={styles.fileText}>Show File</Text>
                  </TouchableOpacity>
                  <Modal
                    backdropOpacity={0.5}
                    isVisible={this.state.fileAgama}
                    onBackdropPress={() => {
                      this.setState({ fileAgama: false });
                    }}
                    style={styles.contentView}
                  >
                    <View style={styles.options}>
                      <Image
                        source={{
                          uri:
                            "http://10.0.0.151:8000/" + this.state.religionFile,
                        }}
                        style={{
                          width: 350,
                          height: 220,
                          borderWidth: 2,
                          borderRadius: 25,
                          borderColor: "#cdcdcd",
                          backgroundColor: "#fff",
                          resizeMode: "cover",
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          marginTop: 10,
                          backgroundColor: "#4E4F6F",
                          borderRadius: 7,
                          height: 30,
                          width: 70,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={() => {
                          this.setState({ fileAgama: false });
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 15,
                          }}
                        >
                          Tutup
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                </View>
              </View>
            </View>
          </ScrollView>
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
  header: {
    backgroundColor: "#FFF",
    height: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  content: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  viewList: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textWrap: {
    flex: 1,
    flexDirection: "column",
  },
  itemWrap: {
    padding: 7,
  },
  textItem: {
    padding: 5,
    fontWeight: "700",
    fontSize: 14,
    color: "#000",
    marginLeft: 5,
  },
  ketText: {
    lineHeight: 20,
    marginLeft: 10,
    fontSize: 13,
    color: "#777",
    textAlign: "left",
  },
  userInfoSection: {
    marginTop: 5,
    borderRadius: 10,
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  userInfoSection2: {
    marginTop: 5,
    borderTopWidth: 3,
    borderTopColor: "#4E4F6F",
    borderRadius: 10,
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  userInfoSection3: {
    marginTop: 5,
    borderTopWidth: 3,
    borderTopColor: "#4E4F6F",
    borderRadius: 10,
    paddingHorizontal: 5,
    marginBottom: 45,
  },
  userDetail: {
    flex: 1,
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#CDCDCD",
  },
  title: {
    fontSize: 17,
  },
  caption: {
    fontSize: 14,
    color: "#777",
  },
  judul: {
    fontSize: 14,
    fontWeight: "bold",
  },
  isi: {
    lineHeight: 20,
    fontSize: 14,
    color: "#777",
    textAlign: "right",
    maxWidth: "100%",
  },
  isi2: {
    lineHeight: 20,
    fontSize: 14,
    color: "#777",
    textAlign: "right",
    maxWidth: "65%",
  },
  search: {
    alignContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#FFF",
    fontSize: 15,
  },
  loginBtn: {
    width: "97%",
    backgroundColor: "#4E4F6F",
    borderRadius: 7,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  userBg: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CDCDCD",
  },
  menuItem: {
    flexDirection: "row",
    padding: 3,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "bold",
  },
  bgText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#777",
    textAlign: "justify",
  },
  fileBtn: {
    width: "30%",
    marginLeft: 10,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#cdcdcd",
  },
  fileText: {
    color: "#000",
    fontSize: 14,
  },
  contentView: {
    justifyContent: "center",
  },
  options: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
