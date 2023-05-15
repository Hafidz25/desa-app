import React, { Component } from 'react';
import {
    View, TextInput, Text, StyleSheet, TouchableOpacity,
    ScrollView, Platform, Alert, Image
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

const peran = ["Ayah", "Ibu", "Anak Kandung", "Anak Tiri", "Anak Asuh"];

export default class TambahKK extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            dataPenduduk: [],
            dataProvinsi: [],
            dataKabupaten: [],
            dataKecamatan: [],
            dataDesa: [],
            dataKodePos: [],

            noKK: '',
            penduduk: '',
            idPenduduk: '',
            role: '',
            roleId: '',
            provinsi: '',
            idProvinsi: '',
            kabupaten: '',
            idKabupaten: '',
            kecamatan: '',
            idKecamatan: '',
            desa: '',
            idDesa: '',

            fotokk: '',
            modalFoto: false,
        }
    }

    componentDidMount = () => {
        this.getToken();
    }

    async getToken() {
        try {
            let userData = await AsyncStorage.getItem('access_token');
            let data = JSON.parse(userData);
            this.setState({ access_token: data })
        } catch (error) {
            console.log("Something went wrong", error);
        }
        this._GetWarga()
        this._GetProvinsi()
    }

    _GetWarga = async () => {
        let token = this.state.access_token;
        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        // let url = "http://10.0.0.151:8000/api/v1/penduduks";
        // let url = "http://10.0.0.151:8000/api/v1/penduduks?limit=0";
        let url = "https://host02.birosolusi.com/edesa/public/api/v1/penduduks";

        fetch(url, {
            method: "GET",
            headers,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataPenduduk: responseJson.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    _GetProvinsi = async () => {
        let token = this.state.access_token;
        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        // let url = "http://10.0.0.151:8000/api/v1/wilayah/provinces";
        let url = "https://host02.birosolusi.com/edesa/public/api/v1/wilayah/provinces";

        fetch(url, {
            method: "GET",
            headers,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataProvinsi: responseJson.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    _GetKabupaten = async () => {
        let token = this.state.access_token;
        let id = this.state.idProvinsi;

        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        // let url = "http://10.0.0.151:8000/api/v1/wilayah/cities";
        let url = "https://host02.birosolusi.com/edesa/public/api/v1/wilayah/cities";

        let body = {
            "province_id": id,
            "keyword": "",
            "limit": 15,
        };

        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataKabupaten: responseJson.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    _GetKecamatan = async () => {
        let token = this.state.access_token;
        let id = this.state.idKabupaten;

        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        // let url = "http://10.0.0.151:8000/api/v1/wilayah/districts";
        let url = "https://host02.birosolusi.com/edesa/public/api/v1/wilayah/districts";

        let body = {
            "city_id": id,
            "keyword": "",
            "limit": 15,
        };

        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataKecamatan: responseJson.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    _GetDesa = async () => {
        let token = this.state.access_token;
        let id = this.state.idKecamatan;

        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        // let url = "http://10.0.0.151:8000/api/v1/wilayah/subdistricts";
        let url = "https://host02.birosolusi.com/edesa/public/api/v1/wilayah/subdistricts";

        let body = {
            "district_id": id,
            "keyword": "",
            "limit": 15,
        };

        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataDesa: responseJson.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    _GetKodePos = async () => {
        let token = this.state.access_token;
        let id = this.state.idDesa;

        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        // let url = "http://10.0.0.151:8000/api/v1/wilayah/postalcodes";
        let url = "https://host02.birosolusi.com/edesa/public/api/v1/wilayah/postalcodes";

        let body = {
            "subdistrict_id": id,
            "keyword": "",
            "limit": 15,
        };

        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataKodePos: responseJson.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    onNoKKChange = (text) => {
        if (/^\d+$/.test(text) || text === '') {
            this.setState({
                noKK: text
            });
        }
    }

    onPendudukChange = (penduduk) => {
        setTimeout(() => {
            const data = this.state.dataPenduduk
            const index = data.findIndex(x => x.legal_name === penduduk)
            this.setState({ idPenduduk: data[index].id, penduduk: penduduk })
            this._GetKabupaten()
        }, 0);
    }

    onRoleChange = (role) => {
        if (role == 'Ayah') {
            this.setState({ roleId: '1' })
        } else if (role == 'Ibu') {
            this.setState({ roleId: '2' })
        } else if (role == 'Anak Kandung') {
            this.setState({ roleId: '3' })
        } else if (role == 'Anak Tiri') {
            this.setState({ roleId: '4' })
        } else if (role == 'Anak Asuh') {
            this.setState({ roleId: '5' })
        }
    }

    onProvinsiChange = (provinsi) => {
        setTimeout(() => {
            const data = this.state.dataProvinsi
            const index = data.findIndex(x => x.name === provinsi)
            this.setState({ idProvinsi: data[index].id, provinsi: provinsi })
            this._GetKabupaten()
        }, 0);
    }

    onKabupatenChange = (kabupaten) => {
        setTimeout(() => {
            const data = this.state.dataKabupaten
            const index = data.findIndex(x => x.name === kabupaten)
            this.setState({ idKabupaten: data[index].id, kabupaten: kabupaten })
            this._GetKecamatan()
        }, 0);
    }

    onKecamatanChange = (kecamatan) => {
        setTimeout(() => {
            const data = this.state.dataKecamatan
            const index = data.findIndex(x => x.name === kecamatan)
            this.setState({ idKecamatan: data[index].id, kecamatan: kecamatan })
            this._GetDesa()
        }, 0);
    }

    onDesaChange = (desa) => {
        setTimeout(() => {
            const data = this.state.dataDesa
            const index = data.findIndex(x => x.name === desa)
            this.setState({ idDesa: data[index].id, desa: desa })
            this._GetKodePos()
        }, 0);
    }

    renderFileFoto() {
        if (this.state.fotokk != '') {
            return (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Image source={{ uri: this.state.fotokk }} style={{ width: 200, height: 200 }} />
                    <TouchableOpacity
                        onPress={() => { this.setState({ fotokk: '' }) }}>
                        <Icon style={styles.hapusFile} name="close-outline" size={22} color="#a12927" />
                    </TouchableOpacity>
                    <Text style={styles.uploadText}>
                        {this.state.fotokk.fileName}
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.uploadText}>No File Selected</Text>
                </View>
            )
        }
    }

    renderKabupaten() {
        if (this.state.dataKabupaten != '') {
            return (
                <View style={styles.itemWrap}>
                    <Text style={styles.textItem}>
                        Kabupaten
                        <Text style={{ fontSize: 13, color: '#a12927' }}> *</Text>
                    </Text>
                    <SelectDropdown
                        data={this.state.dataKabupaten.map(k => (k.name))}
                        onSelect={this.onKabupatenChange.bind(this)}
                        defaultButtonText={"Pilih Kabupaten"}
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
                                <Icon name='chevron-down' color={'#4E4F6F'} size={18} />
                            );
                        }}
                        dropdownIconPosition={'right'}
                        rowStyle={styles.dropdownRowStyle}
                        rowTextStyle={styles.dropdownRowTxtStyle}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.itemWrap}>
                    <Text style={styles.textItem}>
                        Kabupaten
                        <Text style={{ fontSize: 13, color: '#a12927' }}> *</Text>
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Pilih Kabupaten"
                        placeholderTextColor='#777'
                        editable={false}
                    />
                </View>
            )
        }
    }

    renderKecamatan() {
        if (this.state.dataKecamatan != '') {
            return (
                <View style={styles.itemWrap}>
                    <Text style={styles.textItem}>
                        Kecamatan
                        <Text style={{ fontSize: 13, color: '#a12927' }}> *</Text>
                    </Text>
                    <SelectDropdown
                        data={this.state.dataKecamatan.map(k => (k.name))}
                        onSelect={this.onKecamatanChange.bind(this)}
                        defaultButtonText={"Pilih Kecamatan"}
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
                                <Icon name='chevron-down' color={'#4E4F6F'} size={18} />
                            );
                        }}
                        dropdownIconPosition={'right'}
                        rowStyle={styles.dropdownRowStyle}
                        rowTextStyle={styles.dropdownRowTxtStyle}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.itemWrap}>
                    <Text style={styles.textItem}>
                        Kecamatan
                        <Text style={{ fontSize: 13, color: '#a12927' }}> *</Text>
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Pilih Kecamatan"
                        placeholderTextColor='#777'
                        editable={false}
                    />
                </View>
            )
        }
    }

    renderDesa() {
        if (this.state.dataDesa != '') {
            return (
                <View style={styles.itemWrap}>
                    <Text style={styles.textItem}>
                        Desa
                        <Text style={{ fontSize: 13, color: '#a12927' }}> *</Text>
                    </Text>
                    <SelectDropdown
                        data={this.state.dataDesa.map(k => (k.name))}
                        onSelect={this.onDesaChange.bind(this)}
                        defaultButtonText={"Pilih Desa"}
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
                                <Icon name='chevron-down' color={'#4E4F6F'} size={18} />
                            );
                        }}
                        dropdownIconPosition={'right'}
                        rowStyle={styles.dropdownRowStyle}
                        rowTextStyle={styles.dropdownRowTxtStyle}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.itemWrap}>
                    <Text style={styles.textItem}>
                        Desa
                        <Text style={{ fontSize: 13, color: '#a12927' }}> *</Text>
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Pilih Desa"
                        placeholderTextColor='#777'
                        editable={false}
                    />
                </View>
            )
        }
    }

    renderKodePos() {
        if (this.state.dataKodePos != '') {
            return (
                <View style={styles.itemWrap}>
                    <Text style={styles.textItem}>
                        Kode Pos
                        <Text style={{ fontSize: 13, color: '#a12927' }}> *</Text>
                    </Text>
                    <Text style={styles.inputText2}>
                        {this.state.dataKodePos.map(x => x.name)}
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={styles.itemWrap}>
                    <Text style={styles.textItem}>
                        Kode Pos
                        <Text style={{ fontSize: 13, color: '#a12927' }}> *</Text>
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Kode Pos"
                        placeholderTextColor='#777'
                        editable={false}
                    />
                </View>
            )
        }
    }

    cameraFoto = () => {
        launchCamera(
            {
                title: 'Select Image',
                allowsEditing: false,
                maxWidth: 200,
                maxHeight: 200,
                mediaType: "photo",
                includeBase64: true,
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            },
            (response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    this.setState({ fotokk: response, modalFoto: false })
                }
            })
        )
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
            this.setState({ fotokk: result.assets[0].uri, modalFoto: false })
        }
        // launchImageLibrary(
        //     {
        //         title: 'Select Image',
        //         allowsEditing: false,
        //         quality:0.9,
        //         maxWidth:200,
        //         maxHeight:200,
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
        //             this.setState({ fotokk: response, modalFoto: false })
        //         }
        //     })
        // )
    };

    handleSubmit = async () => {
        const token = this.state.access_token;

        const no_kk = this.state.noKK
        const id_head = this.state.idPenduduk
        const peran = JSON.parse(this.state.roleId)
        const city = this.state.idKabupaten
        const province = this.state.idProvinsi
        const district = this.state.idKecamatan
        const subDiscrict = this.state.idDesa

        const postalCode = this.state.dataKodePos.map(x => x.id)
        var code = JSON.parse(postalCode)


        var path_kk
        if (this.state.fotokk == '') {
            path_kk = this.state.fotokk
        } else {
            path_kk = {
                uri: 'data:' + this.state.fotokk.type + ';base64,' + this.state.fotokk.base64,
                name: this.state.fotokk.fileName,
                type: this.state.fotokk.type,
            }
        }

        const formData = new FormData();
        formData.append('no_kk', no_kk);
        formData.append('id_head', id_head);
        formData.append('peran', peran);
        formData.append('city', city);
        formData.append('province', province);
        formData.append('district', district);
        formData.append('subDiscrict', subDiscrict);
        formData.append('postalCode', code);
        formData.append('path_kk', path_kk);

        let headers = {
            "x-access-token": token,
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
        };

        // let url = "http://10.0.0.151:8000/api/v1/kks";
        let url = "https://host02.birosolusi.com/edesa/public/api/v1/kks";

        fetch(url, {
            method: "POST",
            headers,
            body: formData,
        })
            .then((response) => {
                if (response.status == 201) {
                    Alert.alert(
                        "Data Berhasil Ditambahkan",
                        [
                            { text: "OK", onPress: () => this.props.navigation.replace('Dashboard') }
                        ], { cancelable: false }
                    )
                } else {
                    alert("Tambah Data Gagal")
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }


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
                                        Nomor Kartu Keluarga
                                        <Text style={{ fontSize: 13, color: '#a12927' }}> *</Text>
                                    </Text>
                                    <TextInput
                                        style={styles.inputText}
                                        value={this.state.noKK}
                                        onChangeText={this.onNoKKChange}
                                        maxLength={16}
                                        keyboardType='phone-pad'
                                        placeholder="Masukkan Nomor Kartu Keluarga"
                                        placeholderTextColor="#000"
                                    />
                                </View>
                                <View style={styles.itemWrap}>
                                    <Text style={styles.textItem}>
                                        Nama Kepala Keluarga
                                        <Text style={{ fontSize: 13, color: '#a12927' }}> *</Text>
                                    </Text>
                                    <SelectDropdown
                                        data={this.state.dataPenduduk.map(d => (d.legal_name))}
                                        onSelect={this.onPendudukChange.bind(this)}
                                        defaultButtonText={"Pilih Nama Kepala Keluarga"}
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
                                                <Icon name='chevron-down' color={'#4E4F6F'} size={18} />
                                            );
                                        }}
                                        dropdownIconPosition={'right'}
                                        rowStyle={styles.dropdownRowStyle}
                                        rowTextStyle={styles.dropdownRowTxtStyle}
                                    />
                                </View>
                                <View style={styles.itemWrap}>
                                    <Text style={styles.textItem}>
                                        Peran
                                        <Text style={{ fontSize: 13, color: '#a12927' }}> *</Text>
                                    </Text>
                                    <SelectDropdown
                                        data={peran}
                                        onSelect={this.onRoleChange.bind(this)}
                                        defaultButtonText={"Pilih Peran"}
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
                                                <Icon name='chevron-down' color={'#4E4F6F'} size={18} />
                                            );
                                        }}
                                        dropdownIconPosition={'right'}
                                        rowStyle={styles.dropdownRowStyle}
                                        rowTextStyle={styles.dropdownRowTxtStyle}
                                    />
                                </View>
                                <View style={styles.itemWrap}>
                                    <Text style={styles.textItem}>
                                        Provinsi
                                        <Text style={{ fontSize: 13, color: '#a12927' }}> *</Text>
                                    </Text>
                                    <SelectDropdown
                                        data={this.state.dataProvinsi.map(d => (d.name))}
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
                                                <Icon name='chevron-down' color={'#4E4F6F'} size={18} />
                                            );
                                        }}
                                        dropdownIconPosition={'right'}
                                        rowStyle={styles.dropdownRowStyle}
                                        rowTextStyle={styles.dropdownRowTxtStyle}
                                    />
                                </View>
                                {this.renderKabupaten()}
                                {this.renderKecamatan()}
                                {this.renderDesa()}
                                {this.renderKodePos()}
                                <View style={styles.itemWrap}>
                                    <Text style={styles.textItem}>
                                        Upload Foto Kartu Keluarga
                                        <Text style={{ fontSize: 13, color: '#a12927' }}> *</Text>
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        justifyContent: 'flex-start'
                                    }}>
                                        <TouchableOpacity style={styles.fileBtn}
                                            onPress={() => { this.setState({ modalFoto: true }) }}>
                                            <Text style={styles.fileText}>Pilih File</Text>
                                        </TouchableOpacity>
                                        <Modal
                                            backdropOpacity={0.5}
                                            isVisible={this.state.modalFoto}
                                            onBackdropPress={() => { this.setState({ modalFoto: false }) }}
                                            style={styles.contentView}>
                                            <View style={styles.options}>
                                                <TouchableOpacity
                                                    style={styles.codeBtn}
                                                    onPress={this.cameraFoto}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        <Icon name="camera-outline" size={24} color="#000" />
                                                        <Text style={styles.codeText}>Camera</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.codeBtn}
                                                    onPress={this.selectFileFoto}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        <Icon name="images-outline" size={24} color="#000" />
                                                        <Text style={styles.codeText}>Pilih File</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </Modal>
                                        {this.renderFileFoto()}
                                    </View>
                                    <Text style={styles.ketFileText}>File yang diupload harus dalam bentuk/format (jpg, png, jpeg) maksimal 2MB</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View>
                        <TouchableOpacity style={styles.footerBtn}
                            activeOpacity={0.5}
                            onPress={() => this.handleSubmit()}>
                            <Text style={styles.footerText}>Simpan Data</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EE4A4A',
    },
    header: {
        backgroundColor: '#FFF',
        height: 30,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    content: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    viewList: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textWrap: {
        flex: 1,
        flexDirection: 'column',
    },
    itemWrap: {
        padding: 5,
    },
    textItem: {
        padding: 5,
        lineHeight: 20,
        fontWeight: '700',
        fontSize: 14,
        color: '#000',
        marginLeft: 5,
    },
    dropdownBtnStyle: {
        marginTop: 5,
        width: '96%',
        alignSelf: 'center',
        height: 45,
        backgroundColor: "#FFF",
        borderWidth: 1.5,
        borderColor: '#cdcdcd',
        borderRadius: 10,
    },
    dropdownBtnStyle2: {
        marginTop: 5,
        width: 160,
        left: 7,
        alignSelf: 'center',
        height: 45,
        backgroundColor: "#FFF",
        borderWidth: 1.5,
        borderColor: '#cdcdcd',
        borderRadius: 10,
    },
    dropdownBtnTxtStyle: { left: 6, textAlign: 'left', fontSize: 14 },
    dropdownRowStyle: {
        paddingLeft: 5,
        backgroundColor: "#FFF",
        borderBottomColor: "#cdcdcd",
    },
    dropdownRowTxtStyle: { textAlign: 'left', fontSize: 14 },
    dropdown1SelectedRowStyle: { backgroundColor: '#FFF' },
    dropdown1searchInputStyleStyle: {
        backgroundColor: '#FFF',
    },
    inputText: {
        alignSelf: 'center',
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        width: '96%',
        height: 45,
        color: '#000',
        borderWidth: 1.5,
        borderColor: '#cdcdcd',
        borderRadius: 10,
    },
    inputText2: {
        alignSelf: 'center',
        paddingVertical: 12,
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        width: '96%',
        height: 45,
        color: '#000',
        borderWidth: 1.5,
        borderColor: '#cdcdcd',
        borderRadius: 10,
    },
    ketFileText: {
        lineHeight: 17,
        marginTop: 5,
        marginLeft: 10,
        fontSize: 11,
        color: '#777',
        textAlign: 'left',
        fontStyle: 'italic',
    },
    uploadText: {
        color: '#000',
        fontSize: 12,
        top: 7,
        paddingLeft: 7,
    },
    fileBtn: {
        width: '30%',
        marginLeft: 10,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#cdcdcd',
    },
    fileText: {
        color: '#000',
        fontSize: 14,
    },
    footerBtn: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4E4F6F'
    },
    footerText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    contentView: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    options: {
        backgroundColor: 'white',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    codeBtn: {
        width: '75%',
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor: '#cdcdcd',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    codeText: {
        fontSize: 15,
        textAlign: 'center',
        left: 10,
        ...Platform.select({
            ios: {
                top: 5,
            },
            android: {
                top: 3,
            },
        })
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
        })
    },
    uploadText: {
        color: '#000',
        fontSize: 12,
        top: 7,
        paddingLeft: 7,
    },
});