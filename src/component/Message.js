import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import styles from '../styles';

const style = StyleSheet.create({
    container: {
        backgroundColor: '#0E0C20',
        borderWidth: 4,
        borderColor: "#FFFFFF",
        padding: 4,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 20
    },
    msg: {
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 16
    },
});


export const Message = () => {
    return (
        <View style={style.container}>
            <Text style={style.msg}></Text>
        </View>
    )
}
