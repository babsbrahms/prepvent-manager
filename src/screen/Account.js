import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { addMessageReducer } from '../action/message';
import SideBar from '../component/SideBar';
import Segment from '../component/Segment';
import styles from '../styles';
import Profile from '../component/Profile'

const style = StyleSheet.create({
    top: {
        minHeight: 100,
        width: '100%',
        backgroundColor: '#E4E4E4',
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
    },
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
    button: {
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#2DF19C',
    },
    btnText: {
        fontSize: 24,
        color: "#FFFFFF",
        fontWeight: 'bold',
        textAlign: "center"
    },
    messageText: {
        color: '#E4E4E4',
        fontSize: 18,
    },
    messageLink: {
        borderBottomColor: '#E4E4E4',
        padding: 4,
        marginHorizontal: 3,
        borderBottomWidth: 4,
    },
    messageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    },
    date: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0E0C20"
    },

});

class Account extends Component {
    state = {
        user: this.props.user,
        transactions: [1, 2, 3, 4, 5],
        refreshing: false,
        sideBarOpen: false,
        loading: false,
        active: 'Transaction',
        selectedIndex: -1
    }

    fetchTransaction = () => {

    }

    openSideBar = () => this.setState({ sideBarOpen: true })

    closeSideBar = () => this.setState({ sideBarOpen: false })

    selectActive = active => this.setState({ active })

    saveUser = user => {
        this.closeSideBar();
        this.setState({ loading: true, user });
    }

    render() {
        const { navigation } = this.props;
        const  { data, refreshing, transactions, sideBarOpen, loading, active, user, selectedIndex } = this.state

        return (
            <View style={styles.container}>
                <View style={style.top}>
                    <View style={[styles.between, { alignItems: "center"}]}>
                        <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                            <Ionicons name={'ios-arrow-back'} color={'#707070'} size={30}/>
                        </TouchableOpacity>

                        <Text style={style.date}>ACCOUNT</Text>

                        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Authenication')}>
                            <Ionicons name={'ios-log-out'} color={'#707070'} size={30}/>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.around, { marginBottom: 9, marginHorizontal: 9 }]}>
                        
                        <View>
                            <Text style={[styles.title, { color: "#0E0C20"}]}>{user.name}</Text>
                            <Text>{user.phoneNumber}</Text>
                            <Text>{user.email}</Text>
                            {(!loading) && (<TouchableOpacity disabled={loading} style={styles.icon} onPress={() => this.openSideBar()}>
                                <Ionicons name={'ios-settings'} size={20} color={"#0E0C20"}/>
                            </TouchableOpacity>)}  

                            {(!!loading) && (
                                <ActivityIndicator color={"#0E0C20"} />
                            )}
                        </View >

                        <View>
                            <Image source={user.image} style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#707070', margin: 2 }} />

                        </View>
                    </View>

                </View>
                
                <View style={styles.around}>
                    <TouchableOpacity 
                        disabled={loading}
                        style={[style.messageLink, { borderBottomColor: active === 'Transaction'? '#2DF19C' : '#E4E4E4'}]}
                        onPress={() => this.selectActive('Transaction')}
                    >
                        <Text style={style.messageText}>Transaction</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={loading}
                        style={[style.messageLink, { borderBottomColor: active === 'Subscription'? '#2DF19C' : '#E4E4E4'}]}
                        onPress={() => {
                            this.selectActive('Subscription');
                        }}
                    >
                        <Text style={style.messageText}>Subscription</Text>
                    </TouchableOpacity>
                </View>

