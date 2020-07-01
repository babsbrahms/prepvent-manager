import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

const style = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 25,
        color: '#000000', 
        marginTop: 9
    },
    to: {
        fontSize: 24,
        marginBottom: 9,
        color: '#707070'
    },
    link: {
        color: '#707070',
        fontSize: 24
    }
});

export const Rules = ({selectCheckIn, checkIn, selectTable, tableChart }) => {
    return (
    <View style={{ flex: 1 }}>
        <View>  
            <Text style={style.title}>Check In Rules</Text>
            
            <View>
                <View style={styles.row}>                           
                    <TouchableOpacity style={styles.icon} onPress={() => selectCheckIn('invite')}>
                        <Ionicons name={checkIn === 'invite'? 'ios-radio-button-on' : 'ios-radio-button-off'} size={30} color={checkIn === 'invite'? '#2DF19C' :'#707070'}/>
                    </TouchableOpacity>

                    <Text  style={style.to}>All guest invited</Text>
                </View>

                <View style={styles.row}>                           
                    <TouchableOpacity style={styles.icon} onPress={() => selectCheckIn('accepted')}>
                        <Ionicons name={checkIn === 'accepted'? 'ios-radio-button-on' : 'ios-radio-button-off'} size={30} color={checkIn === 'accepted'? '#2DF19C' :'#707070'}/>
                    </TouchableOpacity>

                    <Text  style={style.to}>Only guest that accepted invitation</Text>
                </View>
            </View>
   
            <Text style={style.title}>Table Chart Rules</Text>
            
            <View>
                <View style={styles.row}>                           
                    <TouchableOpacity style={styles.icon} onPress={() => selectTable('invite')}>
                        <Ionicons name={tableChart === 'invite'? 'ios-radio-button-on' : 'ios-radio-button-off'} size={30} color={tableChart === 'invite'? '#2DF19C' :'#707070'}/>
                    </TouchableOpacity>

                    <Text  style={style.to}>All guest invited</Text>
                </View>

                <View style={styles.row}>                           
                    <TouchableOpacity style={styles.icon} onPress={() => selectTable('accepted')}>
                        <Ionicons name={tableChart === 'accepted'? 'ios-radio-button-on' : 'ios-radio-button-off'} size={30} color={tableChart === 'accepted'? '#2DF19C' :'#707070'}/>
                    </TouchableOpacity>

                    <Text  style={style.to}>Only guest that accepted invitation</Text>
                </View>
            </View>
        </View>
    </View>
    )
}
