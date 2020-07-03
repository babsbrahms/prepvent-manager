import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { clearMessageReducer } from "../action/message"

const style = StyleSheet.create({
    container: {
        backgroundColor: '#0E0C20',
        borderWidth: 4,
        borderColor: "#FFFFFF",
        padding: 4,
        position: 'absolute',
        bottom: 0,
        zIndex: 5000,
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


const Message = ({ message, clearMessage }) => {
    let show;

    if (message) {
        show = <TouchableOpacity style={style.container} onPress={() => clearMessage()}>
                    <Text style={style.close}>press to close</Text>
                    <Text style={style.msg}>{message}</Text>    
                </TouchableOpacity> 
    } else {
        show = null
    }

    return (
        show
    )
}
  
const mapStateToprops = (state) => ({
    message: state.messageReducer.message
})


export default connect(mapStateToprops, { clearMessage: clearMessageReducer })(Message);
 