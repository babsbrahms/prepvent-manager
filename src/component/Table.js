import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, TextInput, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styles from '../styles';
import Message from "./Message";
import Catering from './Catering';
import TableChart from './TableChartScreen'
import SideBar from './SideBar';
import AddToTable from './AddToTable';


const style = StyleSheet.create({
    controller: {
        borderRadius: 20,
        marginTop: 0,
        marginBottom: 9,
        width: '100%',
      //  height: '25%',
        backgroundColor: "#E4E4E4",
        padding: 5,
        marginTop: 9
    },
    todo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0E0C20'
    },
    todoTable: {
        fontSize: 18,
        color: '#0E0C20'
    },
    todoDetail: {
        backgroundColor: '#707070',
        padding: 3,
    },
    todoDetailIndex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 5,
        padding: 3
    },
    todoDetailKey: {
        // alignSelf: "flex-start",
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    todoDetailValue: {
        // alignSelf: "flex-end",
        fontSize: 14,
        color: '#E4E4E4'
    }, 
    todoAction: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    params: {
        color: '#E4E4E4',
        fontSize: 20,
        textAlign: 'center'
    },
    text: {
        color: '#707070',
        fontSize: 24,  
    },
    link: {
        // borderBottomColor: '#0E0C20',
        padding: 4,
        marginHorizontal: 3,
        borderBottomWidth: 4
    },

});



const Table = ({ close, editGuest, polls, tables, organizers, addMessage }) => { 
        const [mode, setMode] = useState('table')
        const [table, selectTable] = useState(null);
        const [sideBarOpen, changeSideBar] = useState(false);

    return (
    <View style={{ width: '100%', height: "100%", flex: 1,  }}>
        <View style={styles.container}>
            <View style={{ backgroundColor: "#0E0C20", height: getStatusBarHeight(true)}} />
            <View style={styles.between}>
                <TouchableOpacity style={styles.icon} onPress={() => close()}>
                    <Ionicons name={'ios-arrow-back'} color={'white'} size={30}/>
                </TouchableOpacity>

                {(mode === 'table') && (
                <TouchableOpacity style={styles.icon} onPress={() => setMode('meal')}>
                    <Ionicons name={'ios-nutrition'} color={'white'} size={30}/>
                </TouchableOpacity>)}

                {(mode === 'meal') && (
                <TouchableOpacity style={styles.icon} onPress={() => setMode('table')}>
                    <Ionicons name={'ios-grid'} color={'white'} size={30}/>
                </TouchableOpacity>)}
            </View>

            {(mode === 'meal') && (
            <Catering 
                polls={polls} 
                tables={tables} 
                addMessage={(msg) => addMessage(msg)} 
            />)}

            {(mode === 'table') && (
            <TableChart 
                polls={polls} 
                tables={tables} 
                openSideBar={(table) => {
                    selectTable(table);
                    changeSideBar(true)
                }}
                editGuest={(item) => editGuest(item)} 
                addMessage={(msg) => addMessage(msg)}
            />)}
            <SideBar sideBarOpen={sideBarOpen} close={() => changeSideBar(false)} > 
                <AddToTable
                    polls={polls} 
                    tables={tables} 
                    organizers={organizers} 
                    table={table}
                    close={() => changeSideBar(false)}
                    addMessage={(msg) => addMessage(msg)}
                />
            </SideBar>
        </View>
        <Message />
    </View>
    )
}



export default Table
