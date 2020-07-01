import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import moment from 'moment';
import DatePicker from 'react-native-date-picker'
import Segment from '../component/Segment';
import Option from './Option';
import styles from '../styles';

const style = StyleSheet.create({

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


export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state ={ 
            optionOpen: false,
            optionType: '',
            loading: false,
            guild: [ 
                {
                    name: "alert",
                    type: "DateTime",
                    required: false,
                    value: "alert",
                },
                {
                    name: "budget",
                    type: "Number",
                    required: false,
                    value: "budget",
                },
                {
                    name: "assign",
                    type: "Organizer",
                    required: false,
                    value: "assign",
                },            {
                    name: "deadline",
                    type: "DateTime",
                    required: true,
                    value:  "alert",
                },
            ],
            data: {
                task: "",
                alert : "",
                budget: "",
                assign : null,
                deadline: ""
            },
            selected: {},
            organizers: [
                { name: "olayinka ibrahim", email: "ib@gmail.com"},
                { name: "Teslim", email: "Tessy@gmail.com"},
                { name: "olayinka ibrahim", email: "ib@gmail.com"},
                { name: "Teslim", email: "Tessy@gmail.com"},
                { name: "olayinka ibrahim", email: "ib@gmail.com"},
                { name: "Teslim", email: "Tessy@gmail.com"},
            ]
        }

        this.input = React.createRef()
    }

    componentDidMount() {
        const { selectedIndex, selectedData } = this.props;

        if (selectedIndex !== -1) {
            this.setState({ data: selectedData })
        }
    }
    
        
    openOption = (type) => this.setState({ optionOpen: true })

    closeOption = () => this.setState({ optionOpen: false })

    selectedDetail = (key) => this.setState({ selected: key }, () => {
        if (key.type === 'Number') {
            if (this.input) {
                this.input.focus()
            }
        } else if (key.type === "DateTime") { 
            this.openOption()
        } else if (key.type === "Organizer") {
            this.openOption()
        }
    })  
    
    setData = ( value) => {
        const {selected} = this.state;

        this.setState({ data: { ...this.state.data, [selected.name]: value } })
    }

    submit = () => {
        const { data } = this.state;

        this.setState({ loading: true })
    }

    validate = () => {

    }

 
    render() {
        const { close, selectedIndex } = this.props;
        const  { optionOpen, data, guild, selected, organizers, loading } = this.state;
        return (
            <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
                <View style={{ backgroundColor: "#0E0C20", height: getStatusBarHeight()}} />
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => close()}>
                        <Ionicons name={'ios-arrow-back'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={() => this.submit()}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>{selectedIndex === -1? 'ADD' : 'EDIT'} TASK</Text>

                <Text style={styles.title}>Task</Text>
                <TextInput 
                    style={styles.textInput} 
                    placeholder={"Add task"} 
                    placeholderTextColor="#0E0C20" 
                    value={data.task}
                    editable={!loading}
                    onChange={(e) => this.setState({ data: { ...this.state.data, task: e.nativeEvent.text } })}
                    onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, task: e.nativeEvent.text } })}
                />

                <Text style={styles.title}>Details</Text>
                <Segment color={'#E4E4E4'} loading={loading}>
                    <View style={styles.details}>
                        <ScrollView>
                            {/* {guild.map(key => (
                            <View key={key.name} style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>{key.name}</Text>

                                <TouchableOpacity onPress={() => this.selectedDetail(key, data[key.value])} style={style.action}>
                                    {(key.type === "Number") && (<Text style={style.todoDetailValue}>{!!data[key.value]? String(data[key.value]): 'none'}</Text>)}
                                    {(key.type === "DateTime") && (<Text style={style.todoDetailValue}>{!!data[key.value]?  moment.utc(data[key.value]).format("ddd do MMM YYYY"): 'none'}</Text>)}
                                    {(key.type === "Organizer") && (<Text style={style.todoDetailValue}>{!!data[key.value]? String(data.assign.name): 'none'}</Text>)}
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>
                            ))} */}

                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Alert</Text>

                                <TouchableOpacity onPress={() => this.selectedDetail(guild[0])} style={style.action}>
                                    {(<Text style={style.todoDetailValue}>{!!data.alert?  moment(data.alert).format("ddd do MMM YYYY"): 'none'}</Text>)}

                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>


                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Budget</Text>

                                <TouchableOpacity onPress={() => this.selectedDetail(guild[1])} style={style.action}>
                                    {(<Text style={style.todoDetailValue}>{!!data.budget? String(data.budget): 'none'}</Text>)}
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>


                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Assign</Text>

                                <TouchableOpacity onPress={() => this.selectedDetail(guild[2])} style={style.action}>
                                    {(<Text style={style.todoDetailValue}>{!!data.assign? String(data.assign.name): 'none'}</Text>)}
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>


                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Deadline</Text>

                                <TouchableOpacity onPress={() => this.selectedDetail(guild[3])} style={style.action}>
                                    {(<Text style={style.todoDetailValue}>{!!data.deadline?  moment(data.deadline).format("ddd do MMM YYYY"): 'none'}</Text>)}
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>
                            
                        </ScrollView>

                        <View>
                            {/* <Text style={[styles.title, { color: "#0E0C20" }]}>{selected.name}</Text> */}

                            {(selected.type === "Number") && (
                            <View style={styles.detailsRow}>
                                <TextInput 
                                    ref={(x) => this.input = x}
                                    style={styles.detailsInput} 
                                    placeholder={`Enter ${selected.name}`} 
                                    placeholderTextColor="#0E0C20"
                                    value={data[selected.name]}
                                    autoFocus
                                    keyboardType={"phone-pad"}
                                    onChange={(e) => this.setData(e.nativeEvent.text)}
                                    onSubmitEditing={(e) => this.setData(e.nativeEvent.text)}
                                />
                            </View>
                            )}
                        </View>
                    </View>

                </Segment>

                <Option title={selected.name} openModal={optionOpen} closeModal={() => this.closeOption()}>

                    {(selected.type === 'DateTime') && (
                    <View style={styles.details}>
                        <View>  
                            <DatePicker
                                date={new Date(data[selected.name])}
                                onDateChange={(e) => this.setData(e)}
                                minimumDate={new Date()}
                                mode={"datetime"}
                            />
                        </View>
                        <TouchableOpacity style={style.button} onPress={() => this.closeOption()}>
                            <Text style={style.btnText}>SELECT</Text>
                        </TouchableOpacity>
                    </View>)}


                    {(selected.type === "Organizer") && (
                    <View>
                        {organizers.map((organizer, index) => (
                        <TouchableOpacity key={index} style={styles.optionBody} onPress={() => {
                            this.closeOption();
                            this.setData(organizer);
                        }}>
                            <Text style={styles.optionText}>{organizer.name}</Text>
                        </TouchableOpacity>
                        ))}
                    </View>
                    )}
                </Option>
                
            </KeyboardAvoidingView>
        )
    }
}
