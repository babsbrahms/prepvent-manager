import React, { Component, PureComponent } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import validator from 'validator';
import Segment from '../component/Segment';
import styles from '../styles';


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

export default class Profile extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loading: false,
            inputForm: [
                // {
                //     name: "Profile Image",
                //     type: "Image",
                //     required: false,
                //     value: "image",
                // },
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
            ],
            data: {
                image: "",
                name: "",
                email: "",
                phoneNumber: "",
            },
            selected: {},
            errors: {}
        }
    }

    componentDidMount() {
        const { user }= this.props;

        this.setState({ data: user })
        
    }
    
    

    selectedDetail = (key) => this.setState({ selected: key }, () => {
        if (['String', "Number"].includes(key.type)) {
            if (this.input) {
                this.input.focus()
            }
        } else if (key.type === "Option") {
            this.openOption("Schema")
        } else if (key.type === "Image") {
            
        }
    })  
    
    setData = ( value) => {
        const {selected } = this.state;

        this.setState({ data: { ...this.state.data, [selected.value]: value } })
    }

    addImage = () => {
        const options = {
            title: 'Select Profile Image',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        };
          
          /**
           * The first arg is the options object for customization (it can also be null or omitted for default options),
           * The second arg is the callback which sends object: response (more info in the API Reference)
           */
        ImagePicker.showImagePicker(options, (response) => {
           // console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                data: {
                    ...this.state.data,
                    image: source
                }
              });
            }
        });
    }

    validateSchema = (data) => {
        let error = {};

        console.log(data);
        
        if (data.name.length < 3) error.name = 'Name field must be greater than 3 charcters';;
        if (!validator.isEmail(data.email)) error.email = 'Add a valid email field or remove it';
        if (!validator.isMobilePhone(data.phoneNumber)) error.phoneNumber = 'Add a valid phone number field or remove it';

        // if (!data.email && !data.phoneNumber) error.general = 'Add either a phone number or email field';

        return error
    }

    saveForm = () => {
        const { saveUser } = this.props;
        const { data } = this.state;

        let errors = this.validateSchema(data)

        if (Object.keys(errors).length === 0) {
            this.setState({ errors }, () => {
                saveUser(data)
            }) 
        } else {
            this.setState({ errors })
        }
    }

    render() {
        const { loading, selected, data, inputForm, errors } = this.state;

        const { contactIndex } = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.icon, { alignSelf: 'flex-end'}]} onPress={() => this.saveForm()}>
                    <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                </TouchableOpacity>

                <View style={styles.between}>
                <Text style={styles.Header}>EDIT PROFILE</Text>


                </View>

                <Segment color="#E4E4E4" loading={loading}>
                    <View style={styles.details}>
                        <ScrollView>
                            <Image source={data.image} style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#707070', alignSelf: 'center' }} />

                            <View style={{ width: '100%'}}> 
                                <View  style={style.todoDetailIndex}>

                                    <Text style={style.todoDetailKey}>Profile Image</Text>

                                    <TouchableOpacity onPress={() => this.addImage()} style={style.action}>
                                        <Text style={style.todoDetailValue}>{!!data.image? 'change image' : "add image"}</Text>
                                        <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            {inputForm.map(key => (
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


                        </ScrollView>

                        <View>
                            {((selected.type === "String") || (selected.type === "Number")) && (
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
                                        onBlur={() => this.setState({ selected: {} })}
                                        keyboardType={selected.type === "String"? "default" : "phone-pad"}
                                        onChange={(e) => this.setData(e.nativeEvent.text)}
                                        onSubmitEditing={(e) => this.setData(e.nativeEvent.text)}
                                    />
                                    </View>
                                </View>

                            )}
                        </View>
                    </View>
                </Segment>
            </View>
        )
    }
}
