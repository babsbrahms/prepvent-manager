import React, { Component, PureComponent } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import validator from 'validator';
import Segment from '../component/Segment';
import styles from '../styles';
import Option from './Option';


const style = StyleSheet.create({
    container: {
        padding: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        width: "100%",

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
    }

});

export default class CsvSchema extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            loading: false,
            optionOpen: false, 
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
            data: {
                name: "",
                email: "",
                phoneNumber: "",
            },
            selected: {},
            errors: {}
        }
    }

    componentDidMount() {
        const { schema, contantIndex } = this.props;
        console.log('SCH VAL:', schema);
        
        if (!!schema.name) {
            console.log('schema set');
            
            this.setState({ data: schema })
        }
    }
    
    openOption = () => this.setState({ optionOpen: true })

    closeOption = () => this.setState({ optionOpen: false })

    selectedDetail = (key) => this.setState({ selected: key }, () => {

        this.openOption("Schema")
    })

    setData = ( value) => {
        const {selected, optionOpen} = this.state;

        this.setState({ data: { ...this.state.data, [selected.value]: value } }, () => {
            if (optionOpen === true) {
                this.closeOption()
            }
        })
    }


    validateSchema = (sample, data) => {
        let error = {};

        let name = sample[data.name] || '';
        let email = sample[data.email] || "";
        let phoneNumber = sample[data.phoneNumber] || '';

        console.log(data, {name, email, phoneNumber});
        

        if (name.length < 3) error.name = 'Name field must be greater than 3 charcters';
        if (!!data.email && !validator.isEmail(email)) error.email = 'Add a valid email field or remove it';
        if (!!data.phoneNumber && !validator.isMobilePhone(phoneNumber)) error.phoneNumber = 'Add a valid phone number field or remove it';

        if (!data.email && !data.phoneNumber) error.general = 'Add either a phone number or email field';

        return error
    }

    saveSchema = () => {
        const { sample, saveSchema } = this.props;
        const { data } = this.state;

        let errors = this.validateSchema(sample, data)

        console.log(errors);

        if (Object.keys(errors).length === 0) {
            this.setState({ errors }, () => {
                saveSchema(data)
            })
            
        } else {
            this.setState({ errors })
        }
    }
    
    render() {
        const { loading, optionOpen, data, selected, csvForm, errors } = this.state;
        const { options } = this.props;

        return (
            <View style={styles.container}>
                    <TouchableOpacity style={[styles.icon, { alignSelf: 'flex-end'}]} onPress={() => this.saveSchema()}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity>
                <View style={styles.between}>
                    <Text style={styles.Header}>CSV SCHEMA</Text>

                    {/* <TouchableOpacity style={styles.icon} onPress={() => this.saveSchema()}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity> */}
                </View>

                <Text style={style.to}>Match the contact info below to the csv data.</Text>
                {(!!errors.general) && (<Text style={styles.error}>{errors.general}</Text>)}
                <Segment color="#E4E4E4" loading={loading}>
                       
                    {csvForm.map(key => (
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
                    
                </Segment>
                <Option title={selected.name || ''} openModal={optionOpen} closeModal={() => this.closeOption()}>
                    {options.map((option, index) => (
                        <TouchableOpacity key={index} style={[styles.optionBody, { borderBottomColor: data[selected.value] === option? '#2DF19C': '#707070'} ]} onPress={() => this.setData(option)}>
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={styles.optionBody} onPress={() => this.setData('')}>
                        <Text style={[styles.optionText, { color: '#EC3636'}]}>CLEAR VALUE</Text>
                    </TouchableOpacity>
                </Option>
            </View>
        )
    }
}
