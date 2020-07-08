import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { addMessageReducer } from '../action/message';
import Segment from '../component/Segment';
import { Budget } from '../component/Budget';
import styles from '../styles';
import DisplayPoll from "../component/DisplayPoll"

const style = StyleSheet.create({
    top: {
        height: 250,
        width: '100%',
        backgroundColor: "#FFFFFF",
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
    },
    container: {
        backgroundColor: '#0E0C20'
    },
    row: {
        display: "flex",
        flexDirection: "row"
    },
    stats: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 30,
        margin: 5,
        flex: 2
    },
    statsValue: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center"
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center"
    },
    task: {
        padding: 5, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '100%', 
        backgroundColor: 'white', 
        flex: 1,
        marginBottom: 10
    },
    date: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0E0C20"
    },
    icon: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    }

});


class Dashboard extends Component {
    state = {
        event: {
            budget: 1200,
            guest: 200,
            organizers: 4,
            expenditure: 540,
        },
        polls: [
            {
                title: "food",
                question: "Choose a food",
                options: {
                    'Fried Rice': 0,
                    'Amala': 0,
                    "Beans": 0
                }
            },
            {
                title: "color",
                question: "Choose a color",
                options: {
                    'Red': 0,
                    'Blue': 0,
                    "Green": 0
                } 
            }
        ]
    }

    render() {
        const { navigation } = this.props;
        const { polls, event } = this.state;

        return (
            <ScrollView style={style.container}>
                <View style={style.top}>
                    <View style={[styles.between, { alignItems: "center"}]}>
                        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Home')}>
                            <Ionicons name={'ios-home'} color={'#707070'} size={30}/>
                        </TouchableOpacity>


                        <Text style={style.date}>25 May 2021</Text>

                        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Wallet')}>
                            <Ionicons name={'ios-wallet'} color={'#707070'} size={30}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.around}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Notification')}>
                        <Ionicons name={'ios-notifications-outline'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Settings')}>
                        <Ionicons name={'ios-cog'} color={'white'} size={30}/>
                    </TouchableOpacity>
                </View>


                <View style={styles.container}>

                    <View style={style.row}>
                        <TouchableOpacity style={style.stats} onPress={() => navigation.navigate('Crowd')}>
                            <Text style={style.statsValue}>{event.guest}</Text>
                            <Text style={style.statsTitle}>Guests</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.stats} onPress={() => navigation.navigate('Organizer')}>
                            <Text style={style.statsValue}>{event.organizers}</Text>
                            <Text style={style.statsTitle}>Organizers</Text>
                        </TouchableOpacity>
                    </View>
                    <Segment>
                        <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                            <Budget expenditure={event.expenditure} budget={event.budget} />
                        </TouchableOpacity>
                    </Segment>



                    <View style={style.task} onPress={() => {}}>
                        <TouchableOpacity> 
                            <Text style={style.statsValue}>Polls</Text>
                            {/* <Text style={style.statsTitle}>Polls</Text> */}
                        </TouchableOpacity>

                        {(polls.length > 0) && (<DisplayPoll polls={polls} />)}
                    </View>

                    <View style={style.row}>
                        <TouchableOpacity style={style.stats} onPress={() => {}}>
                            <View style={style.icon}>
                                <Ionicons name={'ios-download'} color={'#000000'} size={50}/>
                            </View>
                            <Text style={style.statsTitle}>Guests Record</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.stats} onPress={() => {}}>
                            <View style={style.icon}>
                                <Ionicons name={'ios-download'} color={'#000000'} size={50}/>
                            </View>
                            
                            <Text style={style.statsTitle}>Expenditure Record</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}


const mapStateToprops = (state) => ({
    
})

const mapDisptachToprops = {
    addMessage: addMessageReducer
}

export default connect(mapStateToprops, mapDisptachToprops)(Dashboard);