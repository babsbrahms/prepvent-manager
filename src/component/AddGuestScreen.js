import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DocumentPicker from 'react-native-document-picker';
import Segment from '../component/Segment';
import styles from '../styles';
import Option from './Option'
import SideBar from "./SideBar";
import AddContact from "./AddContact";
import Message from "./Message";


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
    text: {
        color: '#707070',
        fontSize: 24,  
    },
    link: {
        borderBottomColor: '#E4E4E4',
        padding: 4,
        marginHorizontal: 3,
        borderBottomWidth: 4
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
    },
    details: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1
    }
});


export default class AddGuest extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            refreshing: false,
            active: '',
            optionOpen: false,
            sideBarOpen: false,
            inputValue: '',
            inputForm: [
                {
                    name: "Name",
                    type: "String",
                    required: false,
                    value: "name",
                },
                {
                    name: "Email",
                    type: "String",
                    required: false,
                    value: "email",
                },
                {
                    name: "Phone Number",
                    type: "String",
                    required: false,
                    value: "phoneNumber",
                },
            ],
            csvForm: [
                {
                    name: "Name",
                    type: "Option",
                    required: false,
                    value: "name",
                },
                {
                    name: "Email",
                    type: "Option",
                    required: false,
                    value: "email",
                },
                {
                    name: "Phone Number",
                    type: "Option",
                    required: false,
                    value: "phoneNumber",
                },
            ],
            options: [],
            data: {
                name: "",
                email: "",
                phoneNumber: "",
            },
            selected: {},
            contacts: [],
            contactType: ''
        }

        this.input = React.createRef()
    }
    
    
    openSideBar = () => this.setState({ sideBarOpen: true })

    closeSideBar = () => this.setState({ sideBarOpen: false })

    openOption = () => this.setState({ optionOpen: true })

    closeOption = () => this.setState({ optionOpen: false })

    selectMethod = (method) => this.setState({ active: method })

    addPhone = (contacts) => {
        if (contacts.length > 0) {
            this.setState({ contacts, contactType: "phone" }, () => this.closeSideBar())
        }
    }

    addCsv = async () => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.csv],
            });
            console.log(
              res.uri,
              res.type, // mime type
              res.name,
              res.size
            );

            this.setState({ contacts: { uri: res.uri, type: res.type, name: res.name }, contactType: "csv" })
            
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
        }
    }

    selectedDetail = (key) => this.setState({ selected: key }, () => {
        if (key.type === 'String') {
            if (this.input) {
                this.input.focus()
            }
        } else if (key.type === "DateTime") { 
            this.openOption()
        } else if (key.type === "Organizer") {
            this.openOption()
        }
    })  
    
    setData = ( value) => {
        const {selected} = this.state;

        this.setState({ data: { ...this.state.data, [selected.value]: value } })
    }

    render() {
        const { refreshing, active, optionOpen, sideBarOpen, inputValue, data, contactType, selected, inputForm, csvForm } = this.state;
        
        const { close } = this.props
        return (
        <View style={{ width: '100%', height: "100%", flex: 1 }}>
            <View style={styles.container}>
                <View style={{ backgroundColor: "#0E0C20", height: getStatusBarHeight(true)}} />
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => close()}>
                        <Ionicons name={'ios-arrow-back'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>ADD GUEST</Text>

                <View>
                    <Text style={styles.title}>Add guest using:</Text>

                    <View style={[styles.row, { marginBottom: 9 }]}>
                        <TouchableOpacity 
                            style={[style.link, { borderBottomColor: active === 'phone'? '#2DF19C' : '#E4E4E4'}]}
                            onPress={() => this.setState({ active: "phone" }, () => this.openSideBar())}
                        >
                            <Text style={style.text}>Phone Number</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[style.link, { borderBottomColor: active === 'csv'? '#2DF19C' : '#E4E4E4'}]}
                            onPress={() => this.setState({ active: 'csv' }, () => this.addCsv())}
                        >
                            <Text style={style.text}>CSV file</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[style.link, { borderBottomColor: active === 'input'? '#2DF19C' : '#E4E4E4'}]}
                            onPress={() => this.setState({ contactType: 'input',  active: 'input'})}
                        >
                            <Text style={style.text}>Form</Text>
                        </TouchableOpacity>
                    </View>

                </View>


                <Text style={styles.title}>Details</Text>
                <Segment color={'#E4E4E4'}>
                    <View style={styles.details}>
                        <ScrollView>
                            {(contactType === "input") && (<View>
                                {inputForm.map(key => (
                                    <View key={key.name} style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>{key.name}</Text>

                                        <TouchableOpacity onPress={() => this.selectedDetail(key)} style={style.action}>
                                            <Text style={style.todoDetailValue}>{data[key.value]? data[key.value] : "none"}</Text>
                                            <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>)}

                            {(contactType === "csv") && (<View>
                                {csvForm.map(key => (
                                    <View key={key.name} style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>{key.name}</Text>

                                        <TouchableOpacity onPress={() => this.selectedDetail(key)} style={style.action}>
                                            <Text style={style.todoDetailValue}>{data[key.value]? data[key.value] : "none"}</Text>
                                            <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>)}

                        </ScrollView>

                        <View style={styles.detailsRow}>
                            {(selected.type === "String") && (
                                <TextInput 
                                    ref={(x) => this.input = x}
                                    style={styles.detailsInput}
                                    placeholder={`Enter guest ${selected.name.toLowerCase()}`} 
                                    placeholderTextColor="#0E0C20"
                                    value={String(data[selected.value])}
                                    autoFocus
                                    onChange={(e) => this.setData(e.nativeEvent.text)}
                                    onSubmitEditing={(e) => this.setData(e.nativeEvent.text)}
                                />
                            )}
                        </View>
                    </View>
                </Segment>
                <Option title={active} openModal={optionOpen} closeModal={() => this.closeOption()}>

                </Option>
                
                <SideBar sideBarOpen={sideBarOpen} close={() => this.closeSideBar()} >
                    <AddContact selection="multiple" addContact={(contacts) => this.addPhone(contacts)} />
                </SideBar>
            </View>
            <Message />
        </View>
        )
    }
}
