import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Segment from './Segment';
import Option from './Option';
import SideBar from "./SideBar";
import AddContact from "./AddContact";
import styles from '../styles';


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
                    name: "settings",
                    type: "Boolean",
                    required: false,
                    value: "settings",
                },
                {
                    name: "communication",
                    type: "Boolean",
                    required: false,
                    value: "communication",
                },
                {
                    name: "task",
                    type: "Boolean",
                    required: false,
                    value: "task",
                },
                {
                    name: "invite",
                    type: "Number",
                    required: false,
                    value: "invite",
                },
                {
                    name: "check in",
                    type: "Boolean",
                    required: false,
                    value: "checkIn",
                },
                {
                    name: "table chart",
                    type: "Boolean",
                    required: false,
                    value: "tableChart",
                },
                {
                    name: "oragnizer",
                    type: "Boolean",
                    required: false,
                    value: "organizer",
                },
            ],
            data: {
                name: "",
                email: "",
                phoneNumber: "",
                settings : false,
                communication: false,
                task: false,
                invite: 200,
                checkIn: false,
                tableChart: false,
                organizer: false
            },
            selected: {},
            inputValue: 0,
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

        this.setState({ data: { ...this.state.data, [selected.name]: value } }, () => console.log(this.state.data) )
    }

    addInvite = () => {
        const { inputValue } = this.props;
        this.setState({ data: { ...this.state.data, invite: inputValue } })
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
        const { optionOpen, guild, data, selected, inputValue, sideBarOpen, loading } = this.state;

        return (
            <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
                <View style={{ backgroundColor: "#0E0C20", height: getStatusBarHeight()}} />
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
                            {guild.map(key => (
                            <View key={key.name} style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>{key.name}</Text>

                                <TouchableOpacity onPress={() => this.changeAccess(key, data[key.value])} style={style.action}>
                                    {(key.type === "Number") && (<Text style={style.todoDetailValue}>{data[key.value]}</Text>)}
                                    {(key.type === "Boolean") && (<Text style={style.todoDetailValue}>{!!data[key.value]? 'grant': 'deny'}</Text>)}
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>))}
                        </ScrollView>

                        <View>
                            {((selected.type === "String") || (selected.type === "Number")) && (
                                <View style={styles.detailsRow}>
                                    <TextInput 
                                        style={styles.detailsInput} 
                                        placeholder={`Enter ${selected.name}`} 
                                        placeholderTextColor="#0E0C20"
                                        value={inputValue}
                                        keyboardType={"number-pad"}
                                        autoFocus
                                        onChange={(e) => this.setData(e.nativeEvent.text)}
                                        onSubmitEditing={(e) => this.setData(e.nativeEvent.text)}
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
            </KeyboardAvoidingView>
        )
    }
}
