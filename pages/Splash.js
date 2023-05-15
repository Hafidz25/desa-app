import React, {Component} from 'react';
import { 
    View, StyleSheet, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Splash extends Component {

    constructor(props){
		super(props)
		this.state = {
            access_token: [],
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.getToken();
        }, 1000);
    }

    async getToken() {
        try {
            let userData = await AsyncStorage.getItem('access_token');
            let data = JSON.parse(userData);
            this.setState({access_token: data})
            this._onCheckUser()
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    _onCheckUser = async () => {
        if (this.state.access_token === null) {
            this.props.navigation.replace('Welcome');
        } else{
            this.props.navigation.replace('Utama');
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={{ 
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1 }}>
                    <ActivityIndicator size='large' color='#EE4A4A' />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#FFF'
    },
});