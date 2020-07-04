import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Segment from './Segment';
import Option from './Option';
import SideBar from "./SideBar";
import AddContact from "./AddContact";
import styles from '../styles';
import Message from "./Message"


const style = StyleSheet.create({
    title: {
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 25
    },
    to: {
        color: '#FFFFFF',
        fontSize: 24,
        marginBottom: 20
    },
    link: {
        color: '#707070',
        fontSize: 24
    },
    
    todoDetailIndex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 9
    },
    todoDetailKey: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#707070'
    },
    todoDetailValue: {
        fontSize: 14,
        color: '#707070'
    },
    action: {
        display: "flex",
        flexDirection: "row",
        padding: 8, 
        alignItems: 'center'
    }
});

export default class AddOrganizer extends Component {

    constructor(props) {
        super(props);

        this.state ={ 
            optionOpen: false,
            guild: [
                {
                    name: "Check In",
                    type: "Boolean",
                    required: false,
                    value: "checkIn",
                }, 
                {
                    name: "Communication",
                    type: "Boolean",
                    required: false,
                    value: "communication",
                },
  
                {
                    name: "Invite",
                    type: "Number",
                    required: false,
                    value: "invite",
                },
                {
                    name: "Oranigzer",
                    type: "Boolean",
                    required: false,
                    value: "organizer",
                },
                {
                    name: "Table Chart",
                    type: "Boolean",
                    required: false,
                    value: "tableChart",
                },
                {
                    name: "Task",
                    type: "Boolean",
                    required: false,
                    value: "task",
                },
                {
                    name: "Settings",
                    type: "Boolean",
                    required: false,
                    value: "settings",
                },
            ],
            data: {
                name: "",
                email: "",
                phoneNumber: "",
                settings : false,
                communication: false,
                task: false,
                invite: 0,
                checkIn: false,
                tableChart: false,
                organizer: false
            },
            selected: {},
            sideBarOpen: false,
            loading: false
        }
    }

    componentDidMount() {
        const { selectedIndex, selectedData } = this.props;

        if (selectedIndex !== -1) {
            this.setState({ data: selectedData })
        }
    }

    openSideBar = () => this.setState({ sideBarOpen: true })

    closeSideBar = () => this.setState({ sideBarOpen: false })

    openOption = () => this.setState({ optionOpen: true })

    closeOption = () => this.setState({ optionOpen: false })

    changeAccess = (key, value) => this.setState({ selected: key }, () => {
        if (key.type === "Boolean") {   
            this.setData(!value)        
        } else if (key.type === "Number") {

        }
    })

    setData = ( value) => {
        const {selected} = this.state;

        this.setState({ data: { ...this.state.data, [selected.value]: value } }, () => console.log(this.state.data) )
    }

    addContact = contact => {
        this.setState({ data: { 
            ...this.state.data, 
            name: contact.name, 
            phoneNumber: contact.phoneNumber, 
            email: contact.email 
        } }, () => {
            this.closeSideBar()
        })
    }

    submit = () => {
        const { data } = this.state;

        this.setState({ loading: true })
    }

    validate = () => {

    }


    render() {
        const { close, selectedIndex } = this.props;
        const { optionOpen, guild, data, selected, sideBarOpen, loading } = this.state;

        return (
        <View style={{ width: '100%', height: "100%", flex: 1 }}>
            <View style={styles.container}>
                <View style={{ backgroundColor: "#0E0C20", height: getStatusBarHeight(true)}} />
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => close()}>
                        <Ionicons name={'ios-arrow-back'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={() => this.submit()}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>{selectedIndex === -1? 'ADD' : 'EDIT'} ORGANIZER</Text>

                <View style={[styles.between, { alignItems: 'center'}]}>
                    <Text style={styles.title}>Organizer</Text>

                    {(selectedIndex === -1) && (<TouchableOpacity disabled={loading} style={styles.icon} onPress={() => this.openSideBar()}>
                        <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                    </TouchableOpacity>)}  
                </View>
                <Text style={style.to}>{data.name}</Text>

                <Text style={styles.title}>Access</Text>
                <Segment loading={loading}>
                    <View style={styles.details}>
                        <ScrollView>
                            
                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Check In</Text>

                                <TouchableOpacity onPress={() => this.changeAccess(guild[0], data.checkIn)} style={style.action}>
                                    <Text style={style.todoDetailValue}>{!!data.checkIn? 'grant': 'deny'}</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>

                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Communication</Text>

                                <TouchableOpacity onPress={() => this.changeAccess(guild[1], data.communication)} style={style.action}>
                                    <Text style={style.todoDetailValue}>{!!data.communication? 'grant': 'deny'}</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>

                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Invite</Text>

                                <TouchableOpacity onPress={() => this.changeAccess(guild[2], data.invite)} style={style.action}>
                                    <Text style={style.todoDetailValue}>{data.invite}</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>

                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Organizer</Text>

                                <TouchableOpacity onPress={() => this.changeAccess(guild[3], data.organizer)} style={style.action}>
                                    <Text style={style.todoDetailValue}>{!!data.organizer? 'grant': 'deny'}</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>

                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Table Chart</Text>

                                <TouchableOpacity onPress={() => this.changeAccess(guild[4], data.tableChart)} style={style.action}>
                                    <Text style={style.todoDetailValue}>{!!data.tableChart? 'grant': 'deny'}</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>

                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Task</Text>

                                <TouchableOpacity onPress={() => this.changeAccess(guild[5], data.task)} style={style.action}>
                                    <Text style={style.todoDetailValue}>{!!data.task? 'grant': 'deny'}</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>

                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Settings</Text>

                                <TouchableOpacity onPress={() => this.changeAccess(guild[6], data.settings)} style={style.action}>
                                    <Text style={style.todoDetailValue}>{!!data.settings? 'grant': 'deny'}</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                        <View>
                            {((selected.type === "String") || (selected.type === "Number")) && (
                                <View style={styles.detailsRow}>
                                    <TextInput 
                                        style={styles.detailsInput} 
                                        placeholder={`Enter ${selected.name}`} 
                                        placeholderTextColor="#0E0C20"
                                        value={String(data[selected.value])}
                                        keyboardType={"number-pad"}
                                        autoFocus
                                        onChange={(e) => this.setData(Number(e.nativeEvent.text))}
                                        onSubmitEditing={(e) => this.setData(Number(e.nativeEvent.text))}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </Segment>
                <Option title={''} openModal={optionOpen} closeModal={() => this.closeOption()}>

                </Option>

                <SideBar sideBarOpen={sideBarOpen} close={() => this.closeSideBar()} >
                    <AddContact 
                        selection="single" 
                        addContact={(contact) => this.addContact(contact)} 
                    />
                </SideBar>
            </View>
            <Message />
        </View>
        )
    }
}
