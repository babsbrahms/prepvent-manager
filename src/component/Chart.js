import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../styles';


const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around',
        width: '100%', 
        height: '100%',
        padding: 12
        
    },
    bar: {
        display: "flex",
        flexDirection: "column-reverse",
        borderRadius: 30,
        marginTop: 3,
        marginBottom: 3,
        width: 30,
        height: '100%',
        backgroundColor: '#E4E4E4',    
    },
    slide: {
        borderRadius: 20,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        textAlignVertical: "center",
        transform: [{ rotate: '90deg'}]
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#707070',
        textAlign: 'center',
        marginBottom: 9,
        textAlignVertical: "center",
        transform: [{ rotate: '90deg'}]
    },

})

export const Chart = ({ invited= 40, accepted = 50, checkedIn = 20, absent = 10 }) => {

    const height = Math.max(invited, accepted, checkedIn, absent)
    
    return (
        <View style={style.container}>
            
            <View style={style.bar}>
                <View style={[style.slide, { backgroundColor: '#2DF19C', height: `${(invited/height)*100}%` }]}/>
            </View>
            <Text style={style.description}>Invited: {invited}</Text>

            
            <View style={style.bar}>
                <View style={[style.slide, { backgroundColor: '#707070', height: `${(accepted/height)*100}%` }]}/>
            </View>
            <Text style={style.description}>Accepted: {accepted}</Text>


            <View style={style.bar}>
                <View style={[style.slide, { backgroundColor: '#0E0C20', height: `${(checkedIn/height)*100}%` }]}/>
            </View>
            <Text style={style.description}>Checked In: {checkedIn}</Text>

            <View style={style.bar}>
                <View style={[style.slide, { backgroundColor: '#EC3636', height: `${(absent/height)*100}%` }]}/>
            </View>
            <Text style={style.description}>Absent: {absent}</Text>
        </View>
    )
}
