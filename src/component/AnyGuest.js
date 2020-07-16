import React, { Component, PureComponent } from 'react';
import { PermissionsAndroid, Platform, View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
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

export default class AnyGuest extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            search: '',
            refreshing: true,
            contacts: [
                {
                    uid: "11212",
                    name: 'biola',
                    email: 'yeancahBrahms7@gmail.com',
                    phoneNumber: "+3248142319913",
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
                {
                    uid: "11212qwqwe",
                    name: 'Olayinka',
                    email: 'yeancahBrahms7@gmail.com',
                    phoneNumber: "+3248142319913",
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
                {
                    uid: "11212popi",
                    name: 'Zharadeen',
                    email: 'yeancahBrahms7@gmail.com',
                    phoneNumber: "+3248142319913",
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
                {
                    uid: "11212mnbnmb",
                    name: 'Najeeb',
                    email: 'yeancahBrahms7@gmail.com',
                    phoneNumber: "+3248142319913",
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
                {
                    uid: "11212zcxzcx",
                    name: 'Teslim',
                    email: 'tessy@gmail.com',
                    phoneNumber: "+3248142319913",
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
                {
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
                }
            ],
            loading: false,
        }
    }
    
    componentDidMount() {
        this.getAll()
    }
    
    getAll = () => {
        this.setState({ refreshing: false })
    }


    select = (contact) => {
        const { addContact, selection } = this.props;

        const { contacts } = this.state;
        

        let index = contacts.findIndex(x => x.uid === contact.uid);
        
        if (!!contact.selected) {
            contacts[index] = {...contact, selected: false }
        } else {
            contacts[index] = {...contact, selected: true }
        }  
        
        this.setState({ contacts: [...contacts] })
    
    }


    saveContact = () => {
        const { addContact, selection, close } = this.props;

        if (selection === 'single') {
            close()
        } else {
            const { contacts } = this.state;
            this.setState({ loading: true }, () => {

                const list = contacts.filter(contact => {
                    if (!!contact.selected) {
                        return contact
                    }
                }).map(contact => ({
                    name: contact.name,
                    phoneNumber: contact.phoneNumber,
                    email: contact.email
                }))

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
                    <Text style={styles.Header}>GUEST</Text>

                    <TouchableOpacity style={styles.icon} onPress={() => this.saveContact()}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
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
                    data={contacts}
                    initialNumToRender={12}
                    renderItem={({ item, index }) => 
                        (<View style={{ width: '100%', flex: 1}}> 
                            <View style={style.container}>
                                <View>
                                    <Text numberOfLines={2} style={style.contact}>{item.name}</Text>                           

                                    <Text>Invited by {item.invitedBy.name}</Text>
                                </View>

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
