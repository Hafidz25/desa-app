import React, { Component } from "react";
import {
    View, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ProfilStackNavigator, RiwayatStackNavigator, LayananStackNavigator} from "./StackNavigator";

import DrawerContent from '../component/DrawerContent';
import withBadge from '../component/Badge';

import Home from "../pages/Home/Home";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
    render(){
        const jumlah = 2;
        const BadgedIcon = withBadge(jumlah)(Icon);
        return (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={Home} options={{headerRight: () =>
                    <TouchableOpacity
                        style={{
                            right:10,
                            width:30,
                            height:30,
                            borderRadius:20,
                            backgroundColor:'#CCEAE7',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => this.props.navigation.navigate('Notifikasi')}>
                        <View 
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <BadgedIcon name="notifications" size={21} color="#4DB6AC" />
                        </View>
                    </TouchableOpacity>
                }}/>
                <Drawer.Screen name="Profil" component={ProfilStackNavigator} options={{headerRight: () =>
                    <TouchableOpacity
                        style={{
                            right:10,
                            width:30,
                            height:30,
                            borderRadius:20,
                            backgroundColor:'#CCEAE7',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => this.props.navigation.navigate('Notifikasi')}>
                        <View 
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <BadgedIcon name="notifications" size={21} color="#4DB6AC" />
                        </View>
                    </TouchableOpacity>
                }}/>
                <Drawer.Screen name="Layanan" component={LayananStackNavigator} options={{headerRight: () =>
                    <TouchableOpacity
                        style={{
                            right:10,
                            width:30,
                            height:30,
                            borderRadius:20,
                            backgroundColor:'#CCEAE7',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => this.props.navigation.navigate('Notifikasi')}>
                        <View 
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <BadgedIcon name="notifications" size={21} color="#4DB6AC" />
                        </View>
                    </TouchableOpacity>
                }}/>
            </Drawer.Navigator>
        )
    }
};