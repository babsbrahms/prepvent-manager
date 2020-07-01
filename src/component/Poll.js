import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

const style = StyleSheet.create({
    title: {
        color: '#000000',
        fontWeight: "bold",
        fontSize: 25
    },
    to: {
        color: '#0E0C20',
        fontSize: 17, 
    },
    todoAction: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    polls: { 
        borderRadius: 20, 
        backgroundColor: '#0E0C20', 
        padding: 0, 
        margin: 3 
    }
});

export default class Poll extends Component {
    state = {
        polls: this.props.polls,
        current: {
            title: "",
            question: "",
            options: [],
        },
        currentIndex: -1,
        inputValue: 1
    }

    addOption = () => {
        const { current, inputValue} = this.state;

        if (inputValue) {
            this.setState({ current: { ...this.state.current, options: [ ...current.options, inputValue]}, inputValue: "" })
        }
    }

    cancelPoll = () => this.setState({ showPoll: false, currentIndex: -1, current: { title: "", question: "", options: []} })

    savePoll = () => {
        const { polls, currentIndex, current } = this.state;
        const { updatePoll } = this.props;

        if (currentIndex === -1) {
            polls.push(current);
        } else {
            polls[currentIndex] = current;
        }
        
        this.setState({ showPoll: false, currentIndex: -1, polls: polls, current: { title: "", question: "", options: []} }, () => {
            updatePoll(this.state.polls)
        })
    }

    deletePoll = (index) => {
        const { polls } = this.state;
        const { updatePoll } = this.props;

        polls.splice(index, 1);

        this.setState({ showPoll: false, currentIndex: -1, polls: polls }, () => {
            updatePoll(this.state.polls)
        })
    }

    editPoll = (index) => {
        const { polls } = this.state;

        this.setState({ showPoll: true, currentIndex: index, current: polls[index] })
    }

    deleteOption = (index) => {
        const { current } = this.state;

        current.options.splice(index, 1);

        this.setState({ current: { ...this.state.current, options: [...options] } })
    }

    render() {
        const {  } = this.props;
        const { options, inputValue, title, question, polls, current } = this.state;

        return (
        <View style={{ borderRadius: 20, marginTop: 0, marginBottom: 9, width: '100%', minHeight: 100, backgroundColor: '#E4E4E4', padding: 5, flex: 1 }}>

            <ScrollView style={style.polls}>
                {polls.map((poll, index) => (
                    <View key={index.toString()} style={[styles.row, { alignItems: "center"}]}>
                        <TouchableOpacity style={styles.icon} onPress={() => this.deletePoll(index)}>
                            <Ionicons name={'ios-remove-circle-outline'} size={30} color={"#EC3636"}/>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => this.editPoll(index)}>
                            <Text style={styles.title}>{poll.title}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={{ flex: 1}}>
                <Text style={style.title}>Title</Text>
                <TextInput 
                    style={styles.textInput} 
                    placeholder={"Add poll title. i.e. Food"} 
                    placeholderTextColor="#0E0C20"
                    value={current.title}
                    onChange={(e) => this.setState({ current: {...this.state.current, title: e.nativeEvent.text } })}
                    onSubmitEditing={(e) => this.setState({ current: {...this.state.current, title: e.nativeEvent.text } })}
                />
                
                
                <Text style={style.title}>Question</Text>
                <TextInput 
                    style={styles.textInput} 
                    placeholder={"Add poll question"} 
                    placeholderTextColor="#0E0C20" 
                    value={current.question}
                    onChange={(e) => this.setState({ current: {...this.state.current, question: e.nativeEvent.text } })}
                    onSubmitEditing={(e) => this.setState({ current: {...this.state.current, question: e.nativeEvent.text } })}

                />
        
                <Text style={style.title}>Options</Text>
                <ScrollView>
                    {current.options.map((option, index) => (
                        <View key={index.toString()} style={[styles.row, { alignItems: "center"}]}>
                            <TouchableOpacity style={styles.icon} onPress={() => this.deleteOption(index)}>
                                <Ionicons name={'ios-remove-circle-outline'} size={30} color={"#EC3636"}/>
                            </TouchableOpacity>
                            
                            <Text style={style.to}>{option}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={[styles.detailsRow, { alignItems: "center"}]}>
                    <TextInput 
                        style={styles.detailsInput} 
                        placeholder={"Add poll option"} 
                        placeholderTextColor="#0E0C20"
                        value={inputValue}
                        keyboardType={"default"}
                        onChange={(e) => this.setState({ inputValue: e.nativeEvent.text })}
                        onSubmitEditing={() => this.addOption()}

                    />
                    <TouchableOpacity style={styles.icon} onPress={() => this.addOption()}>
                        <Ionicons name={'ios-send'} size={30} color={'#707070'}/>
                    </TouchableOpacity>
                </View>
        
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => this.savePoll()}>
                        <Text style={[style.todoAction, { color: '#2DF19C' }]}>SAVE</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.icon} onPress={() => this.cancelPoll()}>
                        <Text style={[style.todoAction, { color: '#EC3636' }]}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        )
    }
}
