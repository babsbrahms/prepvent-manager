import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Segment from './Segment';
import Option from './Option';
import SideBar from "./SideBar";
import AddContact from "./AddContact";
import styles from '../styles';
import Message from "./Message"


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
    }
});

export default class MealServices extends Component {

    constructor(props) {
        super(props);

        this.state ={ 
            optionOpen: false,
            optionType: '',
            table: '',
            poll: '',
            loading: false,
            meal: {
                title: "",
                question: "",
                options: {
    
                },
            },
            total: 0,
            guest: []
        }
    }

    openOption = (option) => this.setState({ optionOpen: true, optionType: option })

    closeOption = () => this.setState({ optionOpen: false, optionType: '' })

    selectMeal = (poll) => {
        
        let total = Object.values(poll.options).reduce((a,c) => a + c, 0);

        this.setState({ meal: poll, total  })
    }

    selectTable = table => {
        this.setState({ table })
    }

    render() {
        const { close, polls, tables } = this.props;
        const { optionOpen, table, optionType, loading, meal, total, guest} = this.state;

        return (
        <View style={{ width: '100%', height: "100%", flex: 1 }}>
            <View style={styles.container}>
                <View style={{ backgroundColor: "#0E0C20", height: getStatusBarHeight(true)}} />
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => close()}>
                        <Ionicons name={'ios-arrow-back'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={() => this.submit()}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>TABLE SERVICES</Text>

                <View style={[styles.between, { alignItems: 'center'}]}>
                    <Text style={styles.title}>TABLE</Text>

                    <TouchableOpacity onPress={() => this.openOption('Table')} style={style.action}>
                        <Text style={style.todoDetailValue}>{table.name}</Text>
                        <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                    </TouchableOpacity> 
                </View>

                <View style={[styles.between, { alignItems: 'center'}]}>
                    <Text style={styles.title}>Meal</Text>

                    <TouchableOpacity onPress={() => this.openOption('Meal')} style={style.action}>
                        <Text style={style.todoDetailValue}>{meal.title}</Text>
                        <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                    </TouchableOpacity> 
                </View>

                <Segment loading={loading}>

                </Segment>
                <View>
                    <Text>Guest: {guest.length}</Text>
                    {Object.keys(meal.options).map((option, index) => (
                        <View key={index.toString()} >
                            <View style={styles.between}>
                                <Text style={style.to}>{option}</Text>
                                <Text style={style.to}>{meal.options[option]} votes</Text>
                            </View>

                            <View style={style.bar}>
                                <View style={[style.slide, { width: `${(meal.options[option]/total)*100}%` }]}/>
                            </View>
                        </View>
                    ))}
                    <Text>No Meal: {(guest.length) - total}</Text>
                </View>
                <Option title={optionType} openModal={optionOpen} closeModal={() => this.closeOption()}>
                    {(optionType === 'Table') && (<View>
                        {tables.map((table) => (
                            <TouchableOpacity key={table.uid} 
                                style={styles.optionBody} 
                                onPress={() => this.selectTable(table)}
                            >
                                <Text style={styles.optionText}>{table.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>)}
                    
                    {(optionType === 'Meal') && (<View>
                        {polls.map((poll) => (
                            <TouchableOpacity key={poll.title} 
                                style={styles.optionBody} 
                                onPress={() => this.selectMeal(poll)}
                            >
                                <Text style={styles.optionText}>{poll.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>)}
                </Option>

            </View>
            <Message />
        </View>
        )
    }
}