                {(active === 'Transaction') && (<Segment color="#E4E4E4">
                    <FlatList 
                    ListHeaderComponent={() => (
                        <View>                        
                            <View style={styles.between}>
                                <Text style={[styles.title, { color: '#0E0C20'}]}>Availble Balance</Text>
                                <Text style={[styles.title, { color: '#2DF19C'}]}>$200.00</Text>
                            </View>

                            <View style={styles.hairLine} />
                        </View>
                    )}
                    onRefresh={() => this.fetchTransaction()}
                    refreshing={refreshing}
                    data={transactions}
                    renderItem={({ item, index }) => 
                        (<View> 
                            <View>       
                                <Text style={style.todo}>Send Bulk invitation</Text>
                                <Text >Deposit</Text>

                                <Text>21-4-2019</Text>
        
                                {/* <Text>0002023232</Text> */}
                            </View>                
                            <View style={[styles.between, { alignItems: 'center' }]}>
                                <TouchableOpacity style={styles.icon} onPress={() => this.setState({ selectedIndex: (selectedIndex === index)? -1 : index })}>
                                    <Ionicons name={selectedIndex === index? 'ios-arrow-dropup-circle' : 'ios-arrow-dropdown-circle'} color={'#707070'} size={30}/>
                                </TouchableOpacity>

                                <View style={styles.row}>
                                    <Text style={styles.amount}>$500</Text>
                                </View>
                            </View>
                            {(selectedIndex === index) && (<View style={style.todoDetail}>
                                <View>
                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Transaction Date</Text>

                                        <Text style={style.todoDetailValue}>28-4-2017</Text>
                                    </View>

                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Reference</Text>

                                        <Text style={style.todoDetailValue}>020203283</Text>
                                    </View>

                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Transaction Details</Text>

                                        <Text style={style.todoDetailValue}>Create Biola's birthday</Text>
                                    </View>

                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Deposit</Text>

                                        <Text style={style.todoDetailValue}>--</Text>
                                    </View>


                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Withdrawal</Text>

                                        <Text style={style.todoDetailValue}>$500.00</Text>
                                    </View>


                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Balance</Text>

                                        <Text style={style.todoDetailValue}>$200.00</Text>
                                    </View>


                                </View>
                            </View>)}

                            <View style={styles.hairLine} />
                        
                        </View>) 
                    }
                    keyExtractor={(item,index) => index.toString()}
                    />
                </Segment>)}



                {(active === 'Subscription') && (<ScrollView style={{ marginTop: 10 }}>
                    <Text style={styles.title}>Free</Text>
                    <Segment>
                        <View style={styles.details}>
                            <View>

                            </View>
                            <TouchableOpacity style={style.button}>
                                <Text style={style.btnText}>SELECT</Text>
                            </TouchableOpacity>
                        </View>
                    </Segment>


                    <Text style={styles.title}>Basic</Text>
                    <Segment>
                        <View style={styles.details}>
                            <View>

                            </View>
                            <TouchableOpacity style={style.button}>
                                <Text style={style.btnText}>SELECT</Text>
                            </TouchableOpacity>
                        </View>
                    </Segment>


                    <Text style={styles.title}>Gold</Text>
                    <Segment>
                        <View style={styles.details}>
                            <View>

                            </View>
                            <TouchableOpacity style={style.button}>
                                <Text style={style.btnText}>SELECT</Text>
                            </TouchableOpacity>
                        </View>
                    </Segment>


                    <Text style={styles.title}>Platinum</Text>
                    <Segment>
                        <View style={styles.details}>
                            <View>

                            </View>
                            <TouchableOpacity style={style.button}>
                                <Text style={style.btnText}>SELECT</Text>
                            </TouchableOpacity>
                        </View>
                    </Segment>

                </ScrollView>)}

                <SideBar sideBarOpen={sideBarOpen} close={() => this.closeSideBar()} >
                    <Profile user={user} saveUser={(user) => this.saveUser(user)} />
                </SideBar>
                
            </View>
        )
    }
}


const mapStateToprops = (state) => ({
    user: state.userReducer
})

const mapDisptachToprops = {
    addMessage: addMessageReducer
}

export default connect(mapStateToprops, mapDisptachToprops)(Account);