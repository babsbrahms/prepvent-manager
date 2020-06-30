import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Switch } from 'react-native';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const style = StyleSheet.create({
    title: {
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 25
    },
    to: {
        color: '#FFFFFF',
        fontSize: 24,
        marginBottom: 9  
    },
    link: {
        color: '#707070',
        fontSize: 24
    }
});

export const Rules = ({ title, selectRule, value }) => {
    return (
    <View>
        <Text style={[style.title, { color: '#000000', marginTop: 9 }]}>{title}</Text>
        
        <View style={{ width: '70%', height: '100%', color: "#707070"}}>
            <View style={styles.row}>                           
                <TouchableOpacity style={styles.icon} onPress={() => selectRule('invite')}>
                    <Ionicons name={value === 'invite'? 'ios-radio-button-on' : 'ios-radio-button-off'} size={30} color={value === 'invite'? '#2DF19C' :'#707070'}/>
                </TouchableOpacity>

                <Text  style={[style.to, { color: '#707070'}]}>All guest invited</Text>
            </View>

            <View style={styles.row}>                           
                <TouchableOpacity style={styles.icon} onPress={() => selectRule('accepted')}>
                    <Ionicons name={value === 'accepted'? 'ios-radio-button-on' : 'ios-radio-button-off'} size={30} color={value === 'accepted'? '#2DF19C' :'#707070'}/>
                </TouchableOpacity>

                <Text  style={[style.to, { color: '#707070'}]}>Only guest that accepted invitation</Text>
            </View>
        </View>
    </View>
    )
}
