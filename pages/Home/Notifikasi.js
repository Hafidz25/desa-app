import React, { Component } from "react";
import {
    StyleSheet, Text, FlatList, View, TouchableOpacity,
} from 'react-native';
import { Searchbar } from 'react-native-paper';

const dataNotif = [
    {id: 1, type:'Promo', isi: 'Telah di buka pemesanan Apartemen baru CLUSTER-FLAMBOYAN di Jogjakarta, dengan harga terjangkau', tgl: '05 April 2021', time:'07.15'},
    {id: 2, type:'Info', isi: 'Tagihan Anda bulan April 2020 sudah bisa di bayar bisa bayar di mana saja', tgl: '01 April 2021', time:'16.30'},
]

export default class Notifikasi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    emptyComponent= () => {
        return (
            <View
                style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={styles.text}>Tidak Ada Data</Text>
            </View>
        )
    }

    render(){
        return(      
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
                                placeholder = "Cari Menggunakan Keyword"
                                placeholderTextColor = "#444"
                                onChangeText={text => this.SearchFilterFunction(text)}
                                value={this.state.search}
                                style={styles.searchBarStyle}
                            />
                        </View>
                    </View>
                </View>
                <View style={{marginTop:5,marginBottom:5,padding:13}}>
                    <Text style={styles.tittleText}>Data Notifikasi / Info</Text>
                </View>
                <FlatList
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{
                        flex:1,
                        backgroundColor: '#FFF',
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                    }}
                    data={dataNotif}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={ () => {}}>
                            <View style = {styles.viewList}>
                                <View style = {styles.userBg}>
                                    <View style={styles.menuItem}>
                                        <Text style={styles.menuItemText}>{item.type}</Text>
                                    </View>
                                    <View style={styles.menuItem}>
                                        <Text style={styles.bgText}>{item.isi}</Text>
                                    </View>
                                    <View style={styles.menuItem}>
                                        <Text style={styles.menuItemTime}>{item.tgl} {item.time}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent = {this.emptyComponent()}
                />
            </View>
        )}
}

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
    },
    tittleText:{
        fontSize: 15,
        color: '#FFF',
        left: 10,
    },
    viewList: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userBg:{
        flex: 1,
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#cdcdcd',
    },
    menuItem: {
        flexDirection: 'row',
    },
    menuItemText: {
        padding: 3,
        fontSize: 15,
        color: '#EE4A4A',
        fontWeight: 'bold',
    },
    bgText: {
        padding: 3,
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'left',
        color: '#444',
    },
    menuItemTime: {
        padding: 3,
        fontSize: 10,
        color: '#EE4A4A',
    },
    text: {
        padding: 3,
        fontSize: 14,
        textAlign: 'center',
        color: '#777'
    },
})