import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Animated,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
  Dimensions,
  UIManager,
} from "react-native";
import moment from "moment";
import { DatePicker } from "react-native-woodpicker";
import Icon from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Item from "../../component/AliasItem";

const gender = ["Male", "Female"];
const golonganDarah = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const negara = ["Indonesia", "Malaysia"];

const name_since = [
  {
    key: "Ya",
    text: "Ya",
  },
  {
    key: "Tidak",
    text: "Tidak",
  },
];

export default class EditWarga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: "",
      dataAgama: [],

      nik: "",
      jenisKelamin: "",
      golonganDarah: "",
      tanggal: "",
      lokasiLahir: "",
      kotaLahir: "",
      dokter: "",

      nama: "",
      jawabanNama: "",
      agama: "",
      jawabanAgama: "",
      negara: "",
      jawabanNegara: "",
      file: 0,

      alias: "",
      valueArray: [],
      disabled: false,
    };
    this.addNewEle = false;
    this.index = 0;
    this.name = "";
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    try {
      let userData = await AsyncStorage.getItem("access_token");
      let data = JSON.parse(userData);
      this.setState({ access_token: data });
      this._GetAgama();
      // this._GetNegara()
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  _GetAgama = async () => {
    let token = this.state.access_token;
    let headers = {
      "x-access-token": token,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    let url =
      "https://host02.birosolusi.com/edesa/public/api/v1/master/religions";

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const options = responseJson.data.map((d) => d.name);
        this.setState({
          dataAgama: options,
        });
      });
  };

  onNikChange = (text) => {
    if (/^\d+$/.test(text) || text === "") {
      this.setState({
        nik: text,
      });
    }
  };

  onJenisKelaminChange = (jenisKelamin) => {
    this.setState({ jenisKelamin });
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

  onKotaLahirChange = (kotaLahir) => {
    this.setState({ kotaLahir });
  };

  onDokterChange = (dokter) => {
    this.setState({ dokter });
  };

  onNameChange = (nama) => {
    this.setState({ nama });
  };

  onAgamaChange = (agama) => {
    this.setState({ agama });
  };

  onNegaraChange = (negara) => {
    this.setState({ negara });
  };

  afterAnimationComplete = () => {
    this.index += 1;
    this.setState({ disabled: false });
  };

  addMore = () => {
    this.addNewEle = true;
    const newlyAddedValue = { id: "" + this.index, name: "" + this.name };

    this.setState({
      disabled: true,
      valueArray: [...this.state.valueArray, newlyAddedValue],
    });

    console.log(this.state.valueArray);
  };

  remove(id) {
    this.addNewEle = false;
    const newArray = [...this.state.valueArray];
    newArray.splice(
      newArray.findIndex((ele) => ele.id === id),
      1,
    );

    this.setState(
      () => {
        return {
          valueArray: newArray,
        };
      },
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      },
    );
  }

  // renderFile (){
  //     if(this.state.fileKK != ''){
  //         return (
  //             <View style={{
  //                 flexDirection: 'row',
  //                 justifyContent: 'space-between'}}>
  //                 <TouchableOpacity
  //                     onPress={() => {this.setState({fileKK: ''})}}>
  //                     <Icon style={styles.hapusFile} name="close-outline" size={22} color="#a12927" />
  //                 </TouchableOpacity>
  //                 <Text style={styles.uploadText}>{this.state.fileKK.name}</Text>
  //             </View>
  //         )
  //     } else {
  //         return (
  //             <View style={{
  //                 flexDirection: 'row',
  //                 justifyContent: 'space-between'}}>
  //                 <Text style={styles.uploadText}>No File Selected</Text>
  //             </View>
  //         )
  //     }
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={{ marginTop: 10, marginBottom: 10, padding: 10 }}></View>
        <View style={styles.content}>
          <ScrollView>
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
                  />
                </View>
                {/* <View style={styles.itemWrap}>
                                    <Text style={styles.textItem}>
                                        Jenis Kelamin
                                         <Text style={{fontSize: 13, color:'#a12927'}}> *</Text>
                                    </Text>
                                    <SelectDropdown
                                        data = {gender}
                                        onSelect = {this.onJenisKelaminChange.bind(this)}
                                        defaultButtonText={this.state.jenisKelamin}
                                        buttonTextAfterSelection = {(selectedItem) => {
                                            return selectedItem;
                                        }}
                                        rowTextForSelection = {(item) => {
                                            return item;
                                        }}
                                        buttonStyle = {styles.dropdownBtnStyle}
                                        buttonTextStyle = {styles.dropdownBtnTxtStyle}
                                        renderDropdownIcon = {() => {
                                            return (
                                                <Icon name='chevron-down' color={'#4E4F6F'} size={18} />
                                            );
                                        }}
                                        dropdownIconPosition = {'right'}
                                        rowStyle = {styles.dropdownRowStyle}
                                        rowTextStyle = {styles.dropdownRowTxtStyle}
                                    />
                                </View> */}
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
                      defaultButtonText={this.state.jenisKelamin}
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
                      defaultButtonText={this.state.golonganDarah}
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
                  <Text style={styles.textItem}>Upload Foto KTP</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      justifyContent: "flex-start",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.fileBtn}
                      // onPress={this.FileKKPicker.bind(this)}>
                      onPress={() => {}}
                    >
                      <Text style={styles.fileText}>Pilih File</Text>
                    </TouchableOpacity>
                    <Text style={styles.uploadText}>No File Selected</Text>
                    {/* {this.renderFile()} */}
                  </View>
                  <Text style={styles.ketFileText}>
                    File yang diupload harus dalam bentuk/format (jpg, png,
                    jpeg, pdf) maksimal 2MB
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
                  />
                </View>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    Kota
                    <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                  </Text>
                  <TextInput
                    style={styles.inputText}
                    value={this.state.kotaLahir}
                    keyboardType="default"
                    onChangeText={this.onKotaLahirChange}
                  />
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
                  />
                </View>
                <View style={[styles.itemWrap, { marginBottom: 30 }]}>
                  <Text style={styles.textItem}>Sejak Lahir?</Text>
                  {name_since.map((res) => {
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
                      onDateChange={this.onTanggal}
                      value={this.state.tanggal}
                      text={this.handleTanggal()}
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
                    data={this.state.dataAgama}
                    onSelect={this.onAgamaChange.bind(this)}
                    defaultButtonText={this.state.agama}
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
                  {name_since.map((res) => {
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
                      onDateChange={this.onTanggal}
                      value={this.state.tanggal}
                      text={this.handleTanggal()}
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
                  <Text style={styles.textItem}>Upload Berkas</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      justifyContent: "flex-start",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.fileBtn}
                      // onPress={this.FileKKPicker.bind(this)}>
                      onPress={() => {}}
                    >
                      <Text style={styles.fileText}>Pilih File</Text>
                    </TouchableOpacity>
                    <Text style={styles.uploadText}>No File Selected</Text>
                    {/* {this.renderFile()} */}
                  </View>
                  <Text style={styles.ketFileText}>
                    File yang diupload harus dalam bentuk/format (jpg, png,
                    jpeg, pdf) maksimal 2MB
                  </Text>
                </View>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    Kewarganegaraan
                    <Text style={{ fontSize: 13, color: "#a12927" }}> *</Text>
                  </Text>
                  <SelectDropdown
                    data={negara}
                    onSelect={this.onNegaraChange.bind(this)}
                    defaultButtonText={this.state.negara}
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
                  {name_since.map((res) => {
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
                      onDateChange={this.onTanggal}
                      value={this.state.tanggal}
                      text={this.handleTanggal()}
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
                      (Kosongkan jika tidak memiliki alias)
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
                      onPress={this.addMore}
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
                  <View
                    ref={(scrollView) => (this.scrollView = scrollView)}
                    onContentSizeChange={() => {
                      this.addNewEle && this.scrollView.scrollToEnd();
                    }}
                  >
                    {this.state.valueArray.map((ele, index) => {
                      return (
                        <Item
                          key={ele.id}
                          item={ele}
                          removeItem={(id) => this.remove(id)}
                          afterAnimationComplete={this.afterAnimationComplete}
                        />
                      );
                    })}
                  </View>
                  {/* <View style={{
                                        flexDirection:'row',
                                        marginLeft: 5,
                                        marginRight: 20,
                                        marginTop: 7,
                                        marginBottom: 5,
                                        justifyContent:'space-between'}}>
                                        <View style={styles.dateView2}>
                                            <TextInput 
                                                style={[styles.inputText,{left:5,width:300}]}
                                                placeholder="Masukkan Nama Alias..."
                                                placeholderTextColor="#777"
                                                keyboardType='default'
                                                onChangeText={this.onLokasiLahirChange}
                                            />
                                        </View>
                                        <View style={styles.dateView2}>
                                            <View style = {{
                                                marginTop: 11,
                                                justifyContent: 'center'}}>
                                                <TouchableOpacity
                                                    onPress={() => {}}>
                                                    <Icon style={{left:15}} name='remove-circle-outline' color = {'#EE4A4A'} size = {30}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View> */}
                </View>
                <View style={styles.itemWrap}>
                  <Text style={styles.textItem}>
                    Pekerjaan/Karir
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
                      onPress={() => {}}
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
                        <Text style={styles.addText}>Tambah Pekerjaan</Text>
                      </View>
                    </TouchableOpacity>
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
                      <TextInput
                        style={[
                          styles.inputText,
                          { marginBottom: 5, left: 5, width: 300 },
                        ]}
                        placeholder="Pekerjaan / Karir..."
                        placeholderTextColor="#777"
                        keyboardType="default"
                        onChangeText={this.onLokasiLahirChange}
                      />
                      <TextInput
                        style={[
                          styles.inputText,
                          { marginBottom: 5, left: 5, width: 300 },
                        ]}
                        placeholder="Pekerjaan / Karir Sejak..."
                        placeholderTextColor="#777"
                        keyboardType="default"
                        onChangeText={this.onLokasiLahirChange}
                      />
                      <TextInput
                        style={[
                          styles.inputText2,
                          { marginBottom: 5, left: 5, width: 300 },
                        ]}
                        placeholder="Detail Pekerjaan / Karir..."
                        placeholderTextColor="#777"
                        multiline={true}
                        keyboardType="default"
                        onChangeText={this.onLokasiLahirChange}
                      />
                    </View>
                    <View style={styles.dateView2}>
                      <View
                        style={{
                          marginTop: 80,
                          justifyContent: "center",
                        }}
                      >
                        <TouchableOpacity onPress={() => {}}>
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
                </View>
              </View>
            </View>
          </ScrollView>
          <View>
            <TouchableOpacity
              style={styles.footerBtn}
              activeOpacity={0.5}
              onPress={() => {}}
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
    textAlign: "left",
    fontStyle: "italic",
  },
  uploadText: {
    color: "#000",
    fontSize: 12,
    top: 7,
    paddingLeft: 7,
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
  viewHolder: {
    justifyContent: "center",
    alignItems: "flex-start",
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

// import React, { Component } from 'react';
// import { View, TextInput, Button, StyleSheet } from 'react-native';

// class MyClass extends Component {

//   constructor(props){
//     super(props);
//     this.state = {
//       textInput : [],
//       inputData : []
//     }
//   }

//   //function to add TextInput dynamically
//   addTextInput = (index) => {
//     let textInput = this.state.textInput;
//     textInput.push(<TextInput style={styles.textInput}
//       onChangeText={(text) => this.addValues(text, index)} />);
//     this.setState({ textInput });
//   }

//   //function to remove TextInput dynamically
//   removeTextInput = () => {
//     let textInput = this.state.textInput;
//     let inputData = this.state.inputData;
//     textInput.pop();
//     inputData.pop();
//     this.setState({ textInput,inputData });
//   }

//   //function to add text from TextInputs into single array
//   addValues = (text, index) => {
//     let dataArray = this.state.inputData;
//     let checkBool = false;
//     if (dataArray.length !== 0){
//       dataArray.forEach(element => {
//         if (element.index === index ){
//           element.text = text;
//           checkBool = true;
//         }
//       });
//     }
//     if (checkBool){
//     this.setState({
//       inputData: dataArray
//     });
//   }
//   else {
//     dataArray.push({'text':text,'index':index});
//     this.setState({
//       inputData: dataArray
//     });
//   }
//   }

//   //function to console the output
//   getValues = () => {
//     console.log('Data',this.state.inputData);
//   }

//   render(){
//     return(
//       <View>
//         <View style= {styles.row}>
//           <View style={{margin: 10}}>
//         <Button title='Add' onPress={() => this.addTextInput(this.state.textInput.length)} />
//         </View>
//         <View style={{margin: 10}}>
//         <Button title='Remove' onPress={() => this.removeTextInput()} />
//         </View>
//         </View>
//         {this.state.textInput.map((value) => {
//           return value
//         })}
//         <Button title='Get Values' onPress={() => this.getValues()} />
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   buttonView: {
//   flexDirection: 'row'
//   },
//   textInput: {
//   height: 40,
//   borderColor: 'black',
//   borderWidth: 1,
//   margin: 20
// },
// row:{
//   flexDirection: 'row',
//   justifyContent: 'center'
//   },
// });

// export default MyClass;
