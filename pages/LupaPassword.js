import React, {Component} from 'react';
import {
    View, Text, StyleSheet,
    TextInput, TouchableOpacity,
} from 'react-native';

export default class LupaPassword extends Component {
    constructor(props){
		super(props)
		this.state={
			userEmail: '',
        }
    }

    onChangeEmail = text => {
        this.setState({ userEmail: text });
    };
    
    render() { 
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{marginTop: '5%'}}>
                        <Text style={styles.contentText}>LUPA PASSWORD</Text>
                        <View style={{marginTop:25, marginBottom:'10%'}}>
                            <Text style={styles.ketText}>Verifikasi akan di kirim melalui Whatsapp, No WA yang terdaftar di sistem.</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginTop: '15%',
                    alignContent: 'center',
                    alignItems: 'center',}}>
                    <View style={styles.inputView} >
                        <TextInput 
                            style={styles.inputText}
                            value={this.state.userEmail}
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onChangeText={this.onChangeEmail}
                            placeholder="Masukkan No HP/Whatsapp" 
                            placeholderTextColor="gray"/>
                    </View>
                    <TouchableOpacity 
                        style={styles.loginBtn}
                        onPress={() => this.props.navigation.navigate('Verifikasi')}>
                        <Text style={styles.loginText}>KIRIM</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Support By Oitocindonesia.id</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EE4A4A'
    },
    content: {
        backgroundColor: 'white',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    contentText:{
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
    },
    ketText:{
        fontSize: 15,
        width: 300,
        lineHeight: 25,
        textAlign: 'justify',
    },
    inputView:{
        width: "85%",
        backgroundColor: '#FFF',
        borderRadius: 10,
        height: 50,
        marginTop: '5%',
        justifyContent: "center",
        padding: 25,
    },
    inputText:{
        fontSize: 15,
        height: 50,
    },
    loginText:{
        color: '#FFF',
        fontWeight: '700',
        fontSize: 15,
    },
    loginBtn:{
        width: "85%",
        backgroundColor: '#AA0E0E',
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: '6%',
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    footerText:{
        paddingVertical: 25,
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
    },
});