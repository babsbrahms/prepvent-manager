import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { addMessageReducer } from '../action/message';
import fog from '../utils/fog.jpg';
import styles from '../styles';

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        backgroundColor: '#0E0C20'
    },
    top: {
        minHeight: 250,
        width: '100%',
        backgroundColor: '#E4E4E4',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: '#FFFFFF',
        padding: 15
    },
    contact: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        flexWrap: "wrap",
        flex: 1,
    },
    icon: {
        padding: 7
    },
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
    todo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
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
    },
    messageText: {
        color: '#0E0C20',
        fontSize: 18,
    },
    messageLink: {
        borderBottomColor: '#E4E4E4',
        padding: 4,
        marginHorizontal: 3,
        borderBottomWidth: 4,
    },
    messageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    }
});

class Authenication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            register: [
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
                    type: "Number",
                    required: false,
                    value: "phoneNumber",
                },
                {
                    name: "Password",
                    type: "Password",
                    required: false,
                    value: "password",
                },
            ],
            login: [
                {
                    name: "Email",
                    type: "String",
                    required: false,
                    value: "email",
                },
                {
                    name: "Password",
                    type: "Password",
                    required: false,
                    value: "password",
                },
            ],
            reset: [
                {
                    name: "Email",
                    type: "String",
                    required: false,
                    value: "email",
                },
            ],
            mode: 'register',
            data: {
                name: "",
                email: "",
                phoneNumber: "",
                password: ''
            },
            selected: {},
            errors: {}
    
        }

        this.input = React.createRef()
    }
    

    selectedDetail = (key) => this.setState({ selected: key }, () => {
        if (['String', "Number"].includes(key.type)) {
            if (this.input) {
                this.input.focus()
            }
        } else if (key.type === "Option") {
            this.openOption("Schema")
        }
    })  
    
    setData = ( value) => {
        const {selected } = this.state;

        this.setState({ data: { ...this.state.data, [selected.value]: value } })
    }

    validateSchema = (data) => {
        let error = {};

        console.log(data);
        
        if (data.name.length < 3) error.name = 'Name field must be greater than 3 charcters';;
        if (!!data.email && !validator.isEmail(data.email)) error.email = 'Add a valid email field or remove it';
        if (!!data.phoneNumber && !validator.isMobilePhone(data.phoneNumber)) error.phoneNumber = 'Add a valid phone number field or remove it';

        if (!data.email && !data.phoneNumber) error.general = 'Add either a phone number or email field';

        return error
    }

    saveForm = () => {
        const { saveForm } = this.props;
        const { data } = this.state;

        let errors = this.validateSchema(data)

        if (Object.keys(errors).length === 0) {
            this.setState({ errors }, () => {
                saveForm(data)
            }) 
        } else {
            this.setState({ errors })
        }
    }

    selectMode = (mode) => this.setState({ mode })

    render() {
        const { navigation } = this.props;
        const { loading, selected, data, errors, register, login, reset, mode } = this.state;

        let list = [];
        let title = '';

        if (mode === 'register') {
            list = register;
            title = 'REGISTER';
        } else if (mode === 'login') {
            list = login;
            title = 'LOGIN';
        } else if (mode === 'reset') {
            list = reset;
            title = 'FORGOT PASSWORD';
        }

        return (
            <ImageBackground style={style.container} source={fog}>
                

                <View style={style.top}>
                    <View style={styles.between}>
                    <Text style={[styles.Header, { color: '#0E0C20' }]}>{title}</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Ionicons name={'ios-checkmark'} color={'#2DF19C'} size={70}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.row, { marginBottom: 9, width: '100%' }]}>
                        <TouchableOpacity 
                            disabled={loading}
                            style={[style.messageLink, { borderBottomColor: mode === 'register'? '#2DF19C' : '#0E0C20'}]}
                            onPress={() => this.selectMode('register')}
                        >
                            <Text style={style.messageText}>register</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={loading}
                            style={[style.messageLink, { borderBottomColor: mode === 'login'? '#2DF19C' : '#0E0C20'}]}
                            onPress={() => {
                                this.selectMode('login');
                          
                            }}
                        >
                            <Text style={style.messageText}>login</Text>
                        </TouchableOpacity>

                        
                        <TouchableOpacity
                            disabled={loading}
                            style={[style.messageLink, { borderBottomColor: mode === 'reset'? '#2DF19C' : '#0E0C20'}]}
                            onPress={() => {
                                this.selectMode('reset');
                          
                            }}
                        >
                            <Text style={style.messageText}>forgot password</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View>
                            {list.map(key => (
                                <View key={key.name} style={{ width: '100%'}}> 
                                    <View  style={style.todoDetailIndex}>

                                        <Text style={style.todoDetailKey}>{key.name}</Text>

                                        <TouchableOpacity onPress={() => this.selectedDetail(key)} style={style.action}>
                                            <Text style={style.todoDetailValue}>{data[key.value]? data[key.value] : "none"}</Text>
                                            <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                        </TouchableOpacity>
                                    </View>
                                    {(!!errors[key.value]) && <Text style={styles.error}>{errors[key.value]}</Text>}
                                </View>
                            ))}


                        </View>

                        <View>
                            {(!!selected.type) && (
                                <View>
                                    <Text style={styles.inputLabel}>{selected.name}</Text>
                                    <View style={styles.detailsRow}>
                                    <TextInput 
                                        ref={(x) => this.input = x}
                                        style={styles.detailsInput}
                                        placeholder={`Enter guest ${selected.name.toLowerCase()}`} 
                                        placeholderTextColor="#E4E4E4"
                                        value={String(data[selected.value])}
                                        autoFocus
                                        secureTextEntry={selected.type === 'Password'}
                                        onBlur={() => this.setState({ selected: {} })}
                                        keyboardType={selected.type === "Number"?  "phone-pad" : "default"}
                                        onChange={(e) => this.setData(e.nativeEvent.text)}
                                        onSubmitEditing={(e) => this.setData(e.nativeEvent.text)}
                                    />
                                    </View>
                                </View>

                            )}
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}


const mapStateToprops = (state) => ({
    user: state.userReducer
})

const mapDisptachToprops = {
    addMessage: addMessageReducer
}

export default connect(mapStateToprops, mapDisptachToprops)(Authenication);