import React, { Component } from "react";
import {
    StyleSheet, Text, FlatList, View, TouchableOpacity, Alert,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AsyncStorage from '@react-native-async-storage/async-storage';

let row = [];
let prevOpenedRow;

export default class DataWarga extends Component{
    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            data: [],
            search: '',
        };
        this.arrayholder = this.state.data;
    }

    componentDidMount(){
        this.getToken();
    }
    
    async getToken() {
        try {
            let userData = await AsyncStorage.getItem('access_token');
            let data = JSON.parse(userData);
            this.setState({access_token: data})
            this._GetDataWarga()
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    _GetDataWarga = async () => {
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
                data: responseJson.data
            },
                function() {
                    this.arrayholder = this.state.data;
                }
            )
            // console.log(responseJson.data)
        })
    }

    SearchFilterFunction(text) {
        const newData = this.arrayholder.filter(function(item) {
            const itemData = item.nik ? item.nik.toUpperCase() : ''.toUpperCase();
            const itemData1 = item.legal_name ? item.legal_name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase(); 
            return itemData.indexOf(textData) > -1 || itemData1.indexOf(textData) > -1;
        });
        this.setState({ data: newData, search: text });
    }

    deleteData = async (id) => {
        let token = this.state.access_token;
        let headers = {
            "x-access-token": token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        let url = "http://10.0.0.151:8000/api/v1/penduduks/"+id;

        fetch(url, {
            method: "DELETE",
            headers,
        })
        .then((response) => {
            if(response.status == 204){
                Alert.alert(
                    "Data Berhasil Dihapus",
                    [
                        { text: "OK", onPress: () => this.props.navigation.replace('Dashboard')}
                    ],{ cancelable: false }
                )
            } else{
                alert("Hapus Data Gagal")
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    emptyComponent= () => {
        return (
            <View
                style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={styles.text}>Tidak Ada Data</Text>
            </View>
        )
    }

    renderItem = ({ item, index }, onClick) => {
        const closeRow = (index) => {
            if (prevOpenedRow && prevOpenedRow !== row[index]) {
                prevOpenedRow.close();
            }
            prevOpenedRow = row[index];
        };

        const renderRightActions = (progress, dragX, onClick) => {
            return (
                <View
                    style={{
                        margin: 0,
                        alignContent: 'center',
                        justifyContent: 'center',
                        width: '20%',
                        top: 5,
                        left: 25,
                        paddingLeft: 10,
                    }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#4E4F6F',
                        borderRadius: 7,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} 
                        onPress={() => {
                            Alert.alert(
                                'Hapus Data Penduduk',
                                'Nama : '+item.legal_name+'\n'+'Usia : '+item.age+' Tahun',
                                [
                                    {text: 'Oke', onPress: () => this.deleteData(item.id)},
                                    {text: 'Batal', onPress: () => {}},
                                ],{ cancelable: true }
                            );
                        }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 14,
                        }}>Hapus</Text>
                    </TouchableOpacity>
                </View>
            );
        };

        return (
            <Swipeable
                renderRightActions={(progress, dragX) =>
                    renderRightActions(progress, dragX, onClick)
                }
                onSwipeableOpen={() => closeRow(index)}
                ref={(ref) => (row[index] = ref)}
                rightOpenValue={-100}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail Data Warga', { 
                    id: item.id,
                    nik: item.nik,
                    sex: item.sex })}>
                    <View style={styles.viewList}>
                        <View style={styles.userBg}>
                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText}>
                                    {item.legal_name}
                                </Text> 
                            </View>
                            <View style={styles.menuItem}>
                                <Text style={styles.bgText}>
                                    Usia : {item.age} Tahun
                                </Text>
                            </View>
                            <View style={styles.jkStyle}>
                                <Text style={styles.jkText}>
                                    {item.sex}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        );
    };

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.searchContainer}>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <Searchbar
                                fontSize = {13}
                                iconColor = "#444"
                                placeholder = "Cari Data Warga By NIK atau Nama"
                                placeholderTextColor = "#444"
                                onChangeText={text => this.SearchFilterFunction(text)}
                                value={this.state.search}
                                style={styles.searchBarStyle}
                            />
                        </View>
                    </View>
                </View>
                <View style={{marginTop:10,marginBottom:10,padding:10}}>
                    {/* <View>
                        <Text style={styles.tittleText}>Filter</Text>
                    </View> */}
                    <View>
                        <Text style={styles.tittleText}>Jumlah Warga {this.state.data.length}</Text>
                    </View>
                </View>
                <FlatList
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{
                        flex:1,
                        backgroundColor: '#FFF',
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                    }}
                    data={this.state.data}
                    renderItem={(v) =>
                        this.renderItem(v, () => {
                            console.log(v);
                        })
                    }
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent = {this.emptyComponent()}
                />
                <View>
                    <TouchableOpacity style={styles.footerBtn}
                        activeOpacity={0.5}
                        onPress={() => this.props.navigation.replace('Tambah Data Warga')}>
                        <Text style = {styles.footerText}>Tambah Data</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EE4A4A',
    },
    header: {
        backgroundColor: '#FFF',
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    searchContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        alignContent: 'center',
        marginBottom: 15,
    },
    searchBarStyle: { 
        width: '100%',
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#cdcdcd",
        elevation: 0,
        shadowOpacity: 0,
        alignItems: 'center',
    },
    tittleText:{
        fontSize: 15,
        color: '#FFF',
        left: 10,
    },
    viewList: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        top: 15,
    },
    userBg:{
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#cdcdcd',
    },
    menuItem: {
        flexDirection: 'row',
    },
    menuItemText: {
        padding: 3,
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold',
    },
    bgText: {
        padding: 3,
        fontSize: 12,
        color: '#444',
    },
    jkStyle: {
        alignItems: 'center',
        left: '39%',
        bottom: 30,
    },
    jkText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#000',
    },
    text: {
        padding: 3,
        fontSize: 14,
        textAlign: 'center',
        color: '#777'
    },
    footerBtn: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4E4F6F'
    },
    footerText:{
        color: '#FFF',
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});