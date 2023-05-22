import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  Alert,
} from "react-native";
import moment from "moment";
import "moment/locale/id";
import Modal from "react-native-modal";
import { DatePicker } from "react-native-woodpicker";
import Icon from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

import Logo from "../../assets/images.png";

const gender = ["Male", "Female"];
const golonganDarah = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const question = [
  {
    key: "Ya",
    text: "Ya",
  },
  {
    key: "Tidak",
    text: "Tidak",
  },
];

export default class TambahDataWarga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: "",
      dataAgama: [],
      dataNegara: [],
      dataProvinsi: [],
      dataKota: [],

      foto: "",
      fotoProfil: false,

      nik: "",
      jenisKelamin: "",
      golonganDarah: "",
      fileKtp: "",
      fileTtd: "",
      tanggal: "",
      lokasiLahir: "",
      dokter: "",
      provinsi: "",
      idProvinsi: "",
      kotaLahir: "",
      idKota: "",

      nama: "",
      jawabanNama: "",
      tglNama: "",
      agama: "",
      jawabanAgama: "",
      tglAgama: "",
      idAgama: "",
      fileAgama: "",
      negara: "",
      jawabanNegara: "",
      tglNegara: "",
      idNegara: "",

      aliasForm: [],
      inputDataAlias: [],

      pekerjaanForm: [],
      inputDataPekerjaan: [],
      inputTglPekerjaan: [],
      tanggalPekerjaan: [],
      tglPekerjaan: "",
      inputDetailPekerjaan: [],
    };
  }

  componentDidMount = () => {
    this.getToken();
  };

  async getToken() {
    try {
      let userData = await AsyncStorage.getItem("access_token");
      let data = JSON.parse(userData);
      this.setState({ access_token: data });
    } catch (error) {
      console.log("Something went wrong", error);
    }
    this._GetAgama();
    this._GetNegara();
    this._GetProvinsi();
  }

  _GetAgama = async () => {
    let token = this.state.access_token;
    let headers = {
      "x-access-token": token,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // let url = "http://10.0.0.151:8000/api/v1/master/religions";
    let url =
      "https://host02.birosolusi.com/edesa/public/api/v1/master/religions";

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataAgama: responseJson.data,
        });
      });
  };

  _GetNegara = async () => {
    let token = this.state.access_token;
    let headers = {
      "x-access-token": token,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // let url = "http://10.0.0.151:8000/api/v1/master/nationalities";
    let url =
      "https://host02.birosolusi.com/edesa/public/api/v1/master/nationalities";

    let body = {
      keyword: "",
      limit: 0,
    };

    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataNegara: responseJson.data,
        });
      });
  };

  _GetProvinsi = async () => {
    let token = this.state.access_token;
    let headers = {
      "x-access-token": token,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // let url = "http://10.0.0.151:8000/api/v1/wilayah/provinces";
    let url =
      "https://host02.birosolusi.com/edesa/public/api/v1/wilayah/provinces";

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataProvinsi: responseJson.data,
        });
      });
  };

  _GetKota = async () => {
    let token = this.state.access_token;
    let id = this.state.idProvinsi;

    let headers = {
      "x-access-token": token,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // let url = "http://10.0.0.151:8000/api/v1/wilayah/cities";
    let url =
      "https://host02.birosolusi.com/edesa/public/api/v1/wilayah/cities";

    let body = {
      province_id: id,
      keyword: "",
      limit: 15,
    };

    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataKota: responseJson.data,
        });
      });
  };

  renderKota() {
    if (this.state.dataKota != "") {
      return (
        <View style={styles.itemWrap}>
          <Text style={styles.textItem}>
            Kota Lahir
            <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
          </Text>
          <SelectDropdown
            data={this.state.dataKota.map((k) => k.name)}
            onSelect={this.onKotaLahirChange.bind(this)}
            defaultButtonText={"Pilih Kota"}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={() => {
              return <Icon name="chevron-down" color={"#4E4F6F"} size={18} />;
            }}
            dropdownIconPosition={"right"}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.itemWrap}>
          <Text style={styles.textItem}>
            Kota Lahir
            <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
          </Text>
          <TextInput
            style={styles.inputText}
            placeholder="Pilih Kota Lahir"
            placeholderTextColor="#777"
            editable={false}
          />
        </View>
      );
    }
  }

  cameraFoto = () => {
    launchCamera(
      {
        title: "Select Image",
        allowsEditing: false,
        maxWidth: 200,
        maxHeight: 200,
        mediaType: "photo",
        includeBase64: true,
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else {
          this.setState({ foto: response, fotoProfil: false });
        }
      },
    );
  };

  selectFileFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      //   setImage(result.assets[0].uri);
      this.setState({ foto: result.assets[0].uri, fotoProfil: false });
    }
    // launchImageLibrary(
    //     {
    //         title: 'Select Image',

    //         allowsEditing: false,
    //         quality: 0.9,
    //         maxWidth: 200,
    //         maxHeight: 200,
    //         mediaType: "photo",
    //         includeBase64: true,
    //         storageOptions: {
    //             skipBackup: true,
    //             cameraRoll: false
    //         },
    //     },
    //     (response => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else {
    //             this.setState({ foto: response, fotoProfil: false })
    //         }
    //     })
    // )
  };

  renderFileUriFoto() {
    if (this.state.foto) {
      return (
        <Image
          // source={{uri: `data:image/gif;base64,${this.state.image}`}}
          source={{
            uri:
              Platform.OS === "android"
                ? this.state.foto
                : this.state.foto.replace("file://", ""),
          }}
          style={{
            width: 130,
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
            width: 130,
            height: 140,
            borderWidth: 2,
            borderRadius: 100,
            borderColor: "#cdcdcd",
          }}
        />
      );
    }
  }

  async FileKtpPicker() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      //   setImage(result.assets[0].uri);
      this.setState({ fileKtp: result.assets[0].uri });
    }
    // launchImageLibrary(
    //     {
    //         title: 'Select Image',
    //         allowsEditing: false,
    //         quality: 0.9,
    //         maxWidth: 200,
    //         maxHeight: 200,
    //         mediaType: "photo",
    //         includeBase64: true,
    //         storageOptions: {
    //             skipBackup: true,
    //             cameraRoll: false
    //         },
    //     },
    //     (response => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else {
    //             this.setState({ fileKtp: response })
    //         }
    //     })
    // )
  }

  async FileTtdPicker() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      //   setImage(result.assets[0].uri);
      this.setState({ fileTtd: result.assets[0].uri });
    }
    // launchImageLibrary(
    //     {
    //         title: 'Select Image',
    //         allowsEditing: false,
    //         quality: 0.9,
    //         maxWidth: 200,
    //         maxHeight: 200,
    //         mediaType: "photo",
    //         includeBase64: true,
    //         storageOptions: {
    //             skipBackup: true,
    //             cameraRoll: false
    //         },
    //     },
    //     (response => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else {
    //             this.setState({ fileTtd: response })
    //         }
    //     })
    // )
  }

  async FileAgamaPicker() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      //   setImage(result.assets[0].uri);
      this.setState({ fileAgama: result.assets[0].uri });
    }
    // launchImageLibrary(
    //     {
    //         title: 'Select Image',
    //         allowsEditing: false,
    //         quality: 0.9,
    //         maxWidth: 200,
    //         maxHeight: 200,
    //         mediaType: "photo",
    //         includeBase64: true,
    //         storageOptions: {
    //             skipBackup: true,
    //             cameraRoll: false
    //         },
    //     },
    //     (response => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else {
    //             this.setState({ fileAgama: response })
    //         }
    //     })
    // )
  }

  renderFileKtp() {
    if (this.state.fileKtp != "") {
      return (
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            marginRight: 20,
            marginTop: 7,
            marginBottom: 5,
            justifyContent: "space-between",
          }}
        >
          {/* <Image
                        source={{
                            uri: Platform.OS === "android" ? this.state.fileKtp : this.state.fileKtp.replace("file://", ""),
                        }}
                        style={{
                            left: 5,
                            width: 295,
                            height: 175,
                            borderWidth: 2,
                            borderRadius: 10,
                            borderColor: '#cdcdcd',
                        }}
                    /> */}
          <Image
            source={{ uri: this.state.fileKtp }}
            style={{ width: 200, height: 200 }}
          />
          <View style={styles.dateView2}>
            <View
              style={{
                marginTop: 75,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({ fileKtp: "" });
                }}
              >
                <Icon
                  style={{ left: 15 }}
                  name="remove-circle-outline"
                  color={"#EE4A4A"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "flex-start",
            }}
          >
            <TouchableOpacity
              style={styles.fileBtn}
              onPress={this.FileKtpPicker.bind(this)}
            >
              <Text style={styles.fileText}>Pilih File</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.uploadText}>No File Selected</Text>
            </View>
          </View>
        </View>
      );
    }
  }

  renderFileTtd() {
    if (this.state.fileTtd != "") {
      return (
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            marginRight: 20,
            marginTop: 7,
            marginBottom: 5,
            justifyContent: "space-between",
          }}
        >
          {/* <Image
                        source={{
                            uri: Platform.OS === "android" ? this.state.fileTtd.uri : this.state.fileTtd.uri.replace("file://", ""),
                        }}
                        style={{
                            left: 5,
                            width: 295,
                            height: 175,
                            borderWidth: 2,
                            borderRadius: 10,
                            borderColor: '#cdcdcd',
                        }}
                    /> */}
          <Image
            source={{ uri: this.state.fileTtd }}
            style={{
              left: 5,
              width: 295,
              height: 175,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: "#cdcdcd",
            }}
          />
          <View style={styles.dateView2}>
            <View
              style={{
                marginTop: 75,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({ fileTtd: "" });
                }}
              >
                <Icon
                  style={{ left: 15 }}
                  name="remove-circle-outline"
                  color={"#EE4A4A"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "flex-start",
            }}
          >
            <TouchableOpacity
              style={styles.fileBtn}
              onPress={this.FileTtdPicker.bind(this)}
            >
              <Text style={styles.fileText}>Pilih File</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.uploadText}>No File Selected</Text>
            </View>
          </View>
        </View>
      );
    }
  }

  renderFileAgama() {
    if (this.state.fileAgama != "") {
      return (
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            marginRight: 20,
            marginTop: 7,
            marginBottom: 5,
            justifyContent: "space-between",
          }}
        >
          {/* <Image
                        source={{
                            uri: Platform.OS === "android" ? this.state.fileAgama.uri : this.state.fileAgama.uri.replace("file://", ""),
                        }}
                        style={{
                            left: 5,
                            width: 295,
                            height: 175,
                            borderWidth: 2,
                            borderRadius: 10,
                            borderColor: '#cdcdcd',
                        }}
                    /> */}
          <Image
            source={{ uri: this.state.fileAgama }}
            style={{
              left: 5,
              width: 295,
              height: 175,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: "#cdcdcd",
            }}
          />
          <View style={styles.dateView2}>
            <View
              style={{
                marginTop: 75,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({ fileAgama: "" });
                }}
              >
                <Icon
                  style={{ left: 15 }}
                  name="remove-circle-outline"
                  color={"#EE4A4A"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "flex-start",
            }}
          >
            <TouchableOpacity
              style={styles.fileBtn}
              onPress={this.FileAgamaPicker.bind(this)}
            >
              <Text style={styles.fileText}>Pilih File</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.uploadText}>No File Selected</Text>
            </View>
          </View>
        </View>
      );
    }
  }

  onNikChange = (text) => {
    if (/^\d+$/.test(text) || text === "") {
      this.setState({
        nik: text,
      });
    }
  };

  onJenisKelaminChange = (jenisKelamin) => {
    if (jenisKelamin == "Male") {
      this.setState({ jenisKelamin: "M" });
    } else {
      this.setState({ jenisKelamin: "F" });
    }
  };

  onGolonganDarahChange = (golonganDarah) => {
    this.setState({ golonganDarah });
  };

  handleTanggal = () =>
    this.state.tanggal
      ? moment.utc(this.state.tanggal).format("DD/MM/YYYY")
      : "DD/MM/YYYY";

  onTanggal = (tanggal) => {
    this.setState({ tanggal });
  };

  onLokasiLahirChange = (lokasiLahir) => {
    this.setState({ lokasiLahir });
  };

  onDokterChange = (dokter) => {
    this.setState({ dokter });
  };

  onProvinsiChange = (provinsi) => {
    setTimeout(() => {
      const data = this.state.dataProvinsi;
      const index = data.findIndex((x) => x.name === provinsi);
      this.setState({ idProvinsi: data[index].id, provinsi: provinsi });
      this._GetKota();
    }, 0);
  };

  onKotaLahirChange = (kotaLahir) => {
    setTimeout(() => {
      const data = this.state.dataKota;
      const index = data.findIndex((x) => x.name === kotaLahir);
      this.setState({ idKota: data[index].id, kotaLahir: kotaLahir });
    }, 0);
  };

  onNameChange = (nama) => {
    this.setState({ nama });
  };

  handleTanggalNama = () =>
    this.state.tglNama
      ? moment.utc(this.state.tglNama).format("DD/MM/YYYY")
      : "DD/MM/YYYY";

  onTanggalNama = (tglNama) => {
    this.setState({ tglNama });
  };

  onAgamaChange = (agama) => {
    setTimeout(() => {
      const data = this.state.dataAgama;
      const index = data.findIndex((x) => x.name === agama);
      this.setState({ idAgama: data[index].id, agama: agama });
    }, 0);
  };

  handleTanggalAgama = () =>
    this.state.tglAgama
      ? moment.utc(this.state.tglAgama).format("DD/MM/YYYY")
      : "DD/MM/YYYY";

  onTanggalAgama = (tglAgama) => {
    this.setState({ tglAgama });
  };

  onNegaraChange = (negara) => {
    setTimeout(() => {
      const data = this.state.dataNegara;
      const index = data.findIndex((x) => x.name === negara);
      this.setState({ idNegara: data[index].id, negara: negara });
    }, 0);
  };

  handleTanggalNegara = () =>
    this.state.tglNegara
      ? moment.utc(this.state.tglNegara).format("DD/MM/YYYY")
      : "DD/MM/YYYY";

  onTanggalNegara = (tglNegara) => {
    this.setState({ tglNegara });
  };

  //function to add TextInput dynamically
  addAliasForm = (index) => {
    let aliasForm = this.state.aliasForm;
    aliasForm.push(
      <View
        style={{
          flexDirection: "row",
          marginLeft: 5,
          marginRight: 20,
          marginTop: 7,
          marginBottom: 5,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.dateView2}>
          <TextInput
            style={[styles.inputText, { left: 5, width: 300 }]}
            placeholder="Masukkan Nama Alias"
            placeholderTextColor="#000"
            keyboardType="default"
            onChangeText={(text) => this.addValues(text, index)}
          />
        </View>
        <View style={styles.dateView2}>
          <View
            style={{
              marginTop: 11,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => this.removeTextInput()}>
              <Icon
                style={{ left: 15 }}
                name="remove-circle-outline"
                color={"#EE4A4A"}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>,
    );
    this.setState({ aliasForm });
  };

  removeTextInput = () => {
    let aliasForm = this.state.aliasForm;
    let inputDataAlias = this.state.inputDataAlias;
    aliasForm.pop();
    inputDataAlias.pop();
    this.setState({ aliasForm, inputDataAlias });
  };

  addValues = (text, index) => {
    let dataArray = this.state.inputDataAlias;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach((element) => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputDataAlias: dataArray,
      });
    } else {
      dataArray.push({ text: text, index: index });
      this.setState({
        inputDataAlias: dataArray,
      });
    }
  };

  getValues = () => {
    console.log("Data", this.state.inputDataAlias);
  };

  getValues2 = () => {
    console.log(
      "Data",
      this.state.inputDataPekerjaan,
      this.state.inputDetailPekerjaan,
    );
  };

  addPekerjaanForm = (index) => {
    let pekerjaanForm = this.state.pekerjaanForm;
    pekerjaanForm.push(
      <View
        style={{
          flexDirection: "row",
          marginLeft: 5,
          marginRight: 20,
          marginTop: 7,
          marginBottom: 5,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.dateView2}>
          <TextInput
            style={[styles.inputText, { marginBottom: 5, left: 5, width: 300 }]}
            placeholder="Pekerjaan / Karir..."
            placeholderTextColor="#000"
            keyboardType="default"
            onChangeText={(text) => this.addValuesPekerjaan(text, index)}
          />
          <DatePicker
            locale="id"
            onDateChange={(text) => this.addTglPekerjaan(text, index)}
            text={(text) => this.handleTanggalPekerjaan(text)}
            isNullable={false}
            maximumDate={new Date()}
            iosDisplay="compact"
            androidDisplay="default"
            style={[
              styles.datePickerStyle,
              { marginBottom: 5, left: 5, width: 300 },
            ]}
            textInputStyle={styles.dateText}
          />
          <TextInput
            style={[
              styles.inputText2,
              { marginBottom: 5, left: 5, width: 300 },
            ]}
            placeholder="Detail Pekerjaan / Karir..."
            placeholderTextColor="#000"
            multiline={true}
            keyboardType="default"
            onChangeText={(text) => this.addDetailPekerjaan(text, index)}
          />
        </View>
        <View style={styles.dateView2}>
          <View
            style={{
              marginTop: 80,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => this.removeTextInputPekerjaan()}>
              <Icon
                style={{ left: 15 }}
                name="remove-circle-outline"
                color={"#EE4A4A"}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>,
    );
    this.setState({ pekerjaanForm });
  };

  addValuesPekerjaan = (text, index) => {
    let dataArray = this.state.inputDataPekerjaan;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach((element) => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputDataPekerjaan: dataArray,
      });
    } else {
      dataArray.push({ text: text, index: index });
      this.setState({
        inputDataPekerjaan: dataArray,
      });
    }
  };

  addDetailPekerjaan = (text, index) => {
    let dataArray = this.state.inputDetailPekerjaan;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach((element) => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputDetailPekerjaan: dataArray,
      });
    } else {
      dataArray.push({ text: text, index: index });
      this.setState({
        inputDetailPekerjaan: dataArray,
      });
    }
  };

  handleTanggalPekerjaan = (text) => {
    // let data = JSON.stringify(this.state.inputTglPekerjaan)
    // const id = data.findIndex(val => val.index === index)
    console.log(text);
    if (this.state.inputTglPekerjaan == "") {
      return "DD/MM/YYYY";
    } else {
      return text;
    }
  };

  addTglPekerjaan = (text, index) => {
    let dataArray = this.state.inputTglPekerjaan;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach((element) => {
        if (element.index === index) {
          element.text = moment.utc(text).format("DD/MM/YYYY");
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputTglPekerjaan: dataArray,
        tglPekerjaan: text,
      });
    } else {
      dataArray.push({
        text: moment.utc(text).format("DD/MM/YYYY"),
        index: index,
      });
      this.setState({
        inputTglPekerjaan: dataArray,
        tglPekerjaan: text,
      });
    }
  };

  removeTextInputPekerjaan = () => {
    let pekerjaanForm = this.state.pekerjaanForm;
    let inputDataPekerjaan = this.state.inputDataPekerjaan;
    let inputTglPekerjaan = this.state.inputTglPekerjaan;
    let inputDetailPekerjaan = this.state.inputDetailPekerjaan;
    pekerjaanForm.pop();
    inputDataPekerjaan.pop();
    inputTglPekerjaan.pop();
    inputDetailPekerjaan.pop();
    this.setState({
      pekerjaanForm,
      inputDataPekerjaan,
      inputTglPekerjaan,
      inputDetailPekerjaan,
    });
  };

  handleSubmit = async () => {
    const token = this.state.access_token;

    var profile_photo;
    if (this.state.foto == "") {
      profile_photo = this.state.foto;
      alert("Foto Profil Tidak Boleh Kosong");
    } else {
      profile_photo = {
        uri:
          "data:" + this.state.foto.type + ";base64," + this.state.foto.base64,
        name: this.state.foto.fileName,
        type: this.state.foto.type,
      };
    }

    const nik = this.state.nik;
    const sex = this.state.jenisKelamin;
    const blood_type = this.state.golonganDarah;

    var ktp_photo;
    if (this.state.fileKtp == "") {
      ktp_photo = this.state.fileKtp;
    } else {
      ktp_photo = {
        uri:
          "data:" +
          this.state.fileKtp.type +
          ";base64," +
          this.state.fileKtp.base64,
        name: this.state.fileKtp.fileName,
        type: this.state.fileKtp.type,
      };
    }

    var signature_photo;
    if (this.state.fileTtd == "") {
      signature_photo = this.state.fileTtd;
    } else {
      signature_photo = {
        uri:
          "data:" +
          this.state.fileTtd.type +
          ";base64," +
          this.state.fileTtd.base64,
        name: this.state.fileTtd.fileName,
        type: this.state.fileTtd.type,
      };
    }

    const birth_date = moment.utc(this.state.tanggal).format("DD/MM/YYYY");
    const birth_location = this.state.lokasiLahir;
    const birth_obgyne = this.state.dokter;
    const birth_place = this.state.idKota;
    const name = this.state.nama;

    var name_since;
    if (this.state.jawabanNama == "" || this.state.jawabanNama == "Ya") {
      name_since = "";
    } else {
      name_since = moment.utc(this.state.tglNama).format("DD/MM/YYYY");
    }

    const religion = this.state.idAgama;

    var religion_since;
    if (this.state.jawabanAgama == "" || this.state.jawabanAgama == "Ya") {
      religion_since = "";
    } else {
      religion_since = moment.utc(this.state.tglAgama).format("DD/MM/YYYY");
    }

    var religion_document;
    if (this.state.fileAgama == "") {
      religion_document = this.state.fileAgama;
    } else {
      religion_document = {
        uri:
          "data:" +
          this.state.fileAgama.type +
          ";base64," +
          this.state.fileAgama.base64,
        name: this.state.fileAgama.fileName,
        type: this.state.fileAgama.type,
      };
    }

    const nationality = this.state.idNegara;

    var nationality_since;
    if (this.state.jawabanNegara == "" || this.state.jawabanNegara == "Ya") {
      nationality_since = "";
    } else {
      nationality_since = moment.utc(this.state.tglNegara).format("DD/MM/YYYY");
    }

    var name_aliases;
    if (this.state.inputDataAlias == "") {
      name_aliases = this.state.inputDataAlias;
    } else {
      name_aliases = this.state.inputDataAlias.map((x) => x.text);
    }

    var career_value;
    if (this.state.inputDataPekerjaan == "") {
      career_value = this.state.inputDataPekerjaan;
    } else {
      career_value = this.state.inputDataPekerjaan.map((p) => p.text);
    }

    var career_detail;
    if (this.state.inputDetailPekerjaan == "") {
      career_detail = this.state.inputDetailPekerjaan;
    } else {
      career_detail = this.state.inputDetailPekerjaan.map((d) => d.text);
    }

    // const career_since

    const formData = new FormData();
    formData.append("profile_photo", profile_photo);
    formData.append("nik", nik);
    formData.append("sex", sex);
    formData.append("blood_type", blood_type);
    formData.append("ktp_photo", ktp_photo);
    formData.append("signature_photo", signature_photo);
    formData.append("birth_date", birth_date);
    formData.append("birth_location", birth_location);
    formData.append("birth_obgyne", birth_obgyne);
    formData.append("birth_place", birth_place);
    formData.append("name", name);
    formData.append("name_since", name_since);
    formData.append("religion", religion);
    formData.append("religion_since", religion_since);
    formData.append("religion_document", religion_document);
    formData.append("nationality", nationality);
    formData.append("nationality_since", nationality_since);
    formData.append("name_aliases", name_aliases);
    formData.append("career_value", career_value);
    formData.append("career_detail", career_detail);

    console.log(JSON.stringify(formData));

    let headers = {
      "x-access-token": token,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    };

    let url = "host02.birosolusi.com/edesa/public/api/v1/penduduks";

    fetch(url, {
      method: "POST",
      headers,
      body: formData,
    })
      .then((response) => {
        if (response.status == 201) {
          Alert.alert(
            "Delete Riwayat",
            "Data Gagal Dihapus",
            [
              {
                text: "OK",
                onPress: () => this.props.navigation.replace("Dashboard"),
              },
            ],
            { cancelable: false },
          );
        } else {
          alert("Tambah Data Gagal");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={{ marginTop: 10, marginBottom: 10, padding: 10 }}></View>
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.picture}>
              <View style={{ marginTop: 5 }}>{this.renderFileUriFoto()}</View>
              <View
                style={{
                  position: "absolute",
                  marginTop: 100,
                  left: 100,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#CCEAE7",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  activeOpacity={1}
                  onPress={() => {
                    this.setState({ fotoProfil: true });
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon name="camera-outline" size={24} color="#4DB6AC" />
                  </View>
                </TouchableOpacity>
                <Modal
                  backdropOpacity={0.5}
                  isVisible={this.state.fotoProfil}
                  onBackdropPress={() => {
                    this.setState({ fotoProfil: false });
                  }}
                  style={styles.contentView}
                >
                  <View style={styles.options}>
                    <TouchableOpacity
                      style={styles.codeBtn}
                      onPress={this.cameraFoto}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Icon name="camera-outline" size={24} color="#000" />
                        <Text style={styles.codeText}>Camera</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.codeBtn}
                      onPress={this.selectFileFoto}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Icon name="images-outline" size={24} color="#000" />
                        <Text style={styles.codeText}>Pilih File</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
            </View>
            <View style={styles.viewList}>
              <View style={styles.textWrap}>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    NIK
                    <Text style={styles.ketText}> (Nomor KTP)</Text>
                    <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                  </Text>
                  <TextInput
                    style={styles.inputText}
                    value={this.state.nik}
                    onChangeText={this.onNikChange}
                    maxLength={16}
                    keyboardType="phone-pad"
                    placeholder="Masukkan NIK"
                    placeholderTextColor="#000"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 5,
                    marginRight: 20,
                    marginTop: 7,
                    marginBottom: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.dateView2}>
                    <Text style={styles.textItem}>
                      Jenis Kelamin
                      <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                    </Text>
                    <SelectDropdown
                      data={gender}
                      onSelect={this.onJenisKelaminChange.bind(this)}
                      defaultButtonText={"Pilih Jenis Kelamin"}
                      buttonTextAfterSelection={(selectedItem) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item) => {
                        return item;
                      }}
                      buttonStyle={styles.dropdownBtnStyle2}
                      buttonTextStyle={styles.dropdownBtnTxtStyle}
                      renderDropdownIcon={() => {
                        return (
                          <Icon
                            name="chevron-down"
                            color={"#4E4F6F"}
                            size={18}
                          />
                        );
                      }}
                      dropdownIconPosition={"right"}
                      rowStyle={styles.dropdownRowStyle}
                      rowTextStyle={styles.dropdownRowTxtStyle}
                    />
                  </View>
                  <View style={styles.dateView2}>
                    <Text style={styles.textItem}>
                      Golongan Darah
                      <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                    </Text>
                    <SelectDropdown
                      data={golonganDarah}
                      onSelect={this.onGolonganDarahChange.bind(this)}
                      defaultButtonText={"Pilih Golongan Darah"}
                      buttonTextAfterSelection={(selectedItem) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item) => {
                        return item;
                      }}
                      buttonStyle={styles.dropdownBtnStyle2}
                      buttonTextStyle={styles.dropdownBtnTxtStyle}
                      renderDropdownIcon={() => {
                        return (
                          <Icon
                            name="chevron-down"
                            color={"#4E4F6F"}
                            size={18}
                          />
                        );
                      }}
                      dropdownIconPosition={"right"}
                      rowStyle={styles.dropdownRowStyle}
                      rowTextStyle={styles.dropdownRowTxtStyle}
                    />
                  </View>
                </View>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    Upload Foto KTP
                    <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                  </Text>
                  {this.renderFileKtp()}
                  <Text style={styles.ketFileText}>
                    File yang diupload harus dalam bentuk/format (jpg, png,
                    jpeg) maksimal 2MB
                  </Text>
                </View>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    Upload Foto Tanda Tangan
                    <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                  </Text>
                  {this.renderFileTtd()}
                  <Text style={styles.ketFileText}>
                    File yang diupload harus dalam bentuk/format (jpg, png,
                    jpeg) maksimal 2MB
                  </Text>
                </View>

                <View style={styles.pageContainer}></View>
                <View
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#4E4F6F",
                      textAlign: "center",
                    }}
                  >
                    Periode Hidup
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 5,
                    marginRight: 20,
                    marginTop: 7,
                    marginBottom: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.dateView2}>
                    <Text style={styles.textItem}>
                      Tanggal Lahir
                      <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                    </Text>
                    <DatePicker
                      locale="id"
                      onDateChange={this.onTanggal}
                      value={this.state.tanggal}
                      text={this.handleTanggal()}
                      isNullable={false}
                      maximumDate={new Date()}
                      iosDisplay="compact"
                      androidDisplay="default"
                      style={[styles.datePickerStyle, { left: 7, width: 160 }]}
                      textInputStyle={styles.dateText}
                    />
                  </View>
                  <View style={styles.dateView2}>
                    <Text style={styles.textItem}>
                      Tempat Lahir
                      <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                    </Text>
                    <TextInput
                      style={[styles.inputText, { left: 7, width: 160 }]}
                      value={this.state.lokasiLahir}
                      keyboardType="default"
                      onChangeText={this.onLokasiLahirChange}
                      placeholder="Masukkan Tempat Lahir"
                      placeholderTextColor="#000"
                    />
                  </View>
                </View>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    Nama Dokter
                    <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                  </Text>
                  <TextInput
                    style={styles.inputText}
                    value={this.state.dokter}
                    onChangeText={this.onDokterChange}
                    keyboardType="default"
                    placeholder="Masukkan Nama Dokter"
                    placeholderTextColor="#000"
                  />
                </View>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    Provinsi
                    <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                  </Text>
                  <SelectDropdown
                    data={this.state.dataProvinsi.map((d) => d.name)}
                    onSelect={this.onProvinsiChange.bind(this)}
                    defaultButtonText={"Pilih Provinsi"}
                    buttonTextAfterSelection={(selectedItem) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item) => {
                      return item;
                    }}
                    buttonStyle={styles.dropdownBtnStyle}
                    buttonTextStyle={styles.dropdownBtnTxtStyle}
                    renderDropdownIcon={() => {
                      return (
                        <Icon name="chevron-down" color={"#4E4F6F"} size={18} />
                      );
                    }}
                    dropdownIconPosition={"right"}
                    rowStyle={styles.dropdownRowStyle}
                    rowTextStyle={styles.dropdownRowTxtStyle}
                  />
                </View>
                {this.renderKota()}

                <View style={styles.pageContainer}></View>
                <View
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#4E4F6F",
                      textAlign: "center",
                    }}
                  >
                    Data Diri
                  </Text>
                </View>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    Nama
                    <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                  </Text>
                  <TextInput
                    style={styles.inputText}
                    value={this.state.nama}
                    keyboardType="default"
                    onChangeText={this.onNameChange}
                    placeholder="Masukkan Nama Lengkap"
                    placeholderTextColor="#000"
                  />
                </View>
                <View style={[styles.itemWrap, { marginBottom: 30 }]}>
                  <Text style={styles.textItem}>Sejak Lahir?</Text>
                  {question.map((res) => {
                    return (
                      <View key={res.key} style={styles.container2}>
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <TouchableOpacity
                            style={styles.radioCircle}
                            onPress={() => {
                              this.setState({
                                jawabanNama: res.key,
                              });
                            }}
                          >
                            {this.state.jawabanNama === res.key && (
                              <View style={styles.selectedRb} />
                            )}
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            paddingHorizontal: 7,
                            paddingVertical: 1,
                            alignSelf: "center",
                            marginLeft: 5,
                            borderRadius: 5,
                          }}
                        >
                          <Text style={styles.radioText}>{res.text}</Text>
                        </View>
                      </View>
                    );
                  })}
                  <View
                    style={{ position: "absolute", marginLeft: 95, top: 23 }}
                  >
                    <DatePicker
                      locale="id"
                      onDateChange={this.onTanggalNama}
                      value={this.state.tglNama}
                      text={this.handleTanggalNama()}
                      isNullable={false}
                      maximumDate={new Date()}
                      iosDisplay="compact"
                      androidDisplay="default"
                      style={[
                        styles.datePickerStyle,
                        { top: 30, width: widths },
                      ]}
                      textInputStyle={styles.dateText}
                    />
                    <Text style={[styles.ketText, { left: 2, top: 35 }]}>
                      Isikan sejak kapan jika memilih Tidak
                    </Text>
                  </View>
                </View>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    Agama
                    <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                  </Text>
                  <SelectDropdown
                    data={this.state.dataAgama.map((a) => a.name)}
                    onSelect={this.onAgamaChange.bind(this)}
                    defaultButtonText={"Pilih Agama"}
                    buttonTextAfterSelection={(selectedItem) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item) => {
                      return item;
                    }}
                    buttonStyle={styles.dropdownBtnStyle}
                    buttonTextStyle={styles.dropdownBtnTxtStyle}
                    renderDropdownIcon={() => {
                      return (
                        <Icon name="chevron-down" color={"#4E4F6F"} size={18} />
                      );
                    }}
                    dropdownIconPosition={"right"}
                    rowStyle={styles.dropdownRowStyle}
                    rowTextStyle={styles.dropdownRowTxtStyle}
                  />
                </View>
                <View style={[styles.itemWrap, { marginBottom: 30 }]}>
                  <Text style={styles.textItem}>Sejak Lahir?</Text>
                  {question.map((res) => {
                    return (
                      <View key={res.key} style={styles.container2}>
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <TouchableOpacity
                            style={styles.radioCircle}
                            onPress={() => {
                              this.setState({
                                jawabanAgama: res.key,
                              });
                            }}
                          >
                            {this.state.jawabanAgama === res.key && (
                              <View style={styles.selectedRb} />
                            )}
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            paddingHorizontal: 7,
                            paddingVertical: 1,
                            alignSelf: "center",
                            marginLeft: 5,
                            borderRadius: 5,
                          }}
                        >
                          <Text style={styles.radioText}>{res.text}</Text>
                        </View>
                      </View>
                    );
                  })}
                  <View
                    style={{ position: "absolute", marginLeft: 95, top: 23 }}
                  >
                    <DatePicker
                      locale="id"
                      onDateChange={this.onTanggalAgama}
                      value={this.state.tglAgama}
                      text={this.handleTanggalAgama()}
                      isNullable={false}
                      maximumDate={new Date()}
                      iosDisplay="compact"
                      androidDisplay="default"
                      style={[
                        styles.datePickerStyle,
                        { top: 30, width: widths },
                      ]}
                      textInputStyle={styles.dateText}
                    />
                    <Text style={[styles.ketText, { left: 2, top: 35 }]}>
                      Isikan sejak kapan jika memilih Tidak
                    </Text>
                  </View>
                </View>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    Upload Berkas
                    <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                  </Text>
                  {this.renderFileAgama()}
                  <Text style={styles.ketFileText}>
                    File yang diupload harus dalam bentuk/format (jpg, png,
                    jpeg) maksimal 2MB
                  </Text>
                </View>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    Kewarganegaraan
                    <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                  </Text>
                  <SelectDropdown
                    // data={negara}
                    data={this.state.dataNegara.map((n) => n.name)}
                    onSelect={this.onNegaraChange.bind(this)}
                    defaultButtonText={"Pilih Negara"}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={styles.dropdownBtnStyle}
                    buttonTextStyle={styles.dropdownBtnTxtStyle}
                    renderDropdownIcon={() => {
                      return (
                        <Icon name="chevron-down" color={"#4E4F6F"} size={18} />
                      );
                    }}
                    dropdownIconPosition={"right"}
                    rowStyle={styles.dropdownRowStyle}
                    rowTextStyle={styles.dropdownRowTxtStyle}
                    selectedRowStyle={styles.dropdown1SelectedRowStyle}
                  />
                </View>
                <View style={[styles.itemWrap, { marginBottom: 30 }]}>
                  <Text style={styles.textItem}>Sejak Lahir?</Text>
                  {question.map((res) => {
                    return (
                      <View key={res.key} style={styles.container2}>
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <TouchableOpacity
                            style={styles.radioCircle}
                            onPress={() => {
                              this.setState({
                                jawabanNegara: res.key,
                              });
                            }}
                          >
                            {this.state.jawabanNegara === res.key && (
                              <View style={styles.selectedRb} />
                            )}
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            paddingHorizontal: 7,
                            paddingVertical: 1,
                            alignSelf: "center",
                            marginLeft: 5,
                            borderRadius: 5,
                          }}
                        >
                          <Text style={styles.radioText}>{res.text}</Text>
                        </View>
                      </View>
                    );
                  })}
                  <View
                    style={{ position: "absolute", marginLeft: 95, top: 23 }}
                  >
                    <DatePicker
                      locale="id"
                      onDateChange={this.onTanggalNegara}
                      value={this.state.tglNegara}
                      text={this.handleTanggalNegara()}
                      isNullable={false}
                      maximumDate={new Date()}
                      iosDisplay="compact"
                      androidDisplay="default"
                      style={[
                        styles.datePickerStyle,
                        { top: 30, width: widths },
                      ]}
                      textInputStyle={styles.dateText}
                    />
                    <Text style={[styles.ketText, { left: 2, top: 35 }]}>
                      Isikan sejak kapan jika memilih Tidak
                    </Text>
                  </View>
                </View>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    Alias
                    <Text style={styles.ketText}>
                      {" "}
                      (Kosongkan jika tidak memiliki nama alias)
                    </Text>
                    <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      justifyContent: "flex-start",
                    }}
                  >
                    <TouchableOpacity
                      style={[styles.addBtn, { width: "35%" }]}
                      onPress={() =>
                        this.addAliasForm(this.state.aliasForm.length)
                      }
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Icon
                          style={{ right: 5 }}
                          name="add-outline"
                          color={"#FFF"}
                          size={16}
                        />
                        <Text style={styles.addText}>Tambah Alias</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {this.state.aliasForm.map((value, key) => {
                    return <View key={key}>{value}</View>;
                  })}
                </View>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    Pekerjaan / Karir
                    <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      justifyContent: "flex-start",
                    }}
                  >
                    <TouchableOpacity
                      style={[styles.addBtn, { width: "45%" }]}
                      onPress={() =>
                        this.addPekerjaanForm(this.state.pekerjaanForm.length)
                      }
                    >
                      {/* onPress={() => {}}> */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Icon
                          style={{ right: 5 }}
                          name="add-outline"
                          color={"#FFF"}
                          size={16}
                        />
                        <Text style={styles.addText}>Tambah Pekerjaan</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {this.state.pekerjaanForm.map((value, key) => {
                    return <View key={key}>{value}</View>;
                  })}
                  {/* <DatePicker
                                        locale="id"
                                        onDateChange={this.onTanggalPekerjaan}
                                        text={this.handleTanggalPekerjaan}
                                        isNullable={false}
                                        maximumDate={new Date()}
                                        iosDisplay="compact"
                                        androidDisplay="default"
                                        style={[styles.datePickerStyle,{marginBottom:5,left:5,width:300}]}
                                        textInputStyle={styles.dateText}
                                    /> */}
                </View>
              </View>
            </View>
          </ScrollView>
          <View>
            <TouchableOpacity
              style={styles.footerBtn}
              activeOpacity={0.5}
              onPress={() => this.handleSubmit()}
            >
              <Text style={styles.footerText}>Simpan Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const widths = Platform.OS === "ios" ? "128%" : "138%";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EE4A4A",
  },
  pageContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: "95%",
    height: 4,
    backgroundColor: "#4E4F6F",
    marginTop: 15,
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
  picture: {
    padding: 5,
    alignSelf: "center",
  },
  options: {
    backgroundColor: "white",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  codeBtn: {
    width: "75%",
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderColor: "#cdcdcd",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  codeText: {
    fontSize: 15,
    textAlign: "center",
    left: 10,
    ...Platform.select({
      ios: {
        top: 5,
      },
      android: {
        top: 3,
      },
    }),
  },
  contentView: {
    justifyContent: "flex-end",
    margin: 0,
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
    padding: 5,
  },
  viewHolder: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textItem: {
    padding: 5,
    lineHeight: 20,
    fontWeight: "700",
    fontSize: 14,
    color: "#000",
    marginLeft: 5,
  },
  dateView: {
    width: "100%",
    backgroundColor: "transparent",
    height: 45,
    justifyContent: "center",
    padding: 10,
  },
  datePickerStyle: {
    marginTop: 5,
    paddingLeft: 10,
    height: 45,
    color: "#000",
    borderWidth: 1.5,
    borderColor: "#cdcdcd",
    borderRadius: 10,
  },
  dateText: {
    fontSize: 14,
  },
  dropdownBtnStyle: {
    marginTop: 5,
    width: "96%",
    alignSelf: "center",
    height: 45,
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "#cdcdcd",
    borderRadius: 10,
  },
  dropdownBtnStyle2: {
    marginTop: 5,
    width: 160,
    left: 7,
    alignSelf: "center",
    height: 45,
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "#cdcdcd",
    borderRadius: 10,
  },
  dropdownBtnTxtStyle: { left: 6, textAlign: "left", fontSize: 14 },
  dropdownRowStyle: {
    paddingLeft: 5,
    backgroundColor: "#FFF",
    borderBottomColor: "#cdcdcd",
  },
  dropdownRowTxtStyle: { textAlign: "left", fontSize: 14 },
  dropdown1SelectedRowStyle: { backgroundColor: "#FFF" },
  dropdown1searchInputStyleStyle: {
    backgroundColor: "#FFF",
  },
  inputText: {
    alignSelf: "center",
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    width: "96%",
    height: 45,
    color: "#000",
    borderWidth: 1.5,
    borderColor: "#cdcdcd",
    borderRadius: 10,
  },
  inputText2: {
    alignSelf: "center",
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    width: "96%",
    height: 80,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "#cdcdcd",
    textAlignVertical: "top",
    lineHeight: 20,
  },
  container2: {
    padding: 5,
    paddingLeft: 15,
    flexDirection: "row",
  },
  radioText: {
    fontSize: 13,
    color: "#000",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#cdcdcd",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: "#4E4F6F",
  },
  ketText: {
    fontSize: 12,
    color: "#777",
    fontStyle: "italic",
  },
  ketFileText: {
    lineHeight: 17,
    marginTop: 5,
    marginLeft: 10,
    fontSize: 11,
    color: "#777",
    textAlign: "justify",
    fontStyle: "italic",
  },
  hapusFile: {
    left: 5,
    ...Platform.select({
      ios: {
        top: 3,
      },
      android: {
        top: 4,
      },
    }),
  },
  uploadText: {
    color: "#000",
    fontSize: 12,
    top: 7,
    paddingLeft: 7,
  },
  uploadText2: {
    color: "#000",
    fontSize: 12,
    marginRight: 95,
    maxWidth: "63%",
    lineHeight: 17,
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
  addBtn: {
    marginLeft: 10,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#4E4F6F",
    backgroundColor: "#4E4F6F",
  },
  addText: {
    color: "#FFF",
    fontSize: 14,
  },
  footerBtn: {
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4E4F6F",
  },
  footerText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
