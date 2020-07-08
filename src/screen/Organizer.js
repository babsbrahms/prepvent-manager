import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
import { connect } from "react-redux";
import { addMessageReducer } from '../action/message';
import Segment from '../component/Segment';
import AddOrganizer from '../component/AddOrganizerScreen';
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


class Organizer extends Component {
    state = {
        modalOpen: false,
        modalType: "",
        refreshing: false,
        selectedIndex: -1,
        data:[
            {
                name: "olayinka ibrahim",
                email: "ib@gmail.com",
                phoneNumber: "+2348142319913",
                settings : false,
                communication: false,
                task: true,
                invite: 200,
                checkIn: false,
                tableChart: true,
                organizer: true
            },
            {
                name: "biola ibrahim",
                email: "ib@gmail.com",
                phoneNumber: "+2348142319913",
                settings : false,
                communication: false,
                task: true,
                invite: 200,
                checkIn: false,
                tableChart: true,
                organizer: true
            },
            {
                name: "zharadenn ibrahim",
                phoneNumber: "+2348142319913",
                settings : false,
                communication: false,
                task: true,
                invite: 200,
                checkIn: false,
                tableChart: true,
                organizer: true
            },
            {
                name: "najeeb ibrahim",
                email: "ib@gmail.com",
                settings : false,
                communication: false,
                task: true,
                invite: 200,
                checkIn: false,
                tableChart: true,
                organizer: true
            },
            {
                name: "teslim ibrahim",
                phoneNumber: "+2348142319913",
                settings : false,
                communication: false,
                task: true,
                invite: 200,
                checkIn: false,
                tableChart: true,
                organizer: true
            },

        ]
    }

    closeModal = () => this.setState({ modalOpen: false, modalType: "" })

    openModal = (type) => this.setState({ modalOpen: true, modalType: type })

    removeOragnaizer = (item, index) => {
        
    }

    render() {
        const { navigation, addMessage } = this.props;
        const { refreshing, modalOpen, modalType, selectedIndex, data } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("Notification")}>
                        <Ionicons name={'ios-notifications-outline'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name={'ios-add'} color={'white'} size={40} 
                        onPress={() => this.setState({ selectedIndex: -1 }, () => this.openModal())}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>ORGANIZER</Text>

                <Segment>
                    <FlatList 
                    onRefresh={() => {}}
                    refreshing={refreshing}
                    data={data}
                    renderItem={({ item, index }) => 
                        (<View> 
                            <Text style={style.todo}>{item.name}</Text>                       
                            <View style={styles.between}>
                                <TouchableOpacity style={styles.icon} onPress={() => this.setState({ selectedIndex: (selectedIndex === index)? -1 : index })}>
                                    <Ionicons name={selectedIndex === index? 'ios-arrow-dropup-circle' : 'ios-arrow-dropdown-circle'} color={'#707070'} size={30}/>
                                </TouchableOpacity>

                                <View style={styles.row}>
                                    {(!!item.email) && (<TouchableOpacity style={styles.icon} onPress={() => Communications.email([`${item.email}`],null,null,'','')}>
                                        <Ionicons name={'ios-mail'} color={'#707070'} size={30}/>
                                    </TouchableOpacity>)}

                                    {(!!item.phoneNumber) && (<TouchableOpacity style={styles.icon} onPress={() => Communications.text(item.phoneNumber)}>
                                        <Ionicons name={'ios-chatboxes'} color={'#707070'} size={30}/>
                                    </TouchableOpacity>)}

                                    {(!!item.phoneNumber) && (<TouchableOpacity style={styles.icon} onPress={() => Communications.phonecall(item.phoneNumber, false)}>
                                        <Ionicons name={'ios-call'} color={'#707070'} size={30}/>
                                    </TouchableOpacity>)}
                                </View>
                            </View>
                            {(selectedIndex === index) && (<View style={style.todoDetail}>
                                <View>
                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Settings</Text>

                                        <Text style={style.todoDetailValue}>{!!item.settings? 'grant': 'deny'}</Text>
                                    </View>

                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Communication</Text>

                                        
                                        <Text style={style.todoDetailValue}>{!!item.communication? 'grant': 'deny'}</Text>
                                    
                                    </View>

                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Task</Text>

                                        <Text style={style.todoDetailValue}>{!!item.task? 'grant': 'deny'}</Text>
                                    </View>

                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Invite</Text>

                                        <Text style={style.todoDetailValue}>{item.invite || 0}</Text>
                                    </View>


                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Check In</Text>

                                        <Text style={style.todoDetailValue}>{!!item.checkIn? 'grant': 'deny'}</Text>
                                    </View>

                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Table Chart</Text>

                                        <Text style={style.todoDetailValue}>{!!item.tableChart? 'grant': 'deny'}</Text>
                                    </View>


                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Organizer</Text>

                                        <Text style={style.todoDetailValue}>{!!item.organizer? 'grant': 'deny'}</Text>
                                    </View>
                                </View>
                                <View style={styles.between}>
                                    <TouchableOpacity style={styles.icon} onPress={() =>  this.openModal("")}>
                                        <Text style={[style.todoAction, { color: '#2DF19C' }]}>EDIT</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.icon} onPress={() => this.removeOragnaizer(item, index)}>
                                        <Text style={[style.todoAction, { color: '#EC3636' }]}>REMOVE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>)}

                            <View style={styles.hairLine} />
                        
                        </View>) 
                    }
                    keyExtractor={(item,index) => index.toString()}
                    />
                </Segment>
            
                <Modal visible={modalOpen} onRequestClose={() => this.closeModal()} onDismiss={() => this.closeModal()} statusBarTranslucent animationType={"slide"}>
                    <AddOrganizer selectedData={data[selectedIndex]} selectedIndex={selectedIndex} close={() => this.closeModal()} addMessage={(msg) => addMessage(msg)} />
                </Modal>
            </View>
        )
    }
}


const mapStateToprops = (state) => ({
    
})

const mapDisptachToprops = {
    addMessage: addMessageReducer
}

export default connect(mapStateToprops, mapDisptachToprops)(Organizer);