import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DocumentPicker from 'react-native-document-picker';
import Segment from '../component/Segment';
import styles from '../styles';
import Option from './Option'
import SideBar from "./SideBar";
import AddContact from "./AddContact"


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
    state = { 
        refreshing: false,
        active: 'phone',
        optionOpen: false,
        sideBarOpen: false,
        inputValue: '',
        schema: {
            name: {
                type: "string"
            },
            email: {
                type: "string"
            },
            phoneNumber: {
                type: "string"
            },
            invitedBy: {
                type: "string"
            },
            invited: {
                type: "boolean"
            },
            Accepted: {
                type: "boolean"
            },
            table: {
                type: "string"
            },
            vip: {
                type: "boolean"
            },
        },
        data: {
            name: "olayinka ibrahim",
            email: "olayinka@gmail.com",
            phoneNumber: "+2348142319913",
            invitedBy: "teslim",
            invited: true,
            Accepted: true,
            table: "table 1",
            vip: true
        }
    }

    openSideBar = () => this.setState({ sideBarOpen: true })

    closeSideBar = () => this.setState({ sideBarOpen: false })


    openOption = () => this.setState({ optionOpen: true })

    closeOption = () => this.setState({ optionOpen: false })

    selectMethod = (method) => this.setState({ active: method })

    addPhone = () => {

    }

    addInput = () => {

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
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
        }
    }

    render() {
        const { refreshing, active, optionOpen, sideBarOpen, inputValue } = this.state;
        
        const { close, guestId } = this.props
        return (
            <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
                <View style={{ backgroundColor: "#0E0C20", height: getStatusBarHeight()}} />
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => close()}>
                        <Ionicons name={'ios-arrow-back'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>{guestId === ''? 'ADD' : 'EDIT'} GUEST</Text>

                {guestId === '' && (
                <View>
                    <Text style={styles.title}>Add guest using:</Text>

                    <View style={[styles.row, { marginBottom: 9 }]}>
                        <TouchableOpacity 
                            style={[style.link, { borderBottomColor: active === 'phone'? '#2DF19C' : '#E4E4E4'}]}
                            onPress={() => this.selectMethod('phone')}
                        >
                            <Text style={style.text}>Phone Number</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[style.link, { borderBottomColor: active === 'csv'? '#2DF19C' : '#E4E4E4'}]}
                            onPress={() => this.selectMethod('csv')}
                        >
                            <Text style={style.text}>CSV file</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[style.link, { borderBottomColor: active === 'input'? '#2DF19C' : '#E4E4E4'}]}
                            onPress={() => this.selectMethod('input')}
                        >
                            <Text style={style.text}>Form</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        {(active === 'phone') && (
                        <TouchableOpacity style={style.button} onPress={() => this.openSideBar()}>
                            <Text style={style.btnText}>Import contact</Text>
                        </TouchableOpacity>)}

                        
                        {(active === 'csv') && (
                        <TouchableOpacity style={style.button} onPress={() => this.addCsv()}>
                            <Text style={style.btnText}>Import CSV</Text>
                        </TouchableOpacity>)}

                        {(active === 'input') && (
                        <TouchableOpacity style={style.button}>
                            <Text style={style.btnText}>Fill guest form</Text>
                        </TouchableOpacity>)}
                    </View>
                </View>)}

                {guestId !== '' && (
                <View>
                    <Text style={styles.title}>Guest</Text>

                    <Text style={style.to}>Olayinka Ibrahim</Text>
                </View>)}



                <Text style={styles.title}>Details</Text>
                <Segment color={'#E4E4E4'}>
                    <View style={styles.details}>
                        <ScrollView>
                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Name</Text>

                                <TouchableOpacity style={style.action}>
                                    <Text style={style.todoDetailValue}>Olayinka</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>

                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Email</Text>

                                <TouchableOpacity style={style.action}>
                                    <Text style={style.todoDetailValue}>ib@gmail.com</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>

                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Phone Number</Text>

                                <TouchableOpacity style={style.action}>
                                    <Text style={style.todoDetailValue}>+2348142319913</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>

                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Invite</Text>

                                <TouchableOpacity style={style.action}>
                                    <Text style={style.todoDetailValue}>true</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>


                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Accepted</Text>

                                <TouchableOpacity style={style.action}>
                                    <Text style={style.todoDetailValue}>true</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>

                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Table</Text>

                                <TouchableOpacity style={style.action}>
                                    <Text style={style.todoDetailValue}>table 1</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>


                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>VIP</Text>

                                <TouchableOpacity style={style.action}>
                                    <Text style={style.todoDetailValue}>true</Text>
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                        <View style={styles.detailsRow}>
                            <TextInput 
                                style={styles.detailsInput} 
                                placeholder={"Enter "} 
                                placeholderTextColor="#0E0C20" 
                                value={inputValue}
                                onChange={(e) => this.setState({ inputValue: e.nativeEvent.text })}
                                onSubmitEditing={(e) => this.addInput()}
                            />
                            <TouchableOpacity style={styles.icon} onPress={() => this.addInput()}>
                                <Ionicons name={'ios-send'} size={30} color={'#707070'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Segment>
                <Option title={active} openModal={optionOpen} closeModal={() => this.closeOption()}>

                </Option>
                
                <SideBar sideBarOpen={sideBarOpen} close={() => this.closeSideBar()} >
                    <AddContact selection="multiple" addContact={() => {}} />
                </SideBar>
            </KeyboardAvoidingView>
        )
    }
}
