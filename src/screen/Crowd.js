import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { addMessageReducer } from '../action/message';
import Segment from '../component/Segment';
import Table from '../component/Table';
import Guest from '../component/GuestScreen';
import AddGuest from '../component/AddGuestScreen';
import EditGuest from '../component/EditGuestScreen';
import CheckIn from '../component/CheckInScreen';
import SideBar from '../component/SideBar';
import { Chart } from '../component/Chart'
import styles from '../styles';

const style = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row"
    },
    checkIn: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 50,
        padding: 15,
        margin: 5,
        flex: 2
    },
    guest: {
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: 50,
        padding: 15,
        margin: 5,
        flex: 2
    },
    table: {
        backgroundColor: '#FFFFFF',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        padding: 15,
        margin: 5,
    },
    action: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center"
    },
});


class Crowd extends Component {
    constructor (props) {
        super(props);

        this.state = {
            modalOpen: false,
            modalType: '',
            sideBarOpen: false,
            guest: {}
        }
    }
    

    closeModal = () => this.setState({ modalOpen: false, modalType: "" })

    openModal = (type) => this.setState({ modalOpen: true, modalType: type })

    openSideBar = () => this.setState({ sideBarOpen: true })

    closeSideBar = () => this.setState({ sideBarOpen: false })

    render() {
        const { navigation, addMessage, user, event, polls, tables, organizers } = this.props;
        const { modalOpen, modalType, sideBarOpen, guest } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("Notification")}>
                        <Ionicons name={'ios-notifications-outline'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={() => this.openModal('Guest')}>
                        <Ionicons name={'ios-add'} color={'white'} size={40}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>CROWD CONTROL</Text>

                <View style={style.row}>
                    <TouchableOpacity style={style.checkIn} onPress={() => this.openModal('CheckIn')}>
                        <Text style={style.action}>Check In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.guest} onPress={() => this.openSideBar()}>
                        <Text style={style.action}>Guest</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={style.table} onPress={() => this.openModal('Table')}>
                    <Text style={style.action}>Table Service</Text>
                </TouchableOpacity>

                <Segment>
                    <Chart invited={event.invited} accepted={event.accepted} checkedIn={event.checkedIn} absent={(event.accepted - event.checkedIn)} />
                </Segment>

                <Modal visible={modalOpen} onRequestClose={() => this.closeModal()} onDismiss={() => this.closeModal()} statusBarTranslucent animationType={"slide"}>
                    {(modalType === "CheckIn") && (<CheckIn polls={polls} close={() => this.closeModal()} addMessage={(msg) => addMessage(msg)} />)}
                    {(modalType === "Guest") && (<AddGuest user={user} close={() => this.closeModal()} addMessage={(msg) => addMessage(msg)} />)}
                    {(modalType === 'EditGuest') && (<EditGuest polls={polls} tables={tables} organizers={organizers} guest={guest} close={() => this.closeModal()} addMessage={(msg) => addMessage(msg)} />)}
                    {(modalType === "Table") && (<Table polls={polls} tables={tables} organizers={organizers} editGuest={(user) => this.setState({ guest: user }, () => this.openModal('EditGuest'))} close={() => this.closeModal()} addMessage={(msg) => addMessage(msg)} />)}
                </Modal>

                <SideBar sideBarOpen={sideBarOpen} close={() => this.closeSideBar()} >
                    <Guest polls={polls} tables={tables} organizers={organizers} editGuest={(user) => this.setState({ guest: user }, () => this.openModal('EditGuest'))} close={() => this.closeSideBar()}/>
                </SideBar>                
            </View>
        )
    }
}


const mapStateToprops = (state) => ({
    user: state.userReducer,
    event: state.eventReducer,
    polls: state.pollsReducer,
    tables: state.tablesReducer,
    organizers: state.organizersReducer
})

const mapDisptachToprops = {
    addMessage: addMessageReducer
}

export default connect(mapStateToprops, mapDisptachToprops)(Crowd);