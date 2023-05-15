import React, { Component } from "react";
import {
  View, StyleSheet, StatusBar, SafeAreaView,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as RootNavigation from './RootNavigation';
import { MainStackNavigator } from "./navigation/StackNavigator";

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import LupaPassword from './pages/LupaPassword';
import Verifikasi from './pages/Verifikasi';

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lupa Password"
        component={LupaPassword}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#FFF',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        })}
      />
      <Stack.Screen
        name="Verifikasi"
        component={Verifikasi}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#FFF',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        })}
      />
    </Stack.Navigator>
  );
}

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default class App extends Component {
  render() {
    return (
      <NavigationContainer ref={RootNavigation.navigationRef}>
        <MyStatusBar barStyle="light-content" />
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false, animationEnabled: false }}
          />
          <Stack.Screen
            name="Utama"
            component={MainStackNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});