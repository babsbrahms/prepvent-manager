import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
import moment from 'moment';
import Segment from '../component/Segment';
import Option from './Option';
import styles from '../styles';
import { contactFilter, contactSearch } from "../utils/filter";


const style = StyleSheet.create({
    todo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
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


export default class Guest extends Component {
    state = { 
        refreshing: false,
        selectedIndex: -1,
        filterParams: 'Invited',
        searchParams: 'Name',
        optionOpen: false,
        option: '',
        search: "",
        data: [
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

    openOption = (option) => this.setState({ optionOpen: true, option })

    closeOption = () => this.setState({ optionOpen: false, option: '' })

    selectFilter = contact => {
        this.closeOption()
        
        if (contact.options) {
            this.openOption('invite')
        } else {
            this.setState({ filterParams: contact.name, option: '' })
        }
    }

    selectSearch = contact => {
        this.closeOption()
        this.setState({ searchParams: contact.name, option: '' })
    }

    searchGuest = () => {

    }

    render() {
        const { refreshing, selectedIndex, searchParams, filterParams, optionOpen, option, search, data, polls } = this.state;
        
        const { close, editGuest } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.between}>
                    <Text style={styles.Header}>GUEST</Text>

                    <TouchableOpacity style={styles.icon} onPress={() => close()}>
                        <Ionicons name={'ios-close'} color={'white'} size={30}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.row, { alignItems: 'center'}]}>
                    <TextInput 
                        style={styles.search} 
                        placeholder={`Search for guest by ${searchParams}`} 
                        placeholderTextColor="#707070" 
                        value={search}
                        onChange={(e) => this.setState({ search: e.nativeEvent.text })}
                        onSubmitEditing={(e) => this.searchGuest()}
                    />
                    <TouchableOpacity style={styles.icon} onPress={() => this.searchGuest()}>
                        <Ionicons name={'ios-arrow-forward'} color={'white'} size={30}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.around}>
                    <TouchableOpacity onPress={() => this.openOption('filter')}>
                        <Text style={styles.title}>Filter By</Text>
                        <Text style={style.params}>{filterParams.toLowerCase()}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.openOption('search')}>
                        <Text style={styles.title}>Search By</Text>
                        <Text style={style.params}>{searchParams.toLowerCase()}</Text>
                    </TouchableOpacity>
                </View>

                <Segment color="#E4E4E4">
                    <FlatList 
                    onRefresh={() => {}}
                    refreshing={refreshing}
                    data={data}
                    renderItem={({ item, index }) => 
                        (<View> 
                            <Text style={style.todo}>{item.name}</Text>                       
                            <View style={styles.between}>
                                <TouchableOpacity style={styles.icon} onPress={() => this.setState({ selectedIndex: (selectedIndex === index)? -1 : index })}>
                                    <Ionicons name={selectedIndex === index? 'ios-arrow-dropup-circle' : 'ios-arrow-dropdown-circle'} color={'#707070'} size={30}/>
                                </TouchableOpacity>

                                <View style={styles.row}>
                                    {(!!item.email) && (<TouchableOpacity style={styles.icon} onPress={() => Communications.email([`${item.email}`],null,null,'','')}>
                                        <Ionicons name={'ios-mail'} color={'#707070'} size={30}/>
                                    </TouchableOpacity>)}

                                    {(!!item.phoneNumber) && (<TouchableOpacity style={styles.icon} onPress={() => Communications.text(item.phoneNumber)}>
                                        <Ionicons name={'ios-chatboxes'} color={'#707070'} size={30}/>
                                    </TouchableOpacity>)}

                                    {(!!item.phoneNumber) && (<TouchableOpacity style={styles.icon} onPress={() => Communications.phonecall(item.phoneNumber, false)}>
                                        <Ionicons name={'ios-call'} color={'#707070'} size={30}/>
                                    </TouchableOpacity>)}
                                </View>
                            </View>
                            {(selectedIndex === index) && (<View style={style.todoDetail}>
                                <View>
                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Name</Text>

                                        <Text style={style.todoDetailValue}>{item.name? item.name : "none"}</Text>
                      
                                    </View>


                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Email</Text>

                                        <Text style={style.todoDetailValue}>{item.email? item.email : "none"}</Text>
                                    </View>


                                    <View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Phone Number</Text>

                                        <Text style={style.todoDetailValue}>{item.phoneNumber? item.phoneNumber : "none"}</Text>
                                    </View>
                                    

                                    {(!!item.invited) && (<View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Invited</Text>

                                        <Text style={style.todoDetailValue}>{item.invited? moment(item.invited).format("ddd Do MMM YYYY hh:mm a") : "none"}</Text>
                                    </View> )}


                                    {(!!item.invitedBy) && (<View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Invited By</Text>

                                        <Text style={style.todoDetailValue}>{item.invitedBy? item.invitedBy.name : "none"}</Text>
                                    </View>)}


                                    {(!!item.accepted) && (<View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Accepted</Text>

                                        <Text style={style.todoDetailValue}>{item.accepted? moment(item.accepted).format("ddd Do MMM YYYY hh:mm a") : "none"}</Text>
                                    </View>)} 


                                    {(!!item.checkedIn) && (<View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Checked In</Text>

                                        <Text style={style.todoDetailValue}>{item.checkedIn? moment(item.checkedIn).format("ddd Do MMM YYYY hh:mm a") : "none"}</Text>
                                    </View> )}


                                    {(!!item.vip) && (<View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>VIP</Text>

                                        <Text style={style.todoDetailValue}>{item.vip.alert? 'true' : "false"}</Text>
                                    </View>)}


                                    {(!!item.table) &&<View style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>Table</Text>

                                        <Text style={style.todoDetailValue}>{item.table? item.table.name : "none"}</Text>
                                    </View>}

                                    {polls.map(key => (
                                        <View key={key.title} style={style.todoDetailIndex}>
                                            <Text style={style.todoDetailKey}>{key.title}</Text>

                                            <Text style={style.todoDetailValue}>{!!item[key.title]? item[key.title] : "none"}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.between}>
                                    {/* <TouchableOpacity style={styles.icon} onPress={() =>  {}}>
                                        <Text style={[style.todoAction, { color: '#2DF19C' }]}>INVITE</Text>
                                    </TouchableOpacity> */}
                                    
                                    <TouchableOpacity style={styles.icon} onPress={() => editGuest(item)}>
                                        <Text style={[style.todoAction, { color: '#2DF19C' }]}>EDIT</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.icon} onPress={() => {}}>
                                        <Text style={[style.todoAction, { color: '#EC3636' }]}>DELETE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>)}

                            <View style={styles.hairLine} />
                        
                        </View>) 
                    }
                    keyExtractor={(item,index) => index.toString()}
                    />
                </Segment>

                <Option title={`${option} by`} openModal={optionOpen} closeModal={() => this.closeOption()}>
                    {(option === 'filter') && (
                    <View>
                        {contactFilter.map((contact) => (
                        <TouchableOpacity key={contact.name} style={[styles.optionBody, { borderBottomColor: filterParams === contact.name? '#2DF19C': '#707070'} ]} onPress={() => this.selectFilter(contact)}>
                            <Text style={styles.optionText}>{contact.name}</Text>
                        </TouchableOpacity>
                        ))}
                    </View>)}


                    {(option === 'search') && (
                    <View>
                        {contactSearch.map((contact) => (
                        <TouchableOpacity key={contact.name} style={[styles.optionBody, { borderBottomColor: searchParams === contact.name? '#2DF19C': '#707070'} ]} onPress={() => this.selectSearch(contact)}>
                            <Text style={styles.optionText}>{contact.name}</Text>
                        </TouchableOpacity>
                        ))}
                    </View>)}


                    {(option === 'invite') && (
                    <View>
                        <ActivityIndicator size="small" color={'#2DF19C'} />
                    </View>)}
                </Option>
            </View>
        )
    }
}
