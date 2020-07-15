import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
const style = StyleSheet.create({
    frontDrop: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#0E0C20",
        opacity: 0.6,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 5,
        left: 5,
        zIndex: 2,
        margin: 0,
        padding: 0,
        borderRadius: 20,
        
    }
});

const Segment = ({ color, disabled, loading, marginTop, children }) => {
    return (
        <View style={{ borderRadius: 20, marginTop: marginTop? marginTop : 15, width: '100%', minHeight: 100, backgroundColor: color? color: 'white', padding: 5, flex: 1 }}>
            
            {(disabled || loading) && (<View style={style.frontDrop}>
                {(loading) && (<ActivityIndicator color='#2DF19C' size='large'/>)}
            </View>)}
            <View style={{ width: '100%', height: '100%' }}>
                {children}
            </View>
            
        </View>
    )
}

export default Segment;