import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, FlatList } from 'react-native';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
import { connect } from "react-redux";
import { addMessageReducer } from '../action/message';
import AddTask from '../component/AddTaskScreen';
import {Budget} from '../component/Budget';
import styles from '../styles';


const style = StyleSheet.create({
    task: {
        borderRadius: 20,
        marginTop: 0,
        marginBottom: 9,
        width: '100%',
        height: '70%',
        backgroundColor: '#FFFFFF',
        padding: 5,
    },
    budget: {
        borderRadius: 20,
        marginTop: 0,
        marginBottom: 9,
        width: '100%',
        height: '30%',
        backgroundColor: '#FFFFFF',
        padding: 5,
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
        marginBottom: 9
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


    
class Task extends Component {
    state = {
        modalOpen: false,
        modalType: "",
        refreshing: false,
        selectedIndex: -1,
        data: [
            {
                task: "Buy Cow",
                alert : 1200090,
                budget: 2000,
                assign : { name: "olayinka ibrahim", phoneNumber: "+23455465657"},
                deadline: 1132324345,
                done: true
            },
            {
                task: "Rent Chair",
                alert : 1200090,
                budget: 2000,
                assign : { name: "olayinka ibrahim", email: "ib@gmail.com", phoneNumber: "+23455465657"},
                deadline: 1132324345,
                done: false
            },
            {
                task: "Get Cook",
                alert : 1200090,
                budget: 2000,
                assign : { name: "olayinka ibrahim", phoneNumber: "+23455465657"},
                deadline: '',
                done: true
            },
            {
                task: "Bake Cake",
                alert : 1200090,
                budget: 2000,
                assign : { name: "olayinka ibrahim", email: "ib@gmail.com"},
                deadline: 1132324345,
                done: false
            },
            {
                task: "Do table chart",
                alert : 1200090,
                budget: 2000,
                assign : { name: "olayinka ibrahim", phoneNumber: "+23455465657"},
                deadline: 1132324345,
                done: true
            },
        ]
    }

    closeModal = () => this.setState({ modalOpen: false, modalType: "" })

    openModal = (type) => this.setState({ modalOpen: true, modalType: type })


    changeTaskStatus = (task, index) => {
        const { data } = this.state;

        data[index].done = !data[index].done;
        this.setState({ data: [...data ] })
    }

    render() {
        const { navigation, addMessage } = this.props;
        const {  modalOpen, modalType, refreshing, selectedIndex, data } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("Notification")}>
                        <Ionicons name={'ios-notifications-outline'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={() => this.setState({ selectedIndex: -1 }, () => {
                        this.openModal("")
                    })}>
                        <Ionicons name={'ios-add'} color={'white'} size={40}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>TASKS</Text>

                <View style={{ width: '100%', height: "100%", flex: 1 }}>
                    <View style={style.task}>
                    <FlatList 
                        onRefresh={() => {}}
                        refreshing={refreshing}
                        data={data}
                        renderItem={({ item, index }) => 
                            (<View> 
                                <Text style={style.todo}>{item.task}</Text>                       
                                <View style={styles.between}>
                                    <TouchableOpacity style={styles.icon} onPress={() => this.setState({ selectedIndex: (selectedIndex === index)? -1 : index })}>
                                        <Ionicons name={selectedIndex === index? 'ios-arrow-dropup-circle' : 'ios-arrow-dropdown-circle'} color={'#E4E4E4'} size={30}/>
                                    </TouchableOpacity>

                                    <View style={[styles.row, { alignItems: "center"}]}>
                                        {(!!item.assign.email) && (<TouchableOpacity style={styles.icon} onPress={() => Communications.email([`${item.assign.email}`],null,null,'','')}>
                                            <Ionicons name={'ios-mail'} color={'#707070'} size={30}/>
                                        </TouchableOpacity>)}

                                        {(!!item.assign.phoneNumber) && (<TouchableOpacity style={styles.icon} onPress={() => Communications.phonecall(item.assign.phoneNumber, false)}>
                                            <Ionicons name={'ios-call'} color={'#707070'} size={30}/>
                                        </TouchableOpacity>)}

                                        <TouchableOpacity style={styles.icon} onPress={() => this.changeTaskStatus(item, index)}>
                                            <Ionicons name={item.done? 'ios-checkmark' : 'ios-close'} color={item.done? '#2DF19C' : '#EC3636'} size={35}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {(selectedIndex === index) && (<View style={style.todoDetail}>
                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Alert</Text>

                                        <Text style={style.todoDetailValue}>{item.alert ? moment(item.alert).format("ddd do MMM YYYY") : "none"}</Text>
                                    </View>


                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Assign</Text>

                                        <Text style={style.todoDetailValue}>{item.assign? item.assign.name : "none"}</Text>
                                    </View>

                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Budget</Text>

                                        <Text style={style.todoDetailValue}>{item.budget? item.budget : "none"}</Text>
                                    </View>

                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Deadline</Text>

                                        <Text style={style.todoDetailValue}>{item.deadline? moment(item.deadline).format("ddd do MMM YYYY") : "none"}</Text>
                                    </View>

                                    <View style={styles.between}>
                                        <TouchableOpacity style={styles.icon} onPress={() =>  this.openModal("")}>
                                            <Text style={[style.todoAction, { color: '#2DF19C' }]}>EDIT</Text>
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity style={styles.icon} onPress={() => {}}>
                                            <Text style={[style.todoAction, { color: '#EC3636' }]}>DELETE</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>)}

                                <View style={styles.hairLine} />
                            
                            </View>) 
                        }
                        keyExtractor={(item,index) => index.toString()}
                        />
                    </View>
    
                    <View style={style.budget}>
                        <ScrollView>
                            <Budget />
                        </ScrollView>
                    </View>
                </View>
                <Modal visible={modalOpen} onRequestClose={() => this.closeModal()} onDismiss={() => this.closeModal()} statusBarTranslucent animationType={"slide"}>
                    <AddTask selectedData={data[selectedIndex]} selectedIndex={selectedIndex} close={() => this.closeModal()} addMessage={(msg) => addMessage(msg)} />
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

export default connect(mapStateToprops, mapDisptachToprops)(Task);
 