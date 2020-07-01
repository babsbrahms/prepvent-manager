import React, { Component, PureComponent } from 'react';
import { PermissionsAndroid, Platform, View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Contacts from 'react-native-contacts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Segment from '../component/Segment';
import styles from '../styles';


const style = StyleSheet.create({
    todo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    },
    todoTable: {
        fontSize: 18,
        color: '#0E0C20'
    },
    todoDetail: {
        backgroundColor: '#707070',
        padding: 3,
    },
    todoDetailIndex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 5,
        padding: 3
    },
    todoDetailKey: {
        // alignSelf: "flex-start",
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    todoDetailValue: {
        // alignSelf: "flex-end",
        fontSize: 14,
        color: '#E4E4E4'
    }, 
    todoAction: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    params: {
        color: '#E4E4E4',
        fontSize: 20,
        textAlign: 'center'
    }

});

export default class AddContact extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            search: '',
            refreshing: true,
            contacts: [],
            loading: false
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
                
            // let format = contacts.map(contact => ({
            //     recordId: contact.recordID,
            //     name: `${contact.givenName} ${contact.middleName} ${contact.familyName}`,
            //     phoneNumber: contact.phoneNumbers.length > 0 ? `${contact.phoneNumbers[0].number}` : '',
            //     email: contact.emailAddresses.length > 0 ? `${contact.emailAddresses[0].email}` : '',
            //     selected: false
            // }))
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

    searchGuest = (text) => {

        
        const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
        if (text === "" || text === null) {
            loadContacts();
        } else if (phoneNumberRegex.test(text)) {
            Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
            contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase());
            this.setState({ contacts: contacts })
            // console.log('contacts', contacts);
            });
        } else {
            Contacts.getContactsMatchingString(text, (err, contacts) => {
            contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase());
            this.setState({ contacts: contacts })
            // console.log('contacts', contacts);
            });
        }
       
    }

    select = (contact, index) => {
        const { addContact, selection } = this.props;
        
        if (selection === 'single') {
            this.setState({ loading: true }, () => {
                // addContact(contact)
            })    
        } else {

        }
    }

    render() {
        const { refreshing, search, contacts, loading } = this.state;
        const { close } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.between}>
                    <Text style={styles.Header}>CONTACT</Text>

                    <TouchableOpacity style={styles.icon} onPress={() => close()}>
                        <Ionicons name={'ios-close'} color={'white'} size={30}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.row, { alignItems: 'center'}]}>
                    <TextInput 
                        style={styles.search} 
                        placeholder={`Search for guest`} 
                        placeholderTextColor="#707070" 
                        value={search}
                        onChange={(e) => this.setState({ search: e.nativeEvent.text })}
                        onSubmitEditing={(e) => this.searchGuest()}
                    />
                    <TouchableOpacity style={styles.icon} onPress={() => this.searchGuest()}>
                        <Ionicons name={'ios-arrow-forward'} color={'white'} size={30}/>
                    </TouchableOpacity>
                </View>

                <Segment color="#E4E4E4" loading={loading}>
                    <FlatList 
                    onRefresh={() => this.getAll()}
                    refreshing={refreshing}
                    data={contacts}
                    initialNumToRender={12}
                    renderItem={({ item, index }) => 
                        (<TouchableOpacity onPress={() => this.select(item, index)}> 
                            <Text style={style.todo}>{`${item.givenName} ${item.middleName} ${item.familyName}`}</Text>                       
                            {/* {(!!item.phoneNumber) && (<Text style={style.todoTable}>{item.phoneNumber}</Text>)}
                            {(!!item.email) && (<Text style={style.todoTable}>{item.email}</Text>)} */}
                            <View style={styles.hairLine} />
                        
                        </TouchableOpacity>) 
                    }
                    keyExtractor={(item,index) => index.toString()}
                    />
                </Segment>
            </View>
        )
    }
}
