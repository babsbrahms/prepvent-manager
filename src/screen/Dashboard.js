import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { addMessageReducer } from '../action/message';
import Segment from '../component/Segment';
import { Budget } from '../component/Budget';
import styles from '../styles';
import DisplayPoll from "../component/DisplayPoll"

//ios-rainy; ios-thunderstorm; ios-sunny; ios-snow; ios-partly-sunny; ios-moon; ios-cloudy; ios-cloudy-night;

const style = StyleSheet.create({
    top: {
        minHeight: 100,
        width: '100%',
        backgroundColor: "#FFFFFF",
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
    },
    name: {
        fontSize: 20,
        color: '#707070',
        fontWeight: '300',
        textAlign: 'center'
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
    },
    otherContainer: {
        padding: 5,
        backgroundColor: '#E4E4E4',
        width: '65%',
        margin: 3,
        marginTop: 5,
        marginBottom: 32,
        borderRadius: 20,
        flex: 1

    },
    otherName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#0E0C20"
    }

});


class Dashboard extends Component {
    state = {
        otherEvents: [
            {
                name: 'Durban',
                time: '12:30 pm - 3:00 pm',
                location: 'Taiwo Road, Ilorin, Kwara'
            },
            {
                name: 'Eid Adha',
                time: '8:00 am - 11:00 ap',
                location: 'Taiwo Road, Ilorin, Kwara'
            }
        ]
    }

    render() {
        const { navigation, polls, event, } = this.props;
        const {  otherEvents } = this.state;

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
                    <View>
                        <Text style={style.name} numberOfLines={1}>PrepVENT Manager launch party</Text>
                        <View style={[styles.around, { alignItems: 'center'}]}>
                            <Ionicons name={'ios-cloudy'} color={'#0E0C20'} size={60}/>
                            <View>
                                <Text style={style.date}>Kwara, Ilorin</Text>
                                <Text style={style.date}>Cloudy</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={style.name} numberOfLines={1}>Other Events In Kwara State</Text>
                        <ScrollView horizontal>
                            {otherEvents.map((other, i) => (
                                <TouchableOpacity key={i} style={style.otherContainer}>
                                    <Text style={style.otherName}>{other.name}</Text>
                                    <Text style={style.date}>{other.time}</Text>
                                    <Text style={style.date}>{other.location}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
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
                            <Text style={style.statsValue}>{event.accepted}</Text>
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
                            <Text style={style.statsTitle}>Download Guests Record</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.stats} onPress={() => {}}>
                            <View style={style.icon}>
                                <Ionicons name={'ios-download'} color={'#000000'} size={50}/>
                            </View>
                            
                            <Text style={style.statsTitle}>Download Expenditure Record</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}


const mapStateToprops = (state) => ({
    event: state.eventReducer,
    polls: state.pollsReducer
})

const mapDisptachToprops = {
    addMessage: addMessageReducer
}

export default connect(mapStateToprops, mapDisptachToprops)(Dashboard);