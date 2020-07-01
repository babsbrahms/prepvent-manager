import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Segment from '../component/Segment';
import TableChart from '../component/TableChartScreen';
import Guest from '../component/GuestScreen';
import AddGuest from '../component/AddGuestScreen';
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

export default class Crowd extends Component {
    constructor (props) {
        super(props);

        this.state = {
            modalOpen: false,
            modalType: '',
            sideBarOpen: false,
            guestId: ''
        }
    }
    

    closeModal = () => this.setState({ modalOpen: false, modalType: "" })

    openModal = (type) => this.setState({ modalOpen: true, modalType: type })

    openSideBar = () => this.setState({ sideBarOpen: true })

    closeSideBar = () => this.setState({ sideBarOpen: false })

    render() {
        const { navigation } = this.props;
        const { modalOpen, modalType, sideBarOpen, guestId } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("Notification")}>
                        <Ionicons name={'ios-notifications-outline'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={() => this.setState({ guestId: '' }, () => this.openModal('Guest'))}>
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
                <TouchableOpacity style={style.table} onPress={() => this.openModal('TableChart')}>
                    <Text style={style.action}>Table Chart</Text>
                </TouchableOpacity>

                <Segment>
                    <Chart />
                </Segment>

                <Modal visible={modalOpen} onRequestClose={() => this.closeModal()} onDismiss={() => this.closeModal()} statusBarTranslucent animationType={"slide"}>
                    {(modalType === "CheckIn") && (<CheckIn close={() => this.closeModal()} />)}
                    {(modalType === "Guest") && (<AddGuest guestId={guestId} close={() => this.closeModal()} />)}
                    {(modalType === "TableChart") && (<TableChart editGuest={(uid) => this.setState({ guestId: uid }, () => this.openModal('Guest'))} close={() => this.closeModal()} />)}
                </Modal>

                <SideBar sideBarOpen={sideBarOpen} close={() => this.closeSideBar()} >
                    <Guest editGuest={(uid) => this.setState({ guestId: uid }, () => this.openModal('Guest'))} close={() => this.closeSideBar()}/>
                </SideBar>                
            </View>
        )
    }
}
