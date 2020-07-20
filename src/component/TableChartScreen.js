import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, TextInput, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { getStatusBarHeight } from 'react-native-status-bar-height';
import Communications from 'react-native-communications';
import moment from 'moment';
import Segment from '../component/Segment';
import styles from '../styles';

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

export default class TableChart extends Component {
    state = {
        refreshing: false,
        loading: false,
        selectedIndex: -1,
        selectedTable: null,
        newTableName: "",
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
    }

    addTable = () => {
        const { newTableName, tables} = this.state;
         
 
    }

    deleteTable = (table) => {
        const { addMessage } = this.props;
        if (table) {
            Alert.alert('Warning', `Are you sure you want to delete ${table.name}`, [
                { text: "Yes", onPress: () => this.confirmDeleteTable(table)},
                { text: "Cancel", onPress: () => null }
            ], { cancelable: true })

        } else {
            addMessage('Select a table to delete it')
        }
    }

    confirmDeleteTable = (table) => {
        this.setState({ loading: true })
    }

    selectTable = (table) => {
        this.setState({ selectedTable: table })
    }

    render() {
        const { editGuest, polls, tables, openSideBar } = this.props;
        const { refreshing, selectedIndex, selectedTable, newTableName, data, loading } = this.state;
            

        return (

            <View style={{ width: '100%', height: "100%", flex: 1 }}>
                <Text style={styles.Header}>TABLE CHART</Text>

                {(!!selectedTable) && (
                <View style={styles.between}>
                    <Text style={styles.title}>{selectedTable.name}</Text>

                    <TouchableOpacity style={styles.icon} onPress={() => openSideBar(selectedTable)}>
                        <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                    </TouchableOpacity>
                </View>)}

                <View style={{ width: '100%', height: "100%", flex: 1 }}>
                    <Segment loading={loading} color="#E4E4E4" marginTop={2}>
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

                                        <TouchableOpacity style={styles.icon}>
                                            <Ionicons name={'ios-remove-circle-outline'} size={30} color={"#EC3636"}/>
                                        </TouchableOpacity>
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

                                            <Text style={style.todoDetailValue}>{!!item.vip.alert? 'true' : "false"}</Text>
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
                                        <TouchableOpacity style={styles.icon} onPress={() =>  editGuest(item)}>
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
                                    placeholderTextColor="#E4E4E4"
                                    value={newTableName}
                                    onChange={(e) => this.setState({ newTableName: e.nativeEvent.text })}
                                    onSubmitEditing={(e) => this.addTable()}
                                />

                            </ScrollView>
                            <View>
                                <TouchableOpacity disabled={loading} style={styles.icon} onPress={() => this.addTable()}>
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
                                            key={table.uid}
                                            // style={style.link}
                                            style={[style.link, { borderBottomColor: (!!selectedTable) && table.name === selectedTable.name? '#2DF19C' : '#0E0C20'}]}
                                            onPress={() => this.selectTable(table)}
                                        >
                                            <Text style={style.text}>{table.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                </ScrollView>
                                <Text style={{ color: '#000000', textAlign: 'center'}}>scroll horizontally</Text>

                            </ScrollView>
                            <View>
                                <TouchableOpacity disabled={loading} style={styles.icon} onPress={() => this.deleteTable(selectedTable)}>
                                    <Ionicons name={'md-remove-circle'} size={35} color={'#EC3636'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}