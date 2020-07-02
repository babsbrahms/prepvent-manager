import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Communications from 'react-native-communications';
import Segment from '../component/Segment';
import SideBar from './SideBar';
import Option from './Option';
import styles from '../styles';

const contactFilter = [
    { name: 'Any', options: true },
    { name: 'Invited', options: false },
    { name: 'Accepted', options: false },
    { name: 'Invited By', options: true },
    { name: 'Checked In', options: false },
    { name: 'Not Accepted', options: false },
    { name: 'VIP', options: false },
];

const contactSearch = [
    { name: 'Name', options: false },
    { name: 'Phone number', options: false },
    { name: 'Email', options: false },
];

const style = StyleSheet.create({
    controller: {
        borderRadius: 20,
        marginTop: 0,
        marginBottom: 9,
        width: '100%',
        height: '25%',
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

export default class TableChart extends Component {
    state = {
        sideBarOpen: false,
        refreshing: false,
        loading: false,
        filterParams: 'invited',
        searchParams: 'name',
        optionOpen: false,
        option: '',
        selectedIndex: -1,
        selected: { uid: 'ddsdsdsd'},
        selectedTable: '',
        tables: ['Table 1', 'Bride Table', "Childre's Table"],
        newTableName: "",
        search: "",
        guests: [
            {
                name: 'biola',
                table: "table 2",
                uid: '12weq1e3'  
            },
            {
                name: 'Olayinka',
                table: "table 1",
                uid: '1weqw1e'  
            },
            {
                name: 'Zharadeen',
                table: "table 1",
                uid: '1weq431e3'  
            },
            {
                name: 'Najeeb',
                table: "table 2",
                uid: '12weqw3433'  
            },            
            {
                name: 'Teslim',
                table: "table 1",
                uid: '12eqw431e3'  
            },
            {
                name: 'Rukayat',
                uid: '12we3431e3'  
            }
        ],
        data: [
            {
                name: 'biola',
                email: 'yeancahBrahms7@gmail.com',
                phoneNumber: "+3248142319913",
                VIP: true,
                accpted: true,
                uid: '12weq1e3'  
            },
            {
                name: 'Olayinka',
                email: 'yeancahBrahms7@gmail.com',
                phoneNumber: "+3248142319913",
                VIP: true,
                accpted: true,
                uid: '1weqw1e'  
            },
            {
                name: 'Zharadeen',
                email: 'yeancahBrahms7@gmail.com',
                phoneNumber: "+3248142319913",
                VIP: true,
                accpted: true,
                uid: '1weq431e3'  
            },
            {
                name: 'Najeeb',
                email: 'yeancahBrahms7@gmail.com',
                phoneNumber: "+3248142319913",
                VIP: true,
                accpted: true,
                uid: '12weqw3433'  
            },            
            {
                name: 'Teslim',
                email: 'tessy@gmail.com',
                phoneNumber: "+3248142319913",
                VIP: true,
                accpted: true,
                uid: '12eqw431e3'  
            },
            {
                name: 'Rukayat',
                email: 'ruka@gmail.com',
                VIP: true,
                accpted: true,
                uid: '12we3431e3'  
            }
        ]
    }

    openSideBar = () => this.setState({ sideBarOpen: true })

    closeSideBar = () => this.setState({ sideBarOpen: false })

    openOption = (option) => this.setState({ optionOpen: true, option })

    closeOption = () => this.setState({ optionOpen: false, option: '' })

    selectFilter = contact => {
        this.closeOption()
        this.setState({ filterParams: contact.name, option: '' })
        // if (contact.options) {
        //     this.openSideBar()
        // } else {

        // }
    }

    selectSearch = contact => {
        this.closeOption()
        this.setState({ searchParams: contact.name, option: '' })
    }

    addTable = () => {
        const { newTableName, tables} = this.state;
         

        let index = tables.indexOf()
        if ((index < 0) && (newTableName !== "")) {
            this.setState({ table: [ ...tables, newTableName], newTableName: "" })
        } else {

        }  
    }

    deleteTable = (table) => {
        Alert.alert('Warning', `Are you sure you want to delete ${table}`, [
            { text: "Yes", onPress: () => this.confirmDeleteTable(table)},
            {text: "Cancel", onPress: () => null }
        ], { cancelable: true })
    }

    confirmDeleteTable = (table) => {

    }

    selectTable = (table) => {
        this.setState({ selectedTable: table })
    }

    render() {
        const { close, editGuest } = this.props;
        const { sideBarOpen, refreshing, filterParams, searchParams, option, optionOpen, selectedIndex,
            selectedTable, tables, selected, newTableName, search, data, guests, loading } = this.state;

        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: "#0E0C20", height: getStatusBarHeight(true)}} />
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => close()}>
                        <Ionicons name={'ios-arrow-back'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>TABLE CHART</Text>

                {(!!selectedTable) && (
                <View style={styles.between}>
                    <Text style={styles.title}>{selectedTable}</Text>

                    <TouchableOpacity style={styles.icon} onPress={() => this.openSideBar()}>
                        <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                    </TouchableOpacity>
                </View>)}

                <View style={{ width: '100%', height: "100%", flex: 1 }}>
                    <Segment disabled={loading} color="#E4E4E4" marginTop={2}>
                        <FlatList 
                        onRefresh={() => {}}
                        refreshing={refreshing}
                        data={data}
                        renderItem={({ item, index }) => 
                            (<View> 
                                <View style={[styles.between, { alignItems: "center"}]}>
                                <Text style={style.todo}>{item.name}</Text>  
                                </View>
                                                       
                                <View style={styles.between}>
                                    <View style={styles.row}>
                                        <TouchableOpacity style={styles.icon} onPress={() => this.setState({ selectedIndex: (selectedIndex === index)? -1 : index })}>
                                            <Ionicons name={selectedIndex === index? 'ios-arrow-dropup-circle' : 'ios-arrow-dropdown-circle'} color={'#707070'} size={30}/>
                                        </TouchableOpacity>
                                        {(!!item.email) && (<TouchableOpacity style={styles.icon} onPress={() => Communications.email([`${item.email}`],null,null,'','')}>
                                            <Ionicons name={'ios-mail'} color={'#707070'} size={30}/>
                                        </TouchableOpacity>)}

                                        {(!!item.phoneNumber) && (<TouchableOpacity style={styles.icon} onPress={() => Communications.phonecall(item.phoneNumber, false)}>
                                            <Ionicons name={'ios-call'} color={'#707070'} size={30}/>
                                        </TouchableOpacity>)}
                                    </View>

                                    
                                    <TouchableOpacity style={styles.icon}>
                                        <Ionicons name={'ios-remove-circle-outline'} size={30} color={"#EC3636"}/>
                                    </TouchableOpacity>
                                </View>
                                {(selectedIndex === index) && (<View style={style.todoDetail}>
                                    <View>
                                        {Object.keys(item).map(key =>(
                                        <View key={key} style={style.todoDetailIndex}>
                                            <Text style={style.todoDetailKey}>{key}</Text>

                                            <Text style={style.todoDetailValue}>{String(item[key])}</Text>
                                        </View>))}
                                    </View>
                                    <View style={styles.between}>                                        
                                        <TouchableOpacity style={styles.icon} onPress={() =>  editGuest(selected.uid)}>
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
    
                    <View style={style.controller}>
                        <ScrollView>
                        <View style={[styles.row]}>
                            <ScrollView style={{ width: '85%', }}>
                                <TextInput 
                                    style={styles.textInput} 
                                    placeholder={`Add table name`} 
                                    placeholderTextColor="#0E0C20"
                                    value={newTableName}
                                    onChange={(e) => this.setState({ newTableName: e.nativeEvent.text })}
                                    onSubmitEditing={(e) => this.addTable()}
                                />

                            </ScrollView>
                            <View>
                                <TouchableOpacity style={styles.icon} onPress={() => this.addTable()}>
                                    <Ionicons name={'md-add-circle'} size={35} color={'#2DF19C'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginBottom: 9 }}/>
                        <View style={[styles.row]}>
                            <ScrollView style={{ width: '85%', }}>
                            
                                <ScrollView horizontal style={{ alignSelf: 'flex-end', paddingBottom: 4, borderBottomWidth: 3, borderBottomColor: '#707070'}}>
                                    {tables.map(table => 
                                        <TouchableOpacity
                                            key={table}
                                            style={[style.link, { borderBottomColor: selectedTable === table? '#2DF19C' : '#0E0C20'}]}
                                            onPress={() => this.selectTable(table)}
                                        >
                                            <Text style={style.text}>{table}</Text>
                                        </TouchableOpacity>
                                    )}
                                </ScrollView>
                                <Text style={{ color: '#000000', textAlign: 'center'}}>scroll horizontally</Text>

                            </ScrollView>
                            <View>
                                <TouchableOpacity disabled={!selectedTable} style={styles.icon} onPress={() => this.deleteTable(selectedTable)}>
                                    <Ionicons name={'md-remove-circle'} size={35} color={'#EC3636'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </ScrollView>
                    </View>
                </View>

                <SideBar sideBarOpen={sideBarOpen} close={() => this.closeSideBar()} > 
                    <View style={styles.container}>
                        <View style={styles.between}>
                            <Text style={styles.Header}>GUEST</Text>

                            <TouchableOpacity style={styles.icon} onPress={() => this.closeSideBar()}>
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
                            <TouchableOpacity onPress={() => this.openOption('filter')}>
                                <Text style={styles.title}>Filter By</Text>
                                <Text style={style.params}>{filterParams.toLowerCase()}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.openOption('search')}>
                                <Text style={styles.title}>Search By</Text>
                                <Text style={style.params}>{searchParams.toLowerCase()}</Text>
                            </TouchableOpacity>
                        </View>

                        <Segment loading={loading} color="#E4E4E4">
                            <FlatList 
                            onRefresh={() => {}}
                            refreshing={refreshing}
                            data={guests}
                            renderItem={({ item, index }) => 
                                (<TouchableOpacity> 
                                    <Text style={style.todo}>{item.name}</Text>                       
                                    <View style={[styles.row, { justifyContent: 'flex-end' }]}>
                                    <Text style={[style.todoTable, { color: item.table? '#0E0C20' : '#EC3636'}]}>{item.table || "no table"}</Text>
                                    </View>

                                    <View style={styles.hairLine} />
                                </TouchableOpacity>) 
                            }
                            keyExtractor={(item,index) => index.toString()}
                            />
                        </Segment>

                        <Option title={`${option} by`} openModal={optionOpen} closeModal={() => this.closeOption()}>
                            {(option === 'filter') && (
                            <View>
                                
                                {contactFilter.map((contact) => (
                                <TouchableOpacity key={contact.name} style={styles.optionBody} onPress={() => this.selectFilter(contact)}>
                                    <Text style={styles.optionText}>{contact.name}</Text>
                                </TouchableOpacity>
                                ))}
                            </View>)}


                            {(option === 'search') && (
                            <View>
                           
                                {contactSearch.map((contact) => (
                                <TouchableOpacity key={contact.name} style={styles.optionBody} onPress={() => this.selectSearch(contact)}>
                                    <Text style={styles.optionText}>{contact.name}</Text>
                                </TouchableOpacity>
                                ))}
                            </View>)}
                        </Option>
                    </View>
                </SideBar>
            </View>
        )
    }
}