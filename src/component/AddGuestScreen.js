import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform, PermissionsAndroid, Clipboard } from 'react-native';
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
import ContactForm from './ContactForm';
import CsvSchema from './CsvSchema';
import RegistrationLink from './RegistrationLink';


const style = StyleSheet.create({
    title: {
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 25
    },
    to: {
        color: '#FFFFFF',
        fontSize: 24,
        marginBottom: 9
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


let standardSchema = {
    name: "name",
    email: "email",
    phoneNumber: "phoneNumber"
}

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
            options: [],
            data: {
                name: "",
                email: "",
                phoneNumber: "",
            },
            selected: {},
            contacts: [],
            contactType: '',
            contactIndex: -1
        }

        this.input = React.createRef()
    }
    
    
    openSideBar = (type) => this.setState({ sideBarOpen: true, sideBarType: type })

    closeSideBar = () => this.setState({ sideBarOpen: false, sideBarType: "" })

    openOption = (type) => this.setState({ optionOpen: true, optiontype: type })

    closeOption = () => this.setState({ optionOpen: false, optiontype: '' })

    fetchLinks = () => {
        this.setState({
            contacts: [ {
                uid: '1121',
                name: 'Friends link',
                date: 1123232323,
                creatorName: 'Olayinka',
                creatorId: '12121',
                capacity: 0,
                registrations: 0,
                active: true,
                link: 'https:addsdsadsf'
            }, 
            {
                uid: '11wqe',
                name: 'Office link',
                date: 1123232323,
                creatorName: 'Olayinka',
                creatorId: '12121',
                capacity: 0,
                registrations: 0,
                active: true,
                link: 'https:addsdsadsf'
            }],
            contactType: 'link'
        }, () => {
           // this.openSideBar("link");
        })
    }

    resetContact = (active) => this.setState({ 
        active, 
        selected: {}, 
        contacts: [], 
        contactType: "",
        schema: {
            name: "",
            email: "",
            phoneNumber: "",
        },
        data: {
            name: "",
            email: "",
            phoneNumber: "",
        },
        schema: {}, 
        optionOpen: false, 
        optiontype: '',
        contactIndex: -1
    }, () => {
        if (active === 'phone') {
            this.openSideBar("phone");
        } else if (active === 'csv') {
            this.csvPermission();
        } else if (active === 'form') {
            this.setState({ contactType: 'form', schema: standardSchema }, () => {
                this.openSideBar("form");
            })
        } else if (active === 'link') {
            this.fetchLinks()
        }
    })

    addPhone = (contacts) => {
        const { addMessage } = this.props;

        if (contacts.length > 0) {
            this.setState({ contacts, contactType: "phone", schema: standardSchema }, () =>{
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
           // console.log(result);
          
            if (result.length > 0) {
              //let contact = result.map(res =>(res.phone))
  
                let keys = Object.keys(result[0]);

               // console.log(keys);
                
  
                this.setState({ contacts: result, options: keys, loading: false }, () => {
                    this.openSideBar('csv')
                })
            } else {
                addMessage('Warning. The csv file is empty')
            }
            
        })
        .catch(err => {
            addMessage('Error converting csv file')
        })
    }

    addSchema = (schema) => {
        this.setState({ schema, contactType: "csv" }, ()=> this.closeSideBar())
    }

    saveContact = (contact) => {
        const { contactIndex, contacts, schema } = this.state;

        if ( contactIndex === -1) {
            // add
            contacts.push(contact)
        } else {
            // save (use spread an schema to save)

            let data = { 
                ...contacts[contactIndex], 
                [schema.name]: contact.name || '', 
                [schema.email]: contact.email || '', 
                [schema.phoneNumber]: contact.phoneNumber || '' 
            }

            contacts[contactIndex] = data;
        }

        this.setState({ contacts: [...contacts ], contactIndex: -1 }, ()=> this.closeSideBar())
    }

    editContact = (index, name, phoneNumber, email) => {
        this.setState({ 
            contactIndex: index, 
        data: {
            name,
            phoneNumber,
            email
        }}, () => {
            this.openSideBar('form')
        })
    }

    deleteContact = ( index ) => {
        const { contacts } = this.state;

        contacts.splice(index, 1);

        this.setState({ contacts: [...contacts ] })
    }

    saveLink =  contact => {
        const { contactIndex, contacts, schema } = this.state;

        if ( contactIndex === -1) {
            // add
            contacts.push(contact)
        } else {
            // save 
            contacts[contactIndex] = contact;
        }

        this.setState({ contacts: [...contacts ], contactIndex: -1 }, ()=> this.closeSideBar())
    }

    changeLinkStatus = () => {
        const { data } = this.state;

        this.closeOption()
    }


    onSubmit = () => {
        const { contactType } = this.state;

        this.setState({ loading: true }, () => {
            if (contactType === 'phone') {
                // validate phone and email then submit
                
            } else if (contactType === 'csv') {
                // use schema to format contact
    
            } else if (contactType === 'form') {
                // valiadate contacts and submit contact
    
            }  else if (contactType === 'link') {

            }
        })
    }

    render() {
        const { refreshing, loading, active, optionOpen, sideBarOpen, contacts, schema,
             data, contactType, options, optiontype, sideBarType, contactIndex } = this.state;
        
        const { close, user } = this.props;

        let title = 'Details'

        if (active === 'phone') {
            title = 'Phone Contacts'
        } else if (active === 'csv') {
            title = 'CSV Contacts'
        } else if (active === 'form') {
            title = 'Form Contacts'
        } else if (active === 'link') {
            title = 'Registration Links'
        } else {
            title = 'Details' 
        }
        
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
                    <Text style={styles.title}>Guest</Text>

                    <TouchableOpacity disabled={loading} style={styles.icon} 
                    onPress={() => this.setState({ contactIndex: -1 }, () => {
                        this.openOption('Add Guest Via')
                    })}>
                        <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                    </TouchableOpacity> 
                </View>
                <Text style={style.to}>{contacts.length} contacts</Text>

                {(active === 'csv') && (contacts.length > 0) && (
                <View style={[styles.between, { alignItems: 'center', marginBottom: 9 }]}>
                    <Text style={styles.title}>Schema</Text>

                    <TouchableOpacity disabled={loading} style={styles.icon} onPress={() => this.openSideBar('csv')}>
                        <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                    </TouchableOpacity> 
                </View>)}


                <View style={[styles.between, { alignItems: 'center'}]}>
                    <Text style={styles.title}>{title}</Text>

                    {(contactType === 'form') && (
                    <TouchableOpacity disabled={loading} style={styles.icon} onPress={() => this.setState({ contactIndex: -1 }, () => this.openSideBar('form'))}>
                        <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                    </TouchableOpacity>)}

                    {(contactType === 'link') && (
                    <TouchableOpacity disabled={loading} style={styles.icon} onPress={() => this.openSideBar('link')}>
                        <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                    </TouchableOpacity>)}
                </View>
                
                <Segment color={'#E4E4E4'} loading={loading}>
                    {((["phone", 'form', "csv"].includes(contactType))) && (
                        <FlatList 
                            onRefresh={() => {}}
                            refreshing={refreshing}
                            data={contacts}
                            renderItem={({ item, index }) => 

                            (<View style={{ flex: 1 }}>
                                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: "flex-start", alignItems: 'stretch', flex: 1 }}>
                                    <TouchableOpacity style={styles.icon} onPress={() => this.deleteContact(index)}>
                                        <Ionicons name={'ios-remove-circle-outline'} size={30} color={"#EC3636"}/>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity onPress={() => this.editContact(index, item[schema.name] || '', item[schema.phoneNumber] || '', item[schema.email] || '')}> 
                                        <Text style={style.todo}>{item[schema.name]}</Text>                       
                                        {(!!item[schema.phoneNumber]) && (<Text >{item[schema.phoneNumber]}</Text>)}  
                                        {(!!item[schema.email]) && (<Text >{item[schema.email]}</Text> )}
                                        
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.hairLine} />
                            </View>
) 
                            }
                            keyExtractor={(item,index) => index.toString()}
                        />
                    )}

                    {(contactType === 'link') && (
                        <FlatList 
                            onRefresh={() => this.fetchLinks()}
                            refreshing={refreshing}
                            data={contacts}
                            renderItem={({ item, index }) => 
                            (<View>
                                <View style={styles.between}>
                                    <Text style={style.todo}>{item.name}</Text>

                                    <TouchableOpacity style={styles.icon} 
                                        onPress={() => this.setState({ contactIndex: index, data: item }, () => this.openOption('link'))}
                                    >
                                        <Ionicons name={'ios-menu'} size={30} color={"#707070"}/>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ color: item.active? '#707070' : "#EC3636", fontSize: 18 }}>{item.active? 'ACTIVE' : 'INACTIVE'}</Text>
                                <Text>{item.capacity} Capacity</Text>
                                <Text>{item.registrations} Registered</Text>
                                <View style={styles.hairLine} />
                            </View>) 
                            }
                            keyExtractor={(item,index) => index.toString()}
                        />
                    )}
                </Segment>
                <Option title={contactIndex == -1? optiontype : data.name} openModal={optionOpen} closeModal={() => this.closeOption()}>
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
                                style={[styles.optionBody, { borderBottomColor: active === 'form'? '#2DF19C' : '#E4E4E4'}]}
                                onPress={() => this.resetContact('form')}
                            >
                                <Text style={styles.optionText}>Form</Text>
                            </TouchableOpacity>


                            <TouchableOpacity 
                                style={[styles.optionBody, { borderBottomColor: active === 'link'? '#2DF19C' : '#E4E4E4'}]}
                                onPress={() => this.resetContact('link')}
                            >
                                <Text style={styles.optionText}>Registration Link</Text>
                            </TouchableOpacity> 

                            {/* <TouchableOpacity 
                                style={[styles.optionBody, { borderBottomColor: active === 'previous'? '#2DF19C' : '#E4E4E4'}]}
                                onPress={() => this.resetContact('previous')}
                            >
                                <Text style={styles.optionText}>Previous Event</Text>
                            </TouchableOpacity> */}

                        </View>
                    )}

                    {(optiontype === "link") && (
                        // info is stored in data
                        <View>
                            <TouchableOpacity 
                                style={styles.optionBody}
                                onPress={() => {
                                    this.closeOption();
                                    this.openSideBar('link')
                                }}
                            >
                                <Text style={styles.optionText}>Edit Link</Text>
                            </TouchableOpacity>

                            {(!!data.link) && (<TouchableOpacity 
                                style={styles.optionBody}
                                onPress={() => {
                                    Clipboard.setString(data.link)
                                    this.closeOption()
                                }}
                            >
                                <Text style={styles.optionText}>Copy Link</Text>
                            </TouchableOpacity>)}

                            {(!!data.active) && (<TouchableOpacity 
                                style={styles.optionBody}
                                onPress={() => this.changeLinkStatus()}
                            >
                                <Text style={styles.optionText}>Deactivate Link</Text>
                            </TouchableOpacity>)}

                            {(!data.active) && (<TouchableOpacity 
                                style={styles.optionBody}
                                onPress={() => this.changeLinkStatus()}
                            >
                                <Text style={styles.optionText}>Activate Link</Text>
                            </TouchableOpacity>)}
                        </View>
                    )}
                    
                </Option>
                
                <SideBar sideBarOpen={sideBarOpen} close={() => this.closeSideBar()} >
                    {(sideBarType === "phone") && (<AddContact 
                        selection="multiple" 
                        close={() => this.closeSideBar()} 
                        addContact={(contacts) => this.addPhone(contacts)} 
                    />)}

                    {(sideBarType === "csv") && (
                        <CsvSchema 
                        sample={contacts[0]} 
                        options={options} 
                        schema={schema}
                        data={data}
                        saveSchema={res => this.addSchema(res)} />
                    )}

                    {(sideBarType === "form") && (
                        <ContactForm 
                        contactIndex={contactIndex} 
                        data={data}
                        saveForm={(contact) => this.saveContact(contact)}/>
                    )}

                    
                    {(sideBarType === "link") && (
                        <RegistrationLink
                        contactIndex={contactIndex} 
                        data={data}
                        user={user}
                        saveLink={(link) => this.saveLink(link)}/>
                    )}

                </SideBar>
            </View>
            <Message />
        </View>
        )
    }
}
