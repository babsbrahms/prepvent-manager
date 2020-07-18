import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Segment from './Segment';
import Option from './Option';
import styles from '../styles';


const style = StyleSheet.create({
    title: {
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 25
    },
    to: {
        color: '#0E0C20',
        fontSize: 17, 
    },
    link: {
        color: '#707070',
        fontSize: 24
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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0E0C20'
    },
    todoDetailValue: {
        // alignSelf: "flex-end",
        fontSize: 14,
        color: '#0E0C20'
    }, 
    todoAction: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    action: {
        display: "flex",
        flexDirection: "row",
        padding: 8, 
        alignItems: 'center'
    },
    bar: {
        borderRadius: 2,
        marginTop: 3,
        marginBottom: 3,
        width: '100%',
        height: 4,
        backgroundColor: '#FFFFFF',
        
    },
    slide: {
        borderRadius: 2,
        width: '100%',
        height: '100%',
        backgroundColor: '#707070',
    },
    messageText: {
        color: '#0E0C20',
        fontSize: 18,
    },
    messageLink: {
        borderBottomColor: '#707070',
        padding: 3,
        marginHorizontal: 3,
        borderBottomWidth: 4,
    },
    optionValue: {
        // alignSelf: "flex-end",
        fontSize: 14,
        color: '#FFFFFF'
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
});

export default class MealServices extends Component {

    constructor(props) {
        super(props);

        this.state ={ 
            optionOpen: false,
            optionType: '',
            table: {},
            loading: false,
            refreshing: false,
            meal: {
                title: "",
                question: "",
                options: {
    
                },
            },
            total: 0,
            polls: props.polls,
            meals: [],
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
                   // food: 'Fried Rice'  
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
                    food: "Beans" 
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
                    food: 'Amala' 
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
                    food: 'Amala'  
                }
            ],
        }
    }

    openOption = (option) => this.setState({ optionOpen: true, optionType: option })

    closeOption = () => this.setState({ optionOpen: false, optionType: '' })

    selectMeal = (poll) => {
        const {guests} = this.state;
        
        // set all options to zero
        for (const key in poll.options) {
            if (poll.options.hasOwnProperty(key)) {
                poll.options[key] = 0;
            }
        }

        // loop options and re-tally
        guests.forEach(guest => {
            if (guest[poll.title]) {
                poll.options[guest[poll.title]] += 1
            }
        })
        // calcute total
        let total = Object.values(poll.options).reduce((a,c) => a + c, 0);

        this.setState({ meal: {...poll}, total: total  })
    }

    selectTable = table => {
        console.log(table);
        this.setState({ 
            table, 
            meal: {
                title: "",
                question: "",
                options: {

                },
            } 
        }, () => this.closeOption())
    }

    addMeal = (meal, index) => {
        // remove from poll and add to food
        const { meals, polls } = this.state;

        polls.splice(index, 1);
        //meals.push(meal);

        this.setState({ polls: [ ...polls], meals: [...meals, meal ] })
    }

    removeMeal = (meal, index) => {
        // remove from food and add to poll
        const { meals, polls } = this.state;

        meals.splice(index, 1);
       // polls.push(poll);

        this.setState({ polls: [ ...polls, meal], meals: [...meals] })
    }
    
    render() {
        const { close, tables } = this.props;
        const { optionOpen, table, optionType, loading, meal, total, guests, refreshing, polls, meals } = this.state;
        console.log(table);
        return (
        <View style={{ width: '100%', height: "100%", flex: 1 }}>

                <Text style={styles.Header}>CATERING</Text>

                <View style={[styles.between, { alignItems: 'center'}]}>
                    <Text style={styles.title}>Table</Text>

                    <TouchableOpacity onPress={() => this.openOption('Table')} style={style.action}>
                        <Text style={style.optionValue}>{table.name || 'select table'}</Text>
                        <Ionicons name={'ios-arrow-forward'} color={'#FFFFFF'} size={30}/>
                    </TouchableOpacity> 
                </View>

                <View style={[styles.between, { alignItems: 'center'}]}>
                    <Text style={styles.title}>Food</Text>

                    <TouchableOpacity onPress={() => this.openOption('Meal')} style={style.action}>
                        <Text style={style.optionValue}>select food</Text>
                        <Ionicons name={'ios-arrow-forward'} color={'#FFFFFF'} size={30}/>
                    </TouchableOpacity> 
                </View>

                <Segment color="#E4E4E4" loading={loading}>
                    <FlatList 
                        onRefresh={() => {}}
                        refreshing={refreshing}
                        data={guests}
                        renderItem={({ item, index }) => 
                            <View> 
                                <Text style={style.todo}>{item.name}</Text>                       

                                {meals.map(key => (
                                    <View key={key.title} style={style.todoDetailIndex}>
                                        <Text style={style.todoDetailKey}>{key.title}</Text>

                                        <Text style={style.todoDetailValue}>{!!item[key.title]? item[key.title] : "no food"}</Text>
                                    </View>
                                ))}
                    

                                <View style={styles.hairLine} />
                            </View>
                        }
                        keyExtractor={(item,index) => index.toString()}
                    />
                </Segment>
                <View style={{ backgroundColor: '#E4E4E4', borderRadius: 20, marginTop: 9, height: 130, padding: 8 }}>
                    <View style={{ width: '100%', height: 35, flexDirection: 'row' }}>
                        <ScrollView horizontal>
                            {meals.map(food => (
                                <TouchableOpacity 
                                    disabled={loading}
                                    key={food.uid}
                                    style={[style.messageLink, { borderBottomColor: meal.title === food.title ? '#2DF19C' : '#707070'}]}
                                    onPress={() => this.selectMeal(food)}
                                >
                                    <Text style={style.messageText}>{food.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {(!!meal.title) && (<ScrollView>
                        {Object.keys(meal.options).map((option, index) => (
                            <View key={index.toString()} >
                                <View style={styles.between}>
                                    <Text style={style.to}>{option}</Text>
                                    <Text style={style.to}>{meal.options[option]} guests</Text>
                                </View>

                                <View style={style.bar}>
                                    <View style={[style.slide, { width: `${(meal.options[option]/total)*100}%` }]}/>
                                </View>
                            </View>
                        ))}
                        {(guests.length !== total) && (<View>
                            <View style={styles.between}>
                                <Text style={style.to}>No Meal</Text>
                                <Text style={style.to}>{(guests.length) - total} guests</Text>
                            </View>

                            <View style={style.bar}>
                                <View style={[style.slide, { width: `${(((guests.length) - total)/total)*100}%`, backgroundColor: '#EC3636' }]}/>
                            </View>
                        </View>)}
                    </ScrollView>)}
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
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>Select food(green) from polls(red)</Text>
                        {meals.map((poll, index) => (
                            <TouchableOpacity 
                                key={poll.title} 
                                style={[styles.optionBody, { borderBottomColor: '#2DF19C'} ]} 
                                onPress={() => this.removeMeal(poll, index)}
                            >
                                <Text style={styles.optionText}>{poll.title}</Text>
                            </TouchableOpacity>
                        ))}
                        {polls.map((poll, index) => (
                            <TouchableOpacity 
                                key={poll.uid} 
                                style={[styles.optionBody, { borderBottomColor: '#EC3636'} ]} 
                                onPress={() => this.addMeal(poll, index)}
                            >
                                <Text style={styles.optionText}>{poll.title}</Text>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={style.button} onPress={() => this.closeOption()}>
                            <Text style={style.btnText}>SELECT</Text>
                        </TouchableOpacity>
                    </View>)}
                </Option>
        </View>
        )
    }
}
