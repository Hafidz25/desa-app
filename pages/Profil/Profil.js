import React, { Component } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";

export default class Profil extends Component{
    render(){
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.center}>
                        <Text>This is the Profil Screen</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
});