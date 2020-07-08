import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, TextInput, Platform, PermissionsAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import csvtojsonV2 from "csvtojson";
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


export default class AddGuest extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            refreshing: false,
            loading: false,
            active: '',
            optionOpen: false,
            optiontype: '',
            sideBarOpen: false,
            sideBarType: '',
            contactCount: 0,
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
                    type: "Number",
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
    
    
    openSideBar = (type) => this.setState({ sideBarOpen: true, sideBarType: type })

    closeSideBar = () => this.setState({ sideBarOpen: false, sideBarType: "" })

    openOption = (type) => this.setState({ optionOpen: true, optiontype: type })

    closeOption = () => this.setState({ optionOpen: false, optiontype: '' })

    selectMethod = (method) => this.setState({ active: method })


    resetContact = (active) => this.setState({ 
        active, 
        selected: {}, 
        contacts: [], 
        contactCount: 0, 
        contactType: "",
        data: {
            name: "",
            email: "",
            phoneNumber: "",
        }, 
        optionOpen: false, 
        optiontype: '' 
    }, () => {
        if (active === 'phone') {
            this.openSideBar("phone");
        } else if (active === 'csv') {
            this.csvPermission()
        } else if (active === 'input') {
            this.setState({ contactType: 'input', contactCount: 1 })
        } else if (active === 'previous') {
            this.openSideBar("previous");
        }
    })

    addPhone = (contacts) => {
        const { addMessage } = this.props;

        if (contacts.length > 0) {
            this.setState({ contacts, contactType: "phone", contactCount: contacts.length }, () =>{
                 this.closeSideBar();
            })
        }
    }

    csvPermission = () => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                title: 'CSV File Permission',
                message: 'This app would like to read your csv file.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            })
            .then((result) => {
                if (result === 'granted') {
                    this.addCsv()
                }  
            })
            .catch(err => {
                console.log(err);
                
            })
        } else {
            this.addCsv()
        }  
    }


    addCsv = async () => {
        const { addMessage } = this.props;

        try {
            const res = await DocumentPicker.pick({
             // type: [DocumentPicker.types.csv],
            });
            console.log(
              res.uri,
              res.type, // mime type
              res.name,
              res.size
            );

            let file = Platform.OS === 'android'? res.uri : res.uri.replace('file://', '')

            
            if (res.size > 2000000) {
                addMessage("File is too large (2MB LIMIT)")
            } else if (["application/vnd.ms-excel", "text/csv", "text/comma-separated-values"].indexOf(res.type) > -1 ) {
               this.setState({ loading:  true }, () => {                         
                    RNFS.readFile(file, 'utf8')
                    .then((data) => {
                        
                      //  console.log(data)
                        this.formatList(data)
                    })
                    .catch(err => {
                        console.log(err);  
                    })
               })
                
            } else {
                addMessage("Only csv files are acceptable")
            }
 
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
        }
    }

    formatList = (csvString) => {
        const { addMessage} = this.props;

        csvtojsonV2()
        .fromString(csvString)
        .then((result) =>{
            console.log(result);
          
            if (result.length > 0) {
              //let contact = result.map(res =>(res.phone))
  
                let keys = Object.keys(result[0]);

                console.log(keys);
                
  
                this.setState({ contacts: result, contactType: "csv", options: keys, loading: false, contactCount: result.length })

            } else {
                addMessage('Warning', 'The csv file is empty')
            }
            
        })
        .catch(err => {
            addMessage('Error', 'Error converting csv file', false, false)
        })
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
        const {selected, optionOpen} = this.state;

        this.setState({ data: { ...this.state.data, [selected.value]: value } }, () => {
            if (optionOpen === true) {
                this.closeOption()
            }
        })
    }

    onSubmit = () => {
        const { contactType } = this.state;

        this.setState({ loading: true }, () => {
            if (contactType === 'phone') {
                // validate phone and email then submit
                
            } else if (contactType === 'csv') {
                // use data schema to format contact
    
            } else if (contactType === 'input') {
                // valiadate data and submit data
    
            } else if (contactType === 'previous') {
                // validate phone and email then submit
    
            }
        })
    }

    render() {
        const { refreshing, loading, active, optionOpen, sideBarOpen, contactCount, contacts,
             data, contactType, selected, inputForm, csvForm, options, optiontype, sideBarType } = this.state;
        
        const { close } = this.props
        return (
        <View style={{ width: '100%', height: "100%", flex: 1 }}>
            <View style={styles.container}>
                <View style={{ backgroundColor: "#0E0C20", height: getStatusBarHeight(true)}} />
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => close()}>
                        <Ionicons name={'ios-arrow-back'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={() => this.onSubmit()}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>ADD GUEST</Text>
                <View style={[styles.between, { alignItems: 'center'}]}>
                    <Text style={styles.title}>Organizer</Text>

                    <TouchableOpacity disabled={loading} style={styles.icon} onPress={() => this.openOption('Add Guest Via')}>
                        <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                    </TouchableOpacity> 
                </View>
                <Text style={style.to}>{contactCount} contacts</Text>


                <Text style={styles.title}>Details</Text>
                <Segment color={'#E4E4E4'} loading={loading}>
                    {((contactType === "phone") || (contactType === "previous")) && (
                        <FlatList 
                            onRefresh={() => {}}
                            refreshing={refreshing}
                            data={contacts}
                            renderItem={({ item, index }) => 
                                (<View> 
                                    <Text style={style.todo}>{item.name}</Text>                       
                                    {(!!item.phoneNumber) && (<Text >{item.phoneNumber}</Text>)}  
                                    {(!!item.email) && (<Text >{item.email}</Text> )}
                                    <View style={styles.hairLine} />
                                </View>) 
                            }
                            keyExtractor={(item,index) => index.toString()}
                        />
                    )}
                    {((contactType !== "phone") || (contactType !== "previous")) && (<View style={styles.details}>
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
                            {((selected.type === "String") || (selected.type === "Number")) && (
                                <TextInput 
                                    ref={(x) => this.input = x}
                                    style={styles.detailsInput}
                                    placeholder={`Enter guest ${selected.name.toLowerCase()}`} 
                                    placeholderTextColor="#E4E4E4"
                                    value={String(data[selected.value])}
                                    autoFocus
                                    keyboardType={selected.type === "String"? "default" : "phone-pad"}
                                    onChange={(e) => this.setData(e.nativeEvent.text)}
                                    onSubmitEditing={(e) => this.setData(e.nativeEvent.text)}
                                />
                            )}
                        </View>
                    </View>)}
                </Segment>
                <Option title={optiontype} openModal={optionOpen} closeModal={() => this.closeOption()}>
                    {(optiontype === 'Schema') && options.map((option, index) => (
                        <TouchableOpacity key={index} style={[styles.optionBody, { borderBottomColor: data[selected.value] === option? '#2DF19C': '#707070'} ]} onPress={() => this.setData(option)}>
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}


                    {(optiontype === "Add Guest Via") && (
                        <View>
                            <TouchableOpacity 
                                style={[styles.optionBody, { borderBottomColor: active === 'phone'? '#2DF19C' : '#E4E4E4'}]}
                                onPress={() => this.resetContact("phone")}
                            >
                                <Text style={styles.optionText}>Phone Contact</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.optionBody, { borderBottomColor: active === 'csv'? '#2DF19C' : '#E4E4E4'}]}
                                onPress={() => this.resetContact('csv')}
                            >
                                <Text style={styles.optionText}>CSV File</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.optionBody, { borderBottomColor: active === 'input'? '#2DF19C' : '#E4E4E4'}]}
                                onPress={() => this.resetContact('input')}
                            >
                                <Text style={styles.optionText}>Form</Text>
                            </TouchableOpacity>


                            <TouchableOpacity 
                                style={[styles.optionBody, { borderBottomColor: active === 'previous'? '#2DF19C' : '#E4E4E4'}]}
                                onPress={() => this.resetContact('previous')}
                            >
                                <Text style={styles.optionText}>Previous Event</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    
                </Option>
                
                <SideBar sideBarOpen={sideBarOpen} close={() => this.closeSideBar()} >
                    {(sideBarType === "phone") && (<AddContact 
                        selection="multiple" 
                        close={() => this.closeSideBar()} 
                        addContact={(contacts) => this.addPhone(contacts)} 
                    />)}

                    {(sideBarType === "previous") && (
                        <View />
                    )}
                </SideBar>
            </View>
            <Message />
        </View>
        )
    }
}
