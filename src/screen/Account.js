import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { addMessageReducer } from '../action/message';
import SideBar from '../component/SideBar';
import Segment from '../component/Segment';
import styles from '../styles';

const style = StyleSheet.create({
    todo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    },
    todoDetail: {
        backgroundColor: '#E4E4E4',
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
        color: '#000000'
    },
    todoDetailValue: {
        // alignSelf: "flex-end",
        fontSize: 14,
        color: '#707070'
    }, 
    todoAction: {
        fontSize: 24,
        fontWeight: 'bold',
    }

});

class Account extends Component {
    state = {
        user: {},
        transactions: [],
        refreshing: false,
        sideBarOpen: false,
        loading: false
    }

    fetchTransaction = () => {

    }

    openSideBar = () => this.setState({ sideBarOpen: true })

    closeSideBar = () => this.setState({ sideBarOpen: false })

    render() {
        const { navigation } = this.props;
        const  { data, refreshing, transactions, sideBarOpen, loading } = this.state

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

                <Text style={styles.Header}>ACCOUNT</Text>
                <View style={[styles.between, { alignItems: 'center', marginBottom: 9 }]}>
                    <Text style={styles.title}>Open My Profile</Text>

                    <TouchableOpacity disabled={loading} style={styles.icon} onPress={() => this.openSideBar()}>
                        <Ionicons name={'ios-person'} size={30} color={"#FFFFFF"}/>
                    </TouchableOpacity>  
                </View>

                <Text style={styles.title}>Transactions</Text>
                <Segment>
                    <FlatList 
                    onRefresh={() => this.fetchTransaction()}
                    refreshing={refreshing}
                    data={transactions}
                    renderItem={({ item, index }) => 
                        (<View> 
                            <Text style={style.todo}>{item.name}</Text>                       
                            <View style={styles.between}>
                                <TouchableOpacity style={styles.icon} onPress={() => this.setState({ selectedIndex: (selectedIndex === index)? -1 : index })}>
                                    <Ionicons name={selectedIndex === index? 'ios-arrow-dropup-circle' : 'ios-arrow-dropdown-circle'} color={'#707070'} size={30}/>
                                </TouchableOpacity>

                                <View style={styles.row}>
      
                                </View>
                            </View>
                            {(selectedIndex === index) && (<View style={style.todoDetail}>
                                <View>
                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Settings</Text>

                                        <Text style={style.todoDetailValue}>{ 'none'}</Text>
                                    </View>
                                </View>
   
                            </View>)}

                            <View style={styles.hairLine} />
                        
                        </View>) 
                    }
                    keyExtractor={(item,index) => index.toString()}
                    />
                </Segment>

                <SideBar sideBarOpen={sideBarOpen} close={() => this.closeSideBar()} >

                </SideBar>
                
            </View>
        )
    }
}


const mapStateToprops = (state) => ({
    
})

const mapDisptachToprops = {
    addMessage: addMessageReducer
}

export default connect(mapStateToprops, mapDisptachToprops)(Account);