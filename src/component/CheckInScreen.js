import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import validator from 'validator'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Segment from '../component/Segment';
import moment from 'moment';
import { RNCamera } from 'react-native-camera';
import styles from '../styles';
import Message from "./Message"

const style = StyleSheet.create({
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

export default class CheckIn extends Component {
    state = {
        active: '',
        inputValue: '',
        data: {
            uid: "11212sdf",
            name: 'Rukayat',
            email: 'ruka@gmail.com',
            invited: 12343454555,
            invitedBy: {
                uid: '233',
                name: "olayinka",
                phoneNumber: "+2348142319913"
            },
            accepted: 12343454555,
            checkedIn: 12343454555,
            vip: {},
            table: {
                uid: 1,
                name: "Bride's Table"
            },
            color: "Red",
            food: 'Fried Rice' 
        },
        loading: false,
        processing: false,
        error: "",
        polls: [
            {
                title: "food",
                question: "Choose a food",
                options: {
                    'Fried Rice': 0,
                    'Amala': 0,
                    "Beans": 0
                }
            },
            {
                title: "color",
                question: "Choose a color",
                options: {
                    'Red': 0,
                    'Blue': 0,
                    "Green": 0
                } 
            }
        ],
    }

    findEmail = () => {
        const { inputValue } = this.state;

        if (validator.isEmail(inputValue)) {
            this.setState({ processing: false, loading: true, error: "" })
        } else {
            this.setState({ error: "Enter a valid email address"})
        }
    }

    findPhone = () => {
        const { inputValue } = this.state;

        if (validator.isMobilePhone(inputValue, "any", { strictMode: true })) {
            this.setState({ processing: false, loading: true, error: "" })
        } else {
            this.setState({ error: "Enter a valid phone number with country code"})
        }
    }

    processBarCode = (barcode) => {
        if (barcode[0].type !== "UNKNOWN_FORMAT") {
            console.log(barcode[0].data);
            this.setState({ processing: false, loading: true, inputValue: barcode[0].data })
        }
    }

    selectMethod = (method) => this.setState({ active: method, processing: true, inputValue: '', error: "" })

    render() {
        const { close } = this.props;
        const  { active, data, processing, loading, inputValue, error, polls } = this.state;
        return (
        <View style={{ width: '100%', height: "100%", flex: 1 }}>
            <View style={styles.container}>
                <View style={{ backgroundColor: "#0E0C20", height: getStatusBarHeight(true)}} />
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => close()}>
                        <Ionicons name={'ios-arrow-back'} color={'white'} size={30}/>
                    </TouchableOpacity>
{/* 
                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity> */}
                </View>

                <Text style={styles.Header}>CHECK IN</Text>
                <Text style={styles.title}>Method</Text>

                <View style={[styles.row, { marginBottom: 9 }]}>
                    <TouchableOpacity 
                        disabled={loading}
                        style={[style.link, { borderBottomColor: active === 'scan'? '#2DF19C' : '#E4E4E4'}]}
                        onPress={() => this.selectMethod('scan')}
                    >
                        <Text style={style.text}>Scan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={loading}
                        style={[style.link, { borderBottomColor: active === 'phone'? '#2DF19C' : '#E4E4E4'}]}
                        onPress={() => this.selectMethod('phone')}
                    >
                        <Text style={style.text}>Phone</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={loading}
                        style={[style.link, { borderBottomColor: active === 'email'? '#2DF19C' : '#E4E4E4'}]}
                        onPress={() => this.selectMethod('email')}
                    >
                        <Text style={style.text}>Email</Text>
                    </TouchableOpacity>
                </View>


                {(active === 'phone') && (<TextInput 
                    style={styles.textInput} 
                    placeholder={"Enter guest phone number"} 
                    placeholderTextColor="#0E0C20" 
                    value={inputValue}
                    editable={processing}
                    keyboardType={"phone-pad"}
                    onChange={(e) => this.setState({ inputValue: e.nativeEvent.text })}
                    onSubmitEditing={(e) => this.findPhone()}
                />)}

                {(active === 'email') && (<TextInput 
                    style={styles.textInput} 
                    placeholder={"Enter guest email"} 
                    placeholderTextColor="#0E0C20"
                    value={inputValue}
                    editable={processing}
                    keyboardType={"email-address"}
                    onChange={(e) => this.setState({ inputValue: e.nativeEvent.text })}
                    onSubmitEditing={(e) => this.findEmail()}
                />)}
                {(!!error) && (<Text style={styles.error}>{error}</Text>)}

                <Text style={styles.title}>Details</Text>

                <Segment color={'#E4E4E4'} loading={loading}>
                    {(active === 'scan') && (processing) && (
                        <RNCamera
                            style={{ width: '100%', height: '100%'}}
                            androidCameraPermissionOptions={{
                                title: 'Permission to use camera',
                                message: 'We need your permission to use your camera',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                            captureAudio={false}
                            onGoogleVisionBarcodesDetected={({ barcodes }) => this.processBarCode(barcodes)}
                            // onBarCodeRead={(e) => {
                            //     console.log(e);
                            // }}
                        />
                    )}
                    {(!processing) && (<View style={style.details}>
                        <ScrollView>
                            <View>
                                <View style={style.todoDetailIndex}>
                                    <Text style={style.todoDetailKey}>Name</Text>

                                    <Text style={style.todoDetailValue}>{data.name? data.name : "none"}</Text>
                    
                                </View>


                                <View style={style.todoDetailIndex}>
                                    <Text style={style.todoDetailKey}>Email</Text>

                                    <Text style={style.todoDetailValue}>{data.email? data.email : "none"}</Text>
                                </View>


                                <View style={style.todoDetailIndex}>
                                    <Text style={style.todoDetailKey}>Phone Number</Text>

                                    <Text style={style.todoDetailValue}>{data.phoneNumber? data.phoneNumber : "none"}</Text>
                                </View>
                                

                                {(!!data.invited) && (<View style={style.todoDetailIndex}>
                                    <Text style={style.todoDetailKey}>Invited</Text>

                                    <Text style={style.todoDetailValue}>{data.invited? moment(data.invited).format("ddd Do MMM YYYY hh:mm a") : "none"}</Text>
                                </View> )}


                                {(!!data.invitedBy) && (<View style={style.todoDetailIndex}>
                                    <Text style={style.todoDetailKey}>Invited By</Text>

                                    <Text style={style.todoDetailValue}>{data.invitedBy? data.invitedBy.name : "none"}</Text>
                                </View>)}


                                {(!!data.accepted) && (<View style={style.todoDetailIndex}>
                                    <Text style={style.todoDetailKey}>Accepted</Text>

                                    <Text style={style.todoDetailValue}>{data.accepted? moment(data.accepted).format("ddd Do MMM YYYY hh:mm a") : "none"}</Text>
                                </View>)} 


                                {(!!data.checkedIn) && (<View style={style.todoDetailIndex}>
                                    <Text style={style.todoDetailKey}>Checked In</Text>

                                    <Text style={style.todoDetailValue}>{data.checkedIn? moment(data.checkedIn).format("ddd Do MMM YYYY hh:mm a") : "none"}</Text>
                                </View> )}


                                {(!!data.vip) && (<View style={style.todoDetailIndex}>
                                    <Text style={style.todoDetailKey}>VIP</Text>

                                    <Text style={style.todoDetailValue}>{data.vip.alert? 'true' : "false"}</Text>
                                </View>)}


                                {(!!data.table) &&<View style={style.todoDetailIndex}>
                                    <Text style={style.todoDetailKey}>Table</Text>

                                    <Text style={style.todoDetailValue}>{data.table? data.table.name : "none"}</Text>
                                </View>}

                                {polls.map(key => (
                                    <View key={key.title} style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>{key.title}</Text>

                                        <Text style={style.todoDetailValue}>{!!data[key.title]? data[key.title] : "none"}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={style.button}>
                                <Text style={style.btnText}>Check In</Text>
                        </TouchableOpacity>
                    </View>)}
                </Segment>
                
            </View>
            <Message />
        </View>
        )
    }
}
