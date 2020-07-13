import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import moment from 'moment';
import DatePicker from 'react-native-date-picker'
import Segment from '../component/Segment';
import Option from './Option';
import styles from '../styles';
import Message from "./Message"

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
            schema: { 
                alert: {
                    name: "Alert",
                    type: "DateTime",
                    required: false,
                    value: "alert",
                },
                assign: {    
                    name: "Assign",
                    type: "Organizer",
                    required: false,
                    value: "assign",
                },
                budget: {
                    name: "Budget",
                    type: "Number",
                    required: false,
                    value: "budget",
                },          
                deadline: {
                    name: "Deadline",
                    type: "DateTime",
                    required: true,
                    value:  "deadline",
                },
            },
            data: {
                task: "",
                alert : "",
                budget: 0,
                assign : {
                    name: props.user.name,
                    uid: props.user.uid
                },
                deadline: ""
            },
            selected: {},
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

        this.setState({ data: { ...this.state.data, [selected.value]: value } })
    }

    submit = () => {
        const { data } = this.state;

        this.setState({ loading: true })
    }

    validate = () => {

    }

 
    render() {
        const { close, selectedIndex, organizers } = this.props;
        const  { optionOpen, data, schema, selected, loading } = this.state;
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

                <Text style={styles.Header}>{selectedIndex === -1? 'ADD' : 'EDIT'} TASK</Text>

                <Text style={styles.title}>Task</Text>
                <TextInput 
                    style={styles.textInput} 
                    placeholder={"Add task"} 
                    placeholderTextColor="#E4E4E4" 
                    value={data.task}
                    editable={!loading}
                    onChange={(e) => this.setState({ data: { ...this.state.data, task: e.nativeEvent.text } })}
                    onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, task: e.nativeEvent.text } })}
                />

                <Text style={styles.title}>Details</Text>
                <Segment color={'#E4E4E4'} loading={loading}>
                    <View style={styles.details}>
                        <ScrollView>
                            {/* {Object.values(guid).map(key => (
                            <View key={key.name} style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>{key.name}</Text>

                                <TouchableOpacity onPress={() => this.selectedDetail(key, data[key.value])} style={style.action}>
                                    {(key.type === "Number") && (<Text style={style.todoDetailValue}>{!!data[key.value]? String(data[key.value]): 'none'}</Text>)}
                                    {(key.type === "DateTime") && (<Text style={style.todoDetailValue}>{!!data[key.value]?  moment.utc(data[key.value]).format("ddd Do MMM YYYY"): 'none'}</Text>)}
                                    {(key.type === "Organizer") && (<Text style={style.todoDetailValue}>{!!data[key.value]? String(data.assign.name): 'none'}</Text>)}
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>
                            ))} */}

                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Alert</Text>

                                <TouchableOpacity onPress={() => this.selectedDetail(schema.alert)} style={style.action}>
                                    {(<Text style={style.todoDetailValue}>{!!data.alert?  moment(data.alert).format("ddd Do MMM YYYY hh:mm a"): 'none'}</Text>)}

                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>


                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Assign</Text>

                                <TouchableOpacity onPress={() => this.selectedDetail(schema.assign)} style={style.action}>
                                    {(<Text style={style.todoDetailValue}>{!!data.assign? String(data.assign.name): 'none'}</Text>)}
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>

                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Budget</Text>

                                <TouchableOpacity onPress={() => this.selectedDetail(schema.budget)} style={style.action}>
                                    {(<Text style={style.todoDetailValue}>{!!data.budget? String(data.budget): 'none'}</Text>)}
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>


                            <View style={style.todoDetailIndex}>
                                <Text style={style.todoDetailKey}>Deadline</Text>

                                <TouchableOpacity onPress={() => this.selectedDetail(schema.deadline)} style={style.action}>
                                    {(<Text style={style.todoDetailValue}>{!!data.deadline?  moment(data.deadline).format("ddd Do MMM YYYY hh:mm a"): 'none'}</Text>)}
                                    <Ionicons name={'ios-arrow-forward'} color={'#707070'} size={30}/>
                                </TouchableOpacity>
                            </View>
                            
                        </ScrollView>

                        <View>

                            {(selected.type === "Number") && (
                            <View>
                                <Text style={styles.inputLabel}>{selected.name}</Text>
                                <View style={styles.detailsRow}>
                                    <TextInput 
                                        ref={(x) => this.input = x}
                                        style={styles.detailsInput}
                                        placeholder={`Enter ${selected.name}`} 
                                        placeholderTextColor="#E4E4E4"
                                        value={String(data[selected.value])}
                                        autoFocus
                                        onBlur={() => this.setState({ selected: {} })}
                                        keyboardType={"number-pad"}
                                        onChange={(e) => this.setData(parseFloat(e.nativeEvent.text || 0))}
                                        onSubmitEditing={(e) => this.setData(parseFloat(e.nativeEvent.text || 0))}
                                    />
                                </View>
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
                                date={new Date(data[selected.value])}
                                onDateChange={(e) => this.setData(e)}
                                minimumDate={new Date()}
                                mode={"datetime"}
                            />
                        </View>
                        <TouchableOpacity style={styles.optionBody} onPress={() => {
                            this.setData('');
                            this.closeOption();
                        }}>
                            <Text style={[styles.optionText, { color: '#EC3636'}]}>CLEAR VALUE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionBody} onPress={() => {
                            this.closeOption();
                        }}>
                            <Text style={[styles.optionText, { color: '#2DF19C'}]}>SAVE</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={style.button} onPress={() => this.closeOption()}>
                            <Text style={style.btnText}>SELECT</Text>
                        </TouchableOpacity> */}
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
                
            </View>
            <Message />
        </View>
        )
    }
}
