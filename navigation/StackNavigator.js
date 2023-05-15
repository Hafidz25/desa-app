import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./DrawerNavigator";
import TabNavigator from "./TabNavigator";

import DataWarga from "../pages/Home/DataWarga";
import DetailWarga from "../pages/Home/DetailWarga";
import EditWarga from "../pages/Home/EditWarga";
import Notifikasi from '../pages/Home/Notifikasi';
import TambahDataWarga from "../pages/Home/TambahDataWarga";
import KartuKeluarga from "../pages/Kk/KartuKeluarga";
import TambahKK from "../pages/Kk/TambahKK";
import DetailKK from "../pages/Kk/DetailKK";
import Toko from "../pages/Pasar/Toko";
import Barang from "../pages/Pasar/Barang";
import Promo from "../pages/Pasar/Promo";
import Riwayat from "../pages/Pasar/Riwayat";
import Profil from "../pages/Profil/Profil";
import Layanan from "../pages/Layanan/Layanan";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Notifikasi" component={Notifikasi} options={{ headerBackTitleVisible: false, headerTintColor: '#000', }} />
            <Stack.Screen name="Data Warga" component={DataWarga} options={{ headerBackTitleVisible: false, headerTintColor: '#000', }} />
            <Stack.Screen name="Detail Data Warga" component={DetailWarga} options={{ headerBackTitleVisible: false, headerTintColor: '#000', }} />
            <Stack.Screen name="Edit Data Warga" component={EditWarga} options={{ headerBackTitleVisible: false, headerTintColor: '#000', }} />
            <Stack.Screen name="Tambah Data Warga" component={TambahDataWarga} options={{ headerBackTitleVisible: false, headerTintColor: '#000', }} />
            <Stack.Screen name="Kartu Keluarga" component={KartuKeluarga} options={{ headerBackTitleVisible: false, headerTintColor: '#000', }} />
            <Stack.Screen name="Tambah Kartu Keluarga" component={TambahKK} options={{ headerBackTitleVisible: false, headerTintColor: '#000', }} />
            <Stack.Screen name="Detail Data Kartu Keluarga" component={DetailKK} options={{ headerBackTitleVisible: false, headerTintColor: '#000', }} />
            <Stack.Screen name="E-Pasar" component={TabNavigator} options={{ headerBackTitleVisible: false, headerTintColor: '#000', }} />
        </Stack.Navigator>
    );
}

const TokoStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Warung" component={Toko} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const BarangStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Produk" component={Barang} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const PromoStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Promosi" component={Promo} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const RiwayatStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Riw" component={Riwayat} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}


const ProfilStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profil} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const LayananStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Layan" component={Layanan} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export {
    MainStackNavigator, ProfilStackNavigator, LayananStackNavigator,
    TokoStackNavigator, BarangStackNavigator, PromoStackNavigator,
    RiwayatStackNavigator,
};