import React, { Component } from "react";
import { 
    View, StyleSheet, Text, Platform, ScrollView, Dimensions,
    TouchableOpacity, FlatList, Image, Modal, Alert, TextInput,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SegmentedControlTab from "react-native-segmented-control-tab";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const peran = ["Ayah", "Ibu", "Anak Kandung", "Anak Tiri", "Anak Asuh"];

export default class DetailKK extends Component{
    constructor(props) {
        super(props);
        this.state = {
            customStyleIndex: 0,
            access_token: '',
            data: [],
            dataPenduduk: [],
            dataName: [],
            dataIdName: [],
            dataRole: [],
            dataRoleId: [],
            dataProvinsi: [],
            dataKabupaten: [],
            dataKecamatan: [],
            dataDesa: [],
            dataKodePos: [],
            dataFoto: '',
            dataMember: [],
            dataAllProvinsi: [],
            dataAllKabupaten: [],
            dataAllKecamatan: [],
            dataAllDesa: [],
            dataAllKodePos: [],
            id: this.props.route.params.id,

            kepalaModal: false,
            kepala: '',
            idKepala: '',
            kepalaRole: '',
            idKepalaRole: '',

            nokkModal: false,
            noKK: '',

            alamatModal: false,
            provinsi: '',
            idProvinsi: '',
            kabupaten: '',
            idKabupaten: '',
            kecamatan: '',
            idKecamatan: '',
            desa: '',
            idDesa: '',
            kodePos: '',
            idKodePos: '',

            fotoModal: false,
            fotokk: '',

            tambahModal: false,
            penduduk: '',
            idPenduduk: '',
            role: '',
            roleId: '',
        }
    }

    componentDidMount() {
        this.getToken();
    }

    async getToken() {
        try {
            let userData = await AsyncStorage.getItem('access_token');
            let data = JSON.parse(userData);
            this.setState({access_token: data})
        } catch (error) {
            console.log("Something went wrong", error);
        }
        this._GetWarga()
        this._GetDetail()
    }

    _GetWarga = async () => {
        let token = this.state.access_token
        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        let url = "http://10.0.0.151:8000/api/v1/penduduks?limit=0";

        fetch(url, {
            method: "GET",
            headers,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataPenduduk: responseJson.data,
            })
        })
        .catch((error) => {
            console.log(error)
        });
    }

    _GetDetail = async () => {
        let token = this.state.access_token
        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        // let url = "http://10.0.0.151:8000/api/v1/kks/"+this.state.id
        let url = "http://10.0.0.151:8000/api/v1/kks/c999181c-a8d5-421b-8cd8-b683d5191cc5"

        fetch(url, {
            method: "GET",
            headers,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                data: responseJson.data,
                dataName: responseJson.data.head.penduduk.legal_name,
                dataRole: responseJson.data.head.role.text,
                dataProvinsi: responseJson.data.home_addrs.province,
                dataKabupaten: responseJson.data.home_addrs.city,
                dataKecamatan: responseJson.data.home_addrs.district,
                dataDesa: responseJson.data.home_addrs.subdistrict,
                dataKodePos: responseJson.data.home_addrs.pastalcode,
                dataAllKodePos: [],
                dataFoto: responseJson.data.path_kk,
                dataMember: responseJson.data.members,
                noKK: responseJson.data.kk,
                kepalaRole: responseJson.data.head.role.text,
                idProvinsi: '',
            })
            this._GetProvinsi()
        })
        .catch((error) => {
            console.log(error)
        });
    }

    _GetProvinsi = async () => {
        let token = this.state.access_token
        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        let url = "http://10.0.0.151:8000/api/v1/wilayah/provinces";

        fetch(url, {
            method: "GET",
            headers,
        })

        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataAllProvinsi: responseJson.data
            })
            this._GetKabupaten()
        })
        .catch((error) => {
            console.log(error)
        });
    }

    _GetKabupaten = async () => {
        let token = this.state.access_token
        var id
        if (this.state.idProvinsi == ''){
            id = JSON.parse(this.state.dataProvinsi.id)
        } else {
            id = this.state.idProvinsi
        }

        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        let url = "http://10.0.0.151:8000/api/v1/wilayah/cities";

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
                dataAllKabupaten: responseJson.data
            })
            this._GetKecamatan()
        })
        .catch((error) => {
            console.log(error)
        });
    }

    _GetKecamatan = async () => {
        let token = this.state.access_token;
        var id
        if (this.state.idKabupaten == '') {
            id = JSON.parse(this.state.dataKabupaten.id)
        } else {
            id = this.state.idKabupaten
        }

        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        let url = "http://10.0.0.151:8000/api/v1/wilayah/districts";

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
                dataAllKecamatan: responseJson.data
            })
            this._GetDesa()
        })
        .catch((error) => {
            console.log(error)
        });
    }

    _GetDesa = async () => {
        let token = this.state.access_token
        var id
        if (this.state.idKecamatan == '') {
            id = this.state.dataKecamatan.id
        } else {
            id = this.state.idKecamatan
        }

        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        let url = "http://10.0.0.151:8000/api/v1/wilayah/subdistricts";

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
                dataAllDesa: responseJson.data
            })
            this._GetKodePos()
        })
        .catch((error) => {
            console.log(error)
        });
    }

    _GetKodePos = async () => {
        let token = this.state.access_token;
        var id
        if (this.state.idDesa == '') {
            id = this.state.dataDesa.id
        } else {
            id = this.state.idDesa
        }

        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        let url = "http://10.0.0.151:8000/api/v1/wilayah/postalcodes";

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
                dataAllKodePos: responseJson.data,
            })
        })
        .catch((error) => {
            console.log(error)
        });
    }


    tambahData = async () => {
        const token = this.state.access_token

        const id_member = this.state.idPenduduk
        const id_kk = this.state.data.id
        const peran = this.state.roleId

        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        let url = "http://10.0.0.151:8000/api/v1/kks/members";

        let body = {
            "id_member": id_member,
            "id_kk": id_kk,
            "peran": peran,
        };

        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.message == 'Data successfully created!'){
                this.setState({tambahModal: false})
                alert("Data Berhasil Ditambahkan")
                this._GetDetail()
                // Alert.alert(
                //     'Data Berhasil Ditambahkan',
                //     [
                //         {text: 'Oke', onPress: () => this.setState({tambahModal: false})},
                //     ],{ cancelable: true }
                // );
            }else{
                alert(responseJson.message)
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    deleteData = async (id, id_kk) => {
        let token = this.state.access_token

        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        let url = "http://10.0.0.151:8000/api/v1/kks/members/delete";

        let body = {
            "id_kk": id_kk,
            "id_member": id,
        };

        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            alert("Data Berhasil Dihapus")
            console.log(responseJson)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    editKepala = async () => {
        const token = this.state.access_token
        const id_kk = this.state.data.id

        var id_head
        if(this.state.idKepala == ''){
            const data = this.state.dataPenduduk
            const index = data.findIndex(x => x.legal_name === this.state.dataName)
            id_head = data[index].id
        } else {
            id_head = this.state.idKepala
        }
        
        var peran
        if(this.state.idKepalaRole == ''){
            peran = this.state.dataRole
            if(peran == 'Ayah'){
                peran = 1
            } else if (peran == 'Ibu') {
                peran = 2
            } else if (peran == 'Anak Kandung') {
                peran = 3
            } else if (peran == 'Anak Tiri') {
                peran = 4
            } else if (peran == 'Anak Asuh') {
                peran = 5
            }
        } else {
            peran = this.state.idKepalaRole
        }

        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        let url = "http://10.0.0.151:8000/api/v1/head";

        let body = {
            "id_kk": id_kk,
            "id_head": id_head,
            "peran": peran
        };

        fetch(url, {
            method: "PUT",
            headers,
            body: JSON.stringify(body),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.message == 'Data successfully updated!'){
                this.setState({kepalaModal: false})
                alert("Kepala Keluarga Berhasil Diubah")
                this._GetDetail()
            }else{
                alert(responseJson.message)
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    editNoKK = async () => {
        const token = this.state.access_token
        const id_kk = this.state.data.id
        const no_kk = this.state.noKK

        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        let url = "http://10.0.0.151:8000/api/v1/kk-number";

        let body = {
            "id_kk": id_kk,
            "no_kk": no_kk,
        };

        fetch(url, {
            method: "PUT",
            headers,
            body: JSON.stringify(body),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.message == 'Data successfully updated!'){
                this.setState({nokkModal: false})
                alert("No KK Berhasil Diubah")
                this._GetDetail()
            }else{
                alert(responseJson.message)
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    editAlamat = async () => {
        const token = this.state.access_token
        const id_kk = this.state.data.id

        var province
        if (this.state.idProvinsi == ''){
            province = JSON.parse(this.state.dataProvinsi.id)
        } else {
            province = this.state.idProvinsi
        }

        var city
        if (this.state.idKabupaten == ''){
            city = JSON.parse(this.state.dataKabupaten.id)
        } else {
            city = this.state.idKabupaten
        }

        var district
        if (this.state.idKecamatan == ''){
            district = JSON.parse(this.state.dataKecamatan.id)
        } else {
            district = this.state.idKecamatan
        }

        var subDistrict
        if (this.state.idDesa == ''){
            subDistrict = JSON.parse(this.state.dataDesa.id)
        } else {
            subDistrict = this.state.idDesa
        }

        const postalCode = JSON.parse(this.state.dataAllKodePos.map(ikp => (ikp.id)))

        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        let url = "http://10.0.0.151:8000/api/v1/address";

        let body = {
            "id_kk": id_kk,
            "city": city,
            "province": province,
            "district": district,
            "subDistrict": subDistrict,
            "postalCode": postalCode
        };

        fetch(url, {
            method: "PUT",
            headers,
            body: JSON.stringify(body),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.message == 'Data successfully updated!'){
                this.setState({alamatModal: false})
                alert("Alamat Berhasil Diubah")
                this._GetDetail()
            }else{
                alert(responseJson.message)
            }
            console.log(responseJson)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    handleCustomIndexSelect = (index) => {
        this.setState(prevState => ({ ...prevState, customStyleIndex: index }))
    }

    onKepalaChange = (kepala) => {
        setTimeout(() => {
            const data = this.state.dataPenduduk
            const index = data.findIndex(x => x.legal_name === kepala)
            this.setState({idKepala:data[index].id, kepala:kepala})
        }, 0);
    }

    onKepalaRoleChange = (kepalaRole) => {
        if(kepalaRole == 'Ayah'){
            this.setState({idKepalaRole: '1', kepalaRole:kepalaRole})
        } else if (kepalaRole == 'Ibu') {
            this.setState({idKepalaRole: '2', kepalaRole:kepalaRole})
        } else if (kepalaRole == 'Anak Kandung') {
            this.setState({idKepalaRole: '3', kepalaRole:kepalaRole})
        } else if (kepalaRole == 'Anak Tiri') {
            this.setState({idKepalaRole: '4', kepalaRole:kepalaRole})
        } else if (kepalaRole == 'Anak Asuh') {
            this.setState({idKepalaRole: '5', kepalaRole:kepalaRole})
        }
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
            this.setState({idPenduduk:data[index].id, penduduk:penduduk})
        }, 0);
    }

    onRoleChange = (role) => {
        if(role == 'Ayah'){
            this.setState({roleId: '1'})
        } else if (role == 'Ibu') {
            this.setState({roleId: '2'})
        } else if (role == 'Anak Kandung') {
            this.setState({roleId: '3'})
        } else if (role == 'Anak Tiri') {
            this.setState({roleId: '4'})
        } else if (role == 'Anak Asuh') {
            this.setState({roleId: '5'})
        }
    }

    onProvinsiChange = (provinsi) => {
        setTimeout(() => {
            const data = this.state.dataAllProvinsi
            const index = data.findIndex(prov => prov.name === provinsi)
            this.setState({idProvinsi:data[index].id, provinsi:provinsi})
            this._GetKabupaten()
        }, 0);
    }

    onKabupatenChange = (kabupaten) => {
        setTimeout(() => {
            const data = this.state.dataAllKabupaten
            const index = data.findIndex(kab => kab.name === kabupaten)
            this.setState({idKabupaten:data[index].id, kabupaten:kabupaten})
            this._GetKecamatan()
        }, 0);
    }

    onKecamatanChange = (kecamatan) => {
        setTimeout(() => {
            const data = this.state.dataAllKecamatan
            const index = data.findIndex(kec => kec.name === kecamatan)
            this.setState({idKecamatan:data[index].id, kecamatan:kecamatan})
            this._GetDesa()
        }, 0);
    }

    onDesaChange = (desa) => {
        setTimeout(() => {
            const data = this.state.dataAllDesa
            const index = data.findIndex(ds => ds.name === desa)
            this.setState({idDesa:data[index].id, desa:desa})
            this._GetKodePos()
        }, 0);
    }

    emptyComponent= () => {
        return (
            <View
                style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={styles.text}>Tidak Ada Data</Text>
            </View>
        )
    }

    cameraFoto = () => {
        launchCamera(
            {
                title: 'Select Image',
                allowsEditing: false,
                maxWidth:200,
                maxHeight:200,
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
                    this.setState({ fotokk: response, fotoModal: false })
                }
            })
        )
    };

    selectFileFoto = () => {
        launchImageLibrary(
            {
                title: 'Select Image',
                allowsEditing: false,
                quality:0.9,
                maxWidth:200,
                maxHeight:200,
                mediaType: "photo",
                includeBase64: true,
                storageOptions: {
                    skipBackup: true,
                    cameraRoll: false
                },
            },
            (response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    this.setState({ fotokk: response, fotoModal: false })
                }
            })
        )
    };

    batalFoto = () => {
        setTimeout(() => {
            this.setState({
                fotokk: '',
            })
        }, 0);
    }

    simpanFoto = () => {
        const token = this.state.access_token
        const id_kk = this.state.data.id

        const data = this.state.dataPenduduk
        const index = data.findIndex(x => x.legal_name === this.state.dataName)
        var id_head = data[index].id

        var path_kk = {
            uri: 'data:'+this.state.fotokk.type+';base64,' + this.state.fotokk.base64,
            name: this.state.fotokk.fileName,
            type: this.state.fotokk.type,
        }

        const body = new FormData();
        body.append('id_kk', id_kk);
        body.append('id_head', id_head);
        body.append('path_kk', path_kk);

        let headers = {
            "x-access-token": token,
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
        };

        let url = "http://10.0.0.151:8000/api/v1/photo";

        fetch(url, {
            method: "POST",
            headers,
            body: body,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.message == 'Data successfully updated!'){
                alert("Foto KK Berhasil Diubah")
                setTimeout(() => {
                    this.setState({
                        fotokk: '',
                    })
                    this._GetDetail()
                }, 0);
            }else{
                alert(responseJson.message)
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    renderFotoKK = () => {
        if(this.state.fotokk == ''){
            return(
                <View>
                    <Image
                        source={this.state.dataFoto ? {uri: this.state.dataFoto} : null}
                        style={{
                            top: 5,
                            left: 10,
                            width: 295,
                            height: 175,
                            borderWidth: 2,
                            borderRadius: 10,
                            borderColor: '#cdcdcd',
                        }}
                    />
                    <TouchableOpacity onPress = {() => {this.setState({fotoModal: true})}}
                        style={[styles.touchableButton,{right:10,top:90}]}>
                        <View style={{flexDirection:'row'}}>
                            <Icon
                                name={'create-outline'}
                                color={'#4E4F6F'}
                                size={20}
                            />
                            <Text style={{fontSize:13,color:'#4E4F6F',top:5,left:1}}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return(
                <View>
                    <Image
                        source={{
                            uri: Platform.OS === "android" ? this.state.fotokk.uri : this.state.fotokk.uri.replace("file://", ""),
                        }}
                        style={{
                            top: 5,
                            left: 10,
                            width: 295,
                            height: 175,
                            borderWidth: 2,
                            borderRadius: 10,
                            borderColor: '#cdcdcd',
                        }}
                    />
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <TouchableOpacity style={styles.buttonStyle}
                            onPress={() => this.simpanFoto()}>
                            <Text style = {styles.fileText}>Simpan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle}
                            onPress={() => this.batalFoto()}>
                            <Text style = {styles.fileText}>Batal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    onCloseAlamat = () => {
        setTimeout(() => {
            this.setState({
                alamatModal: false,
                idProvinsi: '',
                provinsi: '',
                idKabupaten: '',
                kabupaten: '',
                idKecamatan: '',
                kecamatan: '',
                idDesa: '',
                desa: '',
                idKodePos: '',
                kodePos: '',
            })
            this._GetProvinsi()
        }, 0);
    }

    renderNoKK = () => {
        if(this.state.noKK != this.state.data.kk){
            return(
                <TouchableOpacity style={styles.regBtn}
                    onPress={() => this.editNoKK()}>
                    <Text style={styles.regText}>Simpan</Text>
                </TouchableOpacity>
            )
        } else {
            return(
                <TouchableOpacity style={styles.regBtnDisable}
                    onPress={() => {}}
                    disabled={true}>
                    <Text style={styles.regTextDisable}>Simpan</Text>
                </TouchableOpacity>
            )
        }
    }

    render(){
        const { customStyleIndex } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.header}></View>
                <View style={{marginBottom:10,padding:10}}>
                    <SegmentedControlTab
                        values={['Data Diri', 'Data Keluarga']}
                        selectedIndex={customStyleIndex}
                        onTabPress={this.handleCustomIndexSelect}
                        borderRadius={0}
                        tabsContainerStyle={{ height: APPBAR_HEIGHT }}
                        tabStyle={{ backgroundColor: '#EE4A4A', borderWidth: 0, borderColor: 'transparent' }}
                        activeTabStyle={{ backgroundColor: '#EE4A4A', borderBottomWidth: 2, borderBottomColor: '#FFF' }}
                        tabTextStyle={{ fontSize: 14, color: '#FFF', fontWeight: 'bold' }}
                        activeTabTextStyle={{ color: '#FFF' }}
                    />
                </View>
                {customStyleIndex === 0 &&
                    <>
                        <View style={styles.content}>
                            <ScrollView>
                                <View style={styles.viewList}>
                                    <View style={styles.textWrap}>
                                        <View style={styles.itemWrap}>
                                            <Text style={styles.textItem}>
                                                Kepala Keluarga
                                            </Text>
                                            <Text style={styles.inputText}>
                                               {this.state.dataName}
                                               <Text style={{fontSize: 14, fontWeight:'600'}}> ( {this.state.dataRole} )</Text>
                                            </Text>
                                            <TouchableOpacity 
                                                // onPress = {() => {}}
                                                onPress={() => this.setState({kepalaModal: true})}
                                                style={styles.touchableButton}>
                                                <View style={{flexDirection:'row'}}>
                                                <Icon
                                                    name={'create-outline'}
                                                    color={'#4E4F6F'}
                                                    size={20}
                                                />
                                                <Text style={{fontSize:13,color:'#4E4F6F',top:5,left:1}}>Edit</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <Modal
                                                transparent={true}
                                                visible={this.state.kepalaModal}
                                                animationType={'slide'}
                                                onRequestClose={() => this.closeModal()}>
                                                <View style={styles.tambahContainer}>
                                                    <View style={styles.tambahSubContainer}>
                                                        <View style={styles.tambahHeader}>
                                                            <View style={{ flex: 1, padding: 15 }}>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 14,
                                                                        fontWeight: 'bold',
                                                                        color: '#FFF',
                                                                        left: 4,
                                                                    }}>
                                                                    EDIT KEPALA KELUARGA
                                                                </Text>
                                                            </View>
                                                            <TouchableOpacity onPress={() => this.setState({kepalaModal: false})}
                                                                style={{
                                                                    right: 4,
                                                                    padding: 12,
                                                                }}>
                                                                <Icon name="close-outline" color={"#FFF"} size={20}/>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={[styles.itemWrap,{padding:10}]}>
                                                            <Text style={styles.textItem}>Masukkan Anggota Keluarga</Text>
                                                            <SelectDropdown
                                                                data = {this.state.dataPenduduk.map(d => (d.legal_name))}
                                                                onSelect = {this.onKepalaChange.bind(this)}
                                                                defaultValue = {this.state.dataName}
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
                                                        </View>
                                                        <View style={[styles.itemWrap,{padding:10}]}>
                                                            <Text style={styles.textItem}>Masukkan Peran</Text>
                                                            <SelectDropdown
                                                                data = {peran}
                                                                onSelect = {this.onKepalaRoleChange.bind(this)}
                                                                defaultValue = {this.state.dataRole}
                                                                defaultButtonText={"Pilih Peran"}
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
                                                        </View>
                                                        <View style={styles.regButton}>
                                                            <TouchableOpacity style={styles.regBtn}
                                                                onPress={() => this.editKepala()}>
                                                                <Text style={styles.regText}>Simpan</Text>
                                                            </TouchableOpacity>
                                                            {/* {this.renderKepalaKeluarga()} */}
                                                        </View>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                        <View style={styles.itemWrap}>
                                            <Text style={styles.textItem}>
                                                No. KK
                                            </Text>
                                            <Text style={styles.inputText}>
                                               {this.state.data.kk}
                                            </Text>
                                            <TouchableOpacity 
                                                // onPress = {() => {}}
                                                onPress={() => this.setState({nokkModal: true})}
                                                style={styles.touchableButton}>
                                                <View style={{flexDirection:'row'}}>
                                                <Icon
                                                    name={'create-outline'}
                                                    color={'#4E4F6F'}
                                                    size={20}
                                                />
                                                <Text style={{fontSize:13,color:'#4E4F6F',top:5,left:1}}>Edit</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <Modal
                                                transparent={true}
                                                visible={this.state.nokkModal}
                                                animationType={'slide'}
                                                onRequestClose={() => this.closeModal()}>
                                                <View style={styles.tambahContainer}>
                                                    <View style={styles.tambahSubContainer2}>
                                                        <View style={styles.tambahHeader}>
                                                            <View style={{ flex: 1, padding: 15 }}>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 14,
                                                                        fontWeight: 'bold',
                                                                        color: '#FFF',
                                                                        left: 4,
                                                                    }}>
                                                                    EDIT NO KK
                                                                </Text>
                                                            </View>
                                                            <TouchableOpacity onPress={() => this.setState({nokkModal: false})}
                                                                style={{
                                                                    right: 4,
                                                                    padding: 12,
                                                                }}>
                                                                <Icon name="close-outline" color={"#FFF"} size={20}/>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={[styles.itemWrap,{padding:10}]}>
                                                            <Text style={styles.textItem}>Masukkan No KK</Text>
                                                            <TextInput 
                                                                style={styles.inputText3}
                                                                value={this.state.noKK}
                                                                onChangeText={this.onNoKKChange}
                                                                maxLength={16}
                                                                keyboardType='phone-pad'
                                                                placeholder="Masukkan Nomor Kartu Keluarga" 
                                                                placeholderTextColor="#000"
                                                            />
                                                        </View>
                                                        <View style={styles.regButton}>
                                                            {this.renderNoKK()}
                                                        </View>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                        <View style={styles.itemWrap}>
                                            <Text style={styles.textItem}>
                                                Alamat Sekarang
                                            </Text>
                                            <Text style={styles.inputText2}>
                                               Desa {this.state.dataDesa.text}, Kecamatan {this.state.dataKecamatan.text}, Kabupaten {this.state.dataKabupaten.text}, {this.state.dataProvinsi.text} {this.state.dataKodePos.text}
                                            </Text>
                                            <TouchableOpacity 
                                                // onPress = {() => {}}
                                                onPress={() => this.setState({alamatModal: true})}
                                                style={styles.touchableButton}>
                                                <View style={{flexDirection:'row'}}>
                                                <Icon
                                                    name={'create-outline'}
                                                    color={'#4E4F6F'}
                                                    size={20}
                                                />
                                                <Text style={{fontSize:13,color:'#4E4F6F',top:5,left:1}}>Edit</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <Modal
                                                transparent={true}
                                                visible={this.state.alamatModal}
                                                animationType={'slide'}
                                                onRequestClose={() => this.closeModal()}>
                                                <View style={styles.tambahContainer}>
                                                    <View style={styles.tambahSubContainer3}>
                                                        <View style={styles.tambahHeader}>
                                                            <View style={{ flex: 1, padding: 15 }}>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 14,
                                                                        fontWeight: 'bold',
                                                                        color: '#FFF',
                                                                        left: 4,
                                                                    }}>
                                                                    EDIT ALAMAT
                                                                </Text>
                                                            </View>
                                                            <TouchableOpacity onPress={() => this.onCloseAlamat()}
                                                                style={{
                                                                    right: 4,
                                                                    padding: 12,
                                                                }}>
                                                                <Icon name="close-outline" color={"#FFF"} size={20}/>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={[styles.itemWrap,{padding:10}]}>
                                                            <Text style={styles.textItem}>Provinsi</Text>
                                                            <SelectDropdown
                                                                data={this.state.dataAllProvinsi.map(d => (d.name))}
                                                                onSelect={this.onProvinsiChange.bind(this)}
                                                                defaultValue={this.state.provinsi ? this.state.provinsi : this.state.dataProvinsi.text}
                                                                buttonTextAfterSelection={(selectedItem) => {
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
                                                        </View>
                                                        <View style={[styles.itemWrap,{padding:10}]}>
                                                            <Text style={styles.textItem}>Kabupaten</Text>
                                                            <SelectDropdown
                                                                data = {this.state.dataAllKabupaten.map(k => (k.name))}
                                                                onSelect={this.onKabupatenChange.bind(this)}
                                                                defaultValue={this.state.kabupaten ? this.state.kabupaten : this.state.dataKabupaten.text}
                                                                buttonTextAfterSelection={(selectedItem) => {
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
                                                        </View>
                                                        <View style={[styles.itemWrap,{padding:10}]}>
                                                            <Text style={styles.textItem}>Kecamatan</Text>
                                                            <SelectDropdown
                                                                data={this.state.dataAllKecamatan.map(p => (p.name))}
                                                                onSelect={this.onKecamatanChange.bind(this)}
                                                                defaultValue={this.state.kecamatan ? this.state.kecamatan : this.state.dataKecamatan.text}
                                                                buttonTextAfterSelection={(selectedItem) => {
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
                                                        </View>
                                                        <View style={[styles.itemWrap,{padding:10}]}>
                                                            <Text style={styles.textItem}>Desa</Text>
                                                            <SelectDropdown
                                                                data={this.state.dataAllDesa.map(s => (s.name))}
                                                                onSelect={this.onDesaChange.bind(this)}
                                                                defaultValue={this.state.desa ? this.state.desa : this.state.dataDesa.text}
                                                                buttonTextAfterSelection={(selectedItem) => {
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
                                                        </View>
                                                        {/* <View style={[styles.itemWrap,{padding:10}]}>
                                                            <Text style={styles.textItem}>Kode Pos</Text>
                                                            <Text style={styles.inputText4}>
                                                                {this.state.dataKodePos}
                                                            </Text>
                                                        </View> */}
                                                        <View style={[styles.itemWrap,{padding:10}]}>
                                                            {this.state.dataAllKodePos.map((nm, key) => {
                                                                return(
                                                                    <View key={key}>
                                                                        <Text style={styles.textItem}>
                                                                            Kode Pos
                                                                            <Text style={{fontSize: 13, color:'#a12927'}}> *</Text>
                                                                        </Text>
                                                                        <Text style={styles.inputText4}>
                                                                            {nm.name}
                                                                        </Text>
                                                                    </View>
                                                                )
                                                            })}
                                                        </View>
                                                        <View style={styles.regButton}>
                                                            <TouchableOpacity style={styles.regBtn}
                                                                onPress={() => this.editAlamat()}>
                                                                <Text style={styles.regText}>Simpan</Text>
                                                            </TouchableOpacity>
                                                            {/* {this.renderSimpan()} */}
                                                        </View>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                        <View style={styles.itemWrap}>
                                            <Text style={styles.textItem}>
                                                Foto Kartu Keluarga
                                            </Text>
                                            {this.renderFotoKK()}
                                            <Modal
                                                transparent={true}
                                                visible={this.state.fotoModal}
                                                animationType={'slide'}
                                                onRequestClose={() => this.closeModal()}>
                                                <View style={styles.editFotoContainer}>
                                                    <View style={styles.options}>
                                                        <View style={styles.tambahHeader}>
                                                            <View style={{ flex: 1, padding: 15 }}>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 14,
                                                                        fontWeight: 'bold',
                                                                        color: '#FFF',
                                                                        left: 4,
                                                                    }}>
                                                                    EDIT FOTO KARTU KELUARGA
                                                                </Text>
                                                            </View>
                                                            <TouchableOpacity onPress={() => this.setState({fotoModal: false})}
                                                                style={{
                                                                    right: 4,
                                                                    padding: 12,
                                                                }}>
                                                                <Icon name="close-outline" color={"#FFF"} size={20}/>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <TouchableOpacity 
                                                            style={[styles.codeBtn,{marginTop:20}]}
                                                            onPress={this.cameraFoto}>
                                                            <View style = {{
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between'}}>
                                                                <Icon name="camera-outline" size={24} color="#000" />
                                                                <Text style={styles.codeText}>Camera</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity 
                                                            style={styles.codeBtn}
                                                            onPress={this.selectFileFoto}>
                                                            <View style = {{
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between'}}>
                                                                <Icon name="images-outline" size={24} color="#000" />
                                                                <Text style={styles.codeText}>Pilih File</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </>
                }
                {customStyleIndex === 1 &&
                    <>
                        <View style={styles.content}>
                            <View style={styles.itemWrap}>
                                <View style = {{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    justifyContent: 'flex-start'}}>
                                    <TouchableOpacity style={[styles.addBtn,{width:'35%'}]}
                                        // onPress={() => {}}>
                                        onPress={() => this.setState({tambahModal: true})}>
                                        <View style = {{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'}}>
                                            <Icon style={{right:5}} name='add-outline' color = {'#FFF'} size = {16}/>
                                            <Text style={styles.addText}>Tambah Data</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <Modal
                                        transparent={true}
                                        visible={this.state.tambahModal}
                                        animationType={'slide'}
                                        onRequestClose={() => this.closeModal()}>
                                        <View style={styles.tambahContainer}>
                                            <View style={styles.tambahSubContainer}>
                                                <View style={styles.tambahHeader}>
                                                    <View style={{ flex: 1, padding: 15 }}>
                                                        <Text
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: 'bold',
                                                                color: '#FFF',
                                                                left: 4,
                                                            }}>
                                                            TAMBAH MEMBER
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => this.setState({tambahModal: false})}
                                                        style={{
                                                            right: 4,
                                                            padding: 12,
                                                        }}>
                                                        <Icon name="close-outline" color={"#FFF"} size={20}/>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={[styles.itemWrap,{padding:10}]}>
                                                    <Text style={styles.textItem}>Masukkan Anggota Keluarga</Text>
                                                    <SelectDropdown
                                                        data = {this.state.dataPenduduk.map(d => (d.legal_name))}
                                                        onSelect = {this.onPendudukChange.bind(this)}
                                                        defaultButtonText={"Pilih Nama Kepala Keluarga"}
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
                                                </View>
                                                <View style={[styles.itemWrap,{padding:10}]}>
                                                    <Text style={styles.textItem}>Masukkan Peran</Text>
                                                    <SelectDropdown
                                                        data = {peran}
                                                        onSelect = {this.onRoleChange.bind(this)}
                                                        defaultButtonText={"Pilih Peran"}
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
                                                </View>
                                                <View style={styles.regButton}>
                                                    <TouchableOpacity style={styles.regBtn}
                                                        onPress={() => this.tambahData()}>
                                                        <Text style={styles.regText}>Simpan</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                            </View>
                            <View style={styles.pageContainer}></View>
                            <View style = {styles.viewList}>
                                <View style = {styles.userBg}>
                                    <View style={styles.menuItem}>
                                        <View style={styles.nilaiItem}>
                                            <Text style={[styles.nilaiText,{width: 135, textAlign: 'left'}]}>NIK</Text>
                                        </View>
                                        <View style={styles.nilaiItem}>
                                            <Text style={[styles.nilaiText,{width: 115, textAlign: 'left'}]}>Nama</Text>
                                        </View>
                                        <View style={styles.nilaiItem}>
                                            <Text style={[styles.nilaiText,{width: 70, textAlign: 'left'}]}>Peran</Text>
                                        </View>
                                        <View style={styles.nilaiItem}>
                                            <Text style={[styles.nilaiText,{width: 100, textAlign: 'left'}]}>Aksi</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <FlatList
                                contentContainerStyle={{ flexGrow: 1 }}
                                data={this.state.dataMember}
                                extraData={this.state.dataMember}
                                renderItem={({ item, key }) =>
                                    <View key={key} style={styles.viewList}>
                                        <View style = {styles.userBg}>
                                            <View style={styles.menuItem}>
                                                <View style={styles.nilaiItem}>
                                                    <Text style={[styles.bgText,{width: 135, textAlign: 'left'}]}>{item.penduduk.nik}</Text>
                                                </View>
                                                <View style={styles.nilaiItem}>
                                                    <Text style={[styles.bgText,{width: 115, textAlign: 'left'}]}>{item.penduduk.legal_name}</Text>
                                                </View>
                                                <View style={styles.nilaiItem}>
                                                    <Text style={[styles.bgText,{width: 70, textAlign: 'left'}]}>{item.role.text}</Text>
                                                </View>
                                                <View style={styles.nilaiItem}>
                                                    <Text style={[styles.bgText,{width: 100, textAlign: 'center'}]}>
                                                        <View style={styles.itemWrap}>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    Alert.alert(
                                                                        'Hapus Data Member',
                                                                        'Nama : '+item.penduduk.legal_name+'\n'+'Peran : '+item.role.text,
                                                                        [
                                                                            {text: 'Oke', onPress: () => 
                                                                                this.deleteData(item.id, this.state.data.id).then(()=>{
                                                                                    setTimeout(() => {
                                                                                        this._GetDetail()
                                                                                    }, 0);
                                                                                })
                                                                            },
                                                                            {text: 'Batal', onPress: () => {}},
                                                                        ],{ cancelable: true }
                                                                    );
                                                                }}
                                                                style={{
                                                                flexDirection: 'row',
                                                                paddingVertical: 1,
                                                                alignSelf: 'center',
                                                                borderRadius: 3,
                                                                padding:5}}>
                                                                <Icon style={{right:1}} name='trash-outline' color={'#EE4A4A'} size={15}/>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                }
                                keyExtractor={(item, index) => index.toString()}
                                ListEmptyComponent = {this.emptyComponent()}
                            />
                        </View>
                    </>
                }
            </View>
        );
    }
};

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 50 : 62;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

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
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textWrap: {
        flex: 1,
        marginTop: 5,
        flexDirection: 'column',
    },
    itemWrap: {
        padding: 5,
    },
    textItem: {
        padding: 5,
        fontWeight: '700',
        fontSize: 14,
        color: '#000',
        marginLeft: 5,
    },
    addBtn: {
        marginLeft: 10,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#4E4F6F',
        backgroundColor: '#4E4F6F',
    },
    addText:{
        color: '#FFF',
        fontSize: 14,
    },
    pageContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '95%',
        height: 4,
        backgroundColor: '#4E4F6F',
        marginTop: 10,
    },
    userBg:{
        maxWidth: '100%',
        padding: 5,
        left: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#cdcdcd',
    },
    menuItem: {
        maxWidth: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nilaiItem: {
        marginVertical: 5,
    },
    nilaiText: {
        fontSize: 13,
        lineHeight: 15,
        fontWeight: 'bold',
    },
    bgText: {
        fontSize: 12,
        lineHeight: 20,
    },
    inputText:{
        alignSelf: 'center',
        paddingVertical:12,
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        width: '80%',
        height: 45,
        color: '#000',
        borderWidth: 1.5,
        borderColor: '#cdcdcd',
        borderRadius: 10,
        right: '7%'
    },
    inputText2:{
        alignSelf: 'center',
        paddingVertical:12,
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        width: '80%',
        height: 95,
        color: '#000',
        borderWidth: 1.5,
        borderColor: '#cdcdcd',
        borderRadius: 10,
        lineHeight: 20,
        textAlign: 'justify',
        right: '7%',
    },
    inputText3:{
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
    inputText4:{
        alignSelf: 'center',
        paddingVertical:12,
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
    touchableButton: {
        right: 15,
        top: '60%',
        position: 'absolute',
    },
    tambahContainer: {
        position: 'absolute',
        backgroundColor: '#000000af',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        alignItems: 'center',
    },
    tambahSubContainer: {
        marginTop: '65%',
        height: 330,
        width: deviceWidth - 20,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    tambahSubContainer2: {
        marginTop: '75%',
        height: 235,
        width: deviceWidth - 20,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    tambahSubContainer3: {
        marginTop: '30%',
        height: 620,
        width: deviceWidth - 20,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    tambahHeader: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: '#4E4F6F',
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
    dropdownBtnTxtStyle: { left: 6, textAlign: 'left', fontSize: 14 },
    dropdownRowStyle: {
        paddingLeft: 5,
        backgroundColor: "#FFF",
        borderBottomColor: "#cdcdcd",
    },
    dropdownRowTxtStyle: { textAlign: 'left', fontSize: 14 },
    dropdown1SelectedRowStyle: {backgroundColor: '#FFF'},
    regButton:{
        alignContent: 'center',
        alignItems: 'center',
    },
    regBtn:{
        width: "90%",
        backgroundColor: "#4E4F6F",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    regBtnDisable:{
        width: "90%",
        backgroundColor: "#FFF",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#cdcdcd'
    },
    regText:{
        color: '#FFF',
        fontSize: 14
    },
    regTextDisable:{
        color: '#cdcdcd',
        fontSize: 14
    },
    editFotoContainer: {
        position: 'absolute',
        backgroundColor: '#000000af',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
    },
    options: {
        backgroundColor: '#FFF',
        marginTop: '75%',
        height: 230,
        width: deviceWidth,
        borderRadius: 10,
        alignItems: 'center',
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
    codeText:{
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
    buttonStyle: {
        margin: 10,
        width: '25%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#cdcdcd',
    },
    fileText:{
        color: '#000',
        fontSize: 13,
    },
});