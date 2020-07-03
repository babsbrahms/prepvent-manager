import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { addMessageReducer } from '../action/message';
import Event from '../component/Event';
import styles from '../styles';


class Settings extends Component {
    state = {
        data: {

        }
    }

    render() {
        const { navigation } = this.props;
        const  { data } = this.state

        return (
            <View style={styles.container}>
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                        <Ionicons name={'ios-arrow-back'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={() => {}}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>SETTINGS</Text>

                
                <Event />
                
            </View>
        )
    }
}


const mapStateToprops = (state) => ({
    
})

const mapDisptachToprops = {
    addMessage: addMessageReducer
}

export default connect(mapStateToprops, mapDisptachToprops)(Settings);