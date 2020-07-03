import React, { Component, PureComponent } from 'react';
import { PermissionsAndroid, Platform, View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Contacts from 'react-native-contacts';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    }

});

export default class AddContact extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            search: '',
            refreshing: true,
            contacts: [],
            loading: false,
        }
    }
    
    componentDidMount() {
        if(Platform.OS === "android") {
            this.androidPermission()
        } else {
            this.getAll()
        }
    }
    
    getAll = () => {
        console.log("all contact");
        
        Contacts.getAllWithoutPhotos((err, contacts) => {
            if (err === 'denied'){
                // error
                this.setState({ contacts: [], refreshing: false })
            } else {
            
                contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase());
                
                this.setState({ contacts: contacts, refreshing: false })
            }
        })
    }

    androidPermission = () => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              'title': 'Contacts',
              'message': 'This app would like to view your contacts.',
              'buttonPositive': 'Please accept bare mortal'
            }
        ).then(() => {
            this.getAll()
        })
    }

    // searchGuest = (text) => {
    //     this.setState({ refreshing: true }, () => {
    //         const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    //         if (text === "" || text === null) {
    //             return
    //         } else if (phoneNumberRegex.test(text)) {
    //             Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
    //                 contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase());
    //                 this.setState({ contacts: contacts, refreshing: false })
    //                 // console.log('contacts', contacts);
    //             });
    //         } else {
    //             Contacts.getContactsMatchingString(text, (err, contacts) => {
    //                 contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase());
    //                 this.setState({ contacts: contacts, refreshing: false })
    //                 // console.log('contacts', contacts);
    //             });
    //         }
    //     })  
    // }

    select = (contact, index) => {
        const { addContact, selection } = this.props;
        
        if (selection === 'single') {
            this.setState({ loading: true }, () => {
                addContact({
                    name: contact.displayName,
                    phoneNumber: contact.phoneNumbers.length > 0 ? contact.phoneNumbers[contact.phoneNumbers.length - 1].number : "",
                    email: contact.emailAddresses.length > 0? contact.emailAddresses[contact.emailAddresses.length - 1].email : ""
                })
            })    
        } else {
            const { contacts } = this.state;
            
            let index = contacts.findIndex(x => x.recordID === contact.recordID);
            
            if (!!contact.selected) {
                contacts[index] = {...contact, selected: false }
            } else {
                contacts[index] = {...contact, selected: true }
            }  
            
            this.setState({ contacts: [...contacts] })
        }
    }


    saveContact = () => {
        const { addContact, selection, close } = this.props;

        if (selection === 'single') {
            close()
        } else {
            const { contacts } = this.state;
            this.setState({ loading: true }, () => {

                const list = contacts.map(contact => {
                    if (!!contact.selected) {
                        return {
                            name: contact.displayName,
                            phoneNumber: contact.phoneNumbers.length > 0 ? contact.phoneNumbers[contact.phoneNumbers.length - 1].number : "",
                            email: contact.emailAddresses.length > 0? contact.emailAddresses[contact.emailAddresses.length - 1].email : ""
                        }
                    }
                })

                console.log(list);
            
                addContact(list)
            })
        }
    }

    render() {
        const { refreshing, search, contacts, loading } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.between}>
                    <Text style={styles.Header}>CONTACT</Text>

                    <TouchableOpacity style={styles.icon} onPress={() => this.saveContact()}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={30}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.row, { alignItems: 'center'}]}>
                    <TextInput 
                        style={styles.search} 
                        placeholder={`Search for guest`} 
                        placeholderTextColor="#707070" 
                        value={search}
                        onChange={(e) => this.setState({ search: e.nativeEvent.text })}
                        onSubmitEditing={(e) => this.setState({ search: e.nativeEvent.text })}
                    />
                    {/* <TouchableOpacity style={styles.icon} onPress={() => this.searchGuest(search)}>
                        <Ionicons name={'ios-arrow-forward'} color={'white'} size={30}/>
                    </TouchableOpacity> */}
                </View>

                <Segment color="#E4E4E4" loading={loading}>
                    <FlatList 
                    onRefresh={() => this.getAll()}
                    refreshing={refreshing}
                    data={contacts.filter(x => x.displayName.toLowerCase().includes(search.toLowerCase()))}
                    initialNumToRender={12}
                    renderItem={({ item, index }) => 
                        (<View style={{ width: '100%', flex: 1}}> 
                            <View style={style.container}>
                                
                                <Text numberOfLines={2} style={style.contact}>{item.displayName}</Text>                           

                                <TouchableOpacity style={style.icon} onPress={() => this.select(item, index)}>
                                    <Ionicons name={item.selected? 'ios-radio-button-on' : 'ios-radio-button-off'} color={'black'} size={30}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.hairLine} />
                        
                        </View>) 
                    }
                    keyExtractor={(item,index) => index.toString()}
                    />
                </Segment>
            </View>
        )
    }
}
