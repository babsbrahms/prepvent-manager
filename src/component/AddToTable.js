import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, TextInput, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Communications from 'react-native-communications';
import moment from 'moment';
import Segment from '../component/Segment';
import SideBar from './SideBar';
import Option from './Option';
import styles from '../styles';
import { contactFilter, contactSearch } from "../utils/filter";


const style = StyleSheet.create({
    controller: {
        borderRadius: 20,
        marginTop: 0,
        marginBottom: 9,
        width: '100%',
      //  height: '25%',
        backgroundColor: "#E4E4E4",
        padding: 5,
        marginTop: 9
    },
    todo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0E0C20'
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
    },
    text: {
        color: '#707070',
        fontSize: 24,  
    },
    link: {
        // borderBottomColor: '#0E0C20',
        padding: 4,
        marginHorizontal: 3,
        borderBottomWidth: 4
    },

});

export default class AddToTable extends Component {
    state = {
        refreshing: false,
        loading: false,
        filterParams: 'Invited',
        searchParams: 'Name',
        optionOpen: false,
        option: '',
        subtitle: '',
        type: '',
        selectedIndex: -1,
        selectedTable: this.props.table,
        search: "",
        guests: [
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
                table: null,
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
    }

    openOption = (option, subtitle) => this.setState({ optionOpen: true, option, subtitle: subtitle || '' })

    closeOption = () => this.setState({ optionOpen: false, option: '', subtitle: '' })

    selectFilter = contact => {
        this.closeOption();
        this.setState({ filterParams: contact.name })
  
        if (contact.name === 'Invited') {
            
        } else if (contact.name === 'Accepted') {

        } else if (contact.name === 'Invited By') {
            this.openOption('Invited By', 'Guest invited by:')
        } else if (contact.name === 'Checked In') {

        } else if (contact.name === 'Not Accepted') {

        } else if (contact.name === 'VIP') {

        } else if (contact.name === 'Table') {
            this.openOption('Table', 'Guest on table:')
        } else if (contact.name === 'Reply Poll') {
            this.openOption('Reply Poll', 'Guest that responsed to a poll below:')
        } else if (contact.name === 'Ignore Poll') {
            this.openOption('Ignore Poll', 'Guest that have not responsed to a poll below:')
        }
    }

    findByOrganizer = organizer => {
        this.closeOption();
    }

    findByTable = table => {
        this.closeOption();
    }

    findByReplyPoll = poll => {
        this.closeOption();
    }

    findByIgnorePoll = poll => {
        this.closeOption();
    }

    selectSearch = contact => {
        this.closeOption()
        this.setState({ searchParams: contact.name, option: '' })
    }

    render() {
        const { close, polls, tables, organizers } = this.props;
        const { sideBarOpen, refreshing, filterParams, searchParams, option, optionOpen,
            selectedTable, search,  guests, loading, subtitle, type } = this.state;
            

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
                        onSubmitEditing={(e) => this.setState({ search: e.nativeEvent.text })}
                    />
                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name={'ios-arrow-forward'} color={'white'} size={30}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.around}>
                    <TouchableOpacity onPress={() =>  this.setState({ type: 'Filter By'}, () => this.openOption('filter'))}>
                        <Text style={styles.title}>Filter By</Text>
                        <Text style={style.params}>{filterParams.toLowerCase()}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.setState({ type: 'Search By'}, () => this.openOption('search'))}>
                        <Text style={styles.title}>Search By</Text>
                        <Text style={style.params}>{searchParams.toLowerCase()}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Add guest to {selectedTable ? selectedTable.name : ''}</Text>
                <Segment loading={loading} color="#E4E4E4">
                    <FlatList 
                    onRefresh={() => {}}
                    refreshing={refreshing}
                    data={guests}
                    renderItem={({ item, index }) => 
                        (<TouchableOpacity> 
                            <Text style={style.todo}>{item.name}</Text>     
                            <Text> invited by {item.invitedBy.name}</Text>                  
                            <View style={[styles.row, { justifyContent: 'flex-end' }]}>
                                <Text style={[style.todoTable, { color: item.table? '#0E0C20' : '#EC3636'}]}>{item.table? item.table.name : "no table"}</Text>
                            </View>
                            <View style={styles.hairLine} />
                        </TouchableOpacity>) 
                    }
                    keyExtractor={(item,index) => index.toString()}
                    />
                </Segment>

                <Option title={type} subtitle={subtitle} openModal={optionOpen} closeModal={() => this.closeOption()}>
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


                    {(option === 'Invited By') && (<View>
                        {organizers.map((organizer) => (
                            <TouchableOpacity key={organizer.uid} 
                                style={styles.optionBody} 
                                onPress={() => this.findByOrganizer(organizer)}
                            >
                                <Text style={styles.optionText}>{organizer.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>)}

                    
                    {(option === 'Table') && (<View>
                        {tables.map((table) => (
                            <TouchableOpacity key={table.uid} 
                                style={styles.optionBody} 
                                onPress={() => this.findByTable(table)}
                            >
                                <Text style={styles.optionText}>{table.name}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity 
                            style={[styles.optionBody, { borderBottomColor: '#EC3636'}]} 
                            onPress={() => this.findByTable(null)}
                            >
                            <Text style={styles.optionText}>No Table</Text>
                        </TouchableOpacity>
                    </View>)}

                    {(option === 'Reply Poll') && (<View>
                        {polls.map((poll) => (
                            <TouchableOpacity key={poll.title} 
                                style={styles.optionBody} 
                                onPress={() => this.findByReplyPoll(poll)}
                            >
                                <Text style={styles.optionText}>{poll.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>)}

                    {(option === 'Ignore Poll') && (<View>
                        {polls.map((poll) => (
                            <TouchableOpacity key={poll.title} 
                                style={styles.optionBody} 
                                onPress={() => this.findByIgnorePoll(poll)}
                            >
                                <Text style={styles.optionText}>{poll.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>)}
                </Option>
            </View>

        )
    }
}