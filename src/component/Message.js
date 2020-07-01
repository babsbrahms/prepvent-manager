import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

const style = StyleSheet.create({
    container: {
        backgroundColor: '#0E0C20',
        borderWidth: 4,
        borderColor: "#FFFFFF",
        padding: 4,
        position: 'absolute',
        bottom: 0,
        left: 8,
        zIndex: 20,
        width: "100%"
    },
    msg: {
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 16,
    },
    close: {
        color: '#FFFFFF',
        fontSize: 12,
        alignSelf: "flex-end"    
    }
});


const Message = ({ msg, close }) => {
    let show;

    if (msg) {
        show = <TouchableOpacity style={style.container} onPress={() => close()}>
                    <Text style={style.close}>press to close</Text>
                    <Text style={style.msg}>Enter a valid phone number with country code for the field</Text>    
                </TouchableOpacity> 
    } else {
        show = null
    }


    return (
        show
        
    )
}
 export default Message;