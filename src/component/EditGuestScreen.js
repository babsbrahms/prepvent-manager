import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Segment from '../component/Segment';
import styles from '../styles';
import Option from './Option'
import SideBar from "./SideBar";
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


export default class EditGuest extends Component {
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
            }
        },
        data: {
            name: "",
            email: "",
            phoneNumber: "",
        }
    }

    componentDidMount() {
        const { guestId } = this.props;

        if (guestId) {
            this.fetchGuest(guestId)
        }
    }

    fetchGuest = () => {

    }
    
    openSideBar = () => this.setState({ sideBarOpen: true })

    closeSideBar = () => this.setState({ sideBarOpen: false })


    openOption = () => this.setState({ optionOpen: true })

    closeOption = () => this.setState({ optionOpen: false })


    render() {
        const { refreshing, active, optionOpen, sideBarOpen, inputValue, data } = this.state;
        
        const { close, guestId } = this.props
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

                <Text style={styles.Header}>EDIT GUEST</Text>
                <View>
                    <Text style={styles.title}>Guest</Text>

                    <Text style={style.to}>Olayinka Ibrahim</Text>
                </View>



                <Text style={styles.title}>Details</Text>
                <Segment color={'#E4E4E4'}>
                    <View style={styles.details}>
                        <ScrollView>

                            {Object.keys(data).map(key => (
                                <View key={key} style={style.todoDetailIndex}>
                                    <Text style={style.todoDetailKey}>{key}</Text>

                                    <TouchableOpacity style={style.action}>
                                        <Text style={style.todoDetailValue}>{data[key]? data[key] : "none"}</Text>
                                        <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                    </TouchableOpacity>
                                </View>
                            ))}

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
                   
                </SideBar>
            </View>
            <Message />
        </View>
        )
    }
}
