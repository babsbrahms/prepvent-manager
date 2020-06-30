import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Segment from '../component/Segment';
import { ScrollView } from 'react-native-gesture-handler';


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
        active : 'scan',
        phone: "",
        email: '',
        data: {
            name: "Olayinka Ibrahim",
            email: "ib@gmail.com",
            phone: "+2348132319913",
            invited: true,
            accepted: true,
            checkedIn: false,
            table: "table 3",
            vip: true
        }
    }

    findEmail = () => {

    }

    findPhone = () => {
        
    }

    render() {
        const { close } = this.props;
        const  { active, data, phone, email } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: "#0E0C20", height: getStatusBarHeight()}} />
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
                        style={[style.link, { borderBottomColor: active === 'scan'? '#2DF19C' : '#E4E4E4'}]}
                        onPress={() => this.setState({ active: 'scan'})}
                    >
                        <Text style={style.text}>Scan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[style.link, { borderBottomColor: active === 'phone'? '#2DF19C' : '#E4E4E4'}]}
                        onPress={() => this.setState({ active: 'phone'})}
                    >
                        <Text style={style.text}>Phone</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[style.link, { borderBottomColor: active === 'email'? '#2DF19C' : '#E4E4E4'}]}
                        onPress={() => this.setState({ active: 'email'})}
                    >
                        <Text style={style.text}>Email</Text>
                    </TouchableOpacity>
                </View>
                
                {(active === 'scan') && (<View style={styles.segment}>

                </View>)}
                {(active === 'phone') && (<TextInput 
                    style={styles.textInput} 
                    placeholder={"Enter guest phone number"} 
                    placeholderTextColor="#0E0C20" 
                    value={phone}
                    keyboardType={"phone-pad"}
                    onChange={(e) => this.setState({ phone: e.nativeEvent.text })}
                    onSubmitEditing={(e) => this.findPhone()}
                />)}

                {(active === 'email') && (<TextInput 
                    style={styles.textInput} 
                    placeholder={"Enter guest email"} 
                    placeholderTextColor="#0E0C20"
                    value={email}
                    keyboardType={"email-address"}
                    onChange={(e) => this.setState({ email: e.nativeEvent.text })}
                    onSubmitEditing={(e) => this.findEmail()}
                />)}

                <Text style={styles.title}>Details</Text>

                <Segment color={'#E4E4E4'}>
                    <View style={style.details}>
                        <ScrollView>
                            {Object.keys(data).map(key => {
                                <View style={style.todoDetailIndex}>
                                    <Text key={key} style={style.todoDetailKey}>{key}</Text>
    
                                    <Text style={style.todoDetailValue}>{data[key]}</Text>
                                </View>
                            })}
                        
                        </ScrollView>
                        <TouchableOpacity style={style.button}>
                                <Text style={style.btnText}>Check In</Text>
                        </TouchableOpacity>
                    </View>
                </Segment>
            </View>
        )
    }
}
