import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const style = StyleSheet.create({
    bar: {
        borderRadius: 20,
        marginTop: 3,
        marginBottom: 3,
        width: '100%',
        height: 20,
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
        textAlign: 'center'
    },
    description: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#707070',
        textAlign: 'center',
        marginBottom: 9
    },

})

export const Budget = ({ budget= 0, expenditure = 0 }) => {

    const width = Math.max(budget, expenditure)
    
    return (
        <View>
            <Text style={style.title}>Budget</Text>
            <View style={style.bar}>
                <View style={[style.slide, { backgroundColor: '#2DF19C', width: `${(budget/width)*100}%` }]}/>
            </View>
            <Text style={style.description}>${budget}</Text>

            
            <Text style={style.title}>Expenditure</Text>
            <View style={style.bar}>
                <View style={[style.slide, { backgroundColor: '#EC3636', width: `${(expenditure/width)*100}%` }]}/>
            </View>
            <Text style={style.description}>${expenditure}</Text>
        </View>
    )
}
