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
            options: {},
        },
        currentIndex: -1,
        inputValue: '',
        errors: {},
        open: false
    }

    addOption = () => {
        const { current, inputValue} = this.state;

        if (inputValue) {
            this.setState({ current: { ...this.state.current, options: { ...current.options, [inputValue]: 0 }}, inputValue: "", open: false })
        }
    }

    cancelPoll = () => this.setState({ currentIndex: -1, current: { title: "", question: "", options: {}}, errors: {}, open: false })

    validate = (poll, polls, pollsIndex) => {
        let errors = {};

        if (!poll.title) {
            errors.title = "Title is required"
        }else {

            polls.forEach((p, i) => {
                if ((poll.title === p.title) && (pollsIndex !== i)) {
                    errors.title = `A poll has the title "${poll.title}". Use a unique title`
                }
            })
        };

        if (!poll.question) errors.question = "Question is required";

        if (Object.keys(poll.options).length < 2) errors.options = "Minimum of two options are required"; 
  
        return errors;
    }

    savePoll = () => {
        const { polls, currentIndex, current } = this.state;
        const { updatePoll } = this.props;

        let errors = this.validate(current, polls, currentIndex);
        
        if (Object.keys(errors).length === 0) {

            if (currentIndex === -1) {
                polls.push(current);
            } else {
                polls[currentIndex] = current;
            }
            
            this.setState({ currentIndex: -1, polls: polls, current: { title: "", question: "", options: {}}, errors: {}, open: false }, () => {
                updatePoll(this.state.polls)
            })
        } else {
            this.setState({ errors })
        }
     
    }

    deletePoll = (index) => {
        const { polls } = this.state;
        const { updatePoll } = this.props;

        polls.splice(index, 1);

        this.setState({ currentIndex: -1, polls: polls }, () => {
            updatePoll(this.state.polls)
        })
    }

    editPoll = (index) => {
        const { polls } = this.state;

        this.setState({ currentIndex: index, current: polls[index], open: false })
    }


    editOption = (option) => {
        let { current } = this.state;

        delete current['options'][option];

        this.setState({ current: { ...this.state.current }, open: true, inputValue: option })
    }


    deleteOption = (option) => {
        let { current } = this.state;

        delete current['options'][option];

        this.setState({ current: { ...this.state.current } })
    }

    render() {
        const { inputValue, polls, current, errors, open } = this.state;

        return (
        <View style={{ borderRadius: 20, marginTop: 0, marginBottom: 9, width: '100%', minHeight: 100, backgroundColor: '#E4E4E4', padding: 5, flex: 1 }}>

            <ScrollView style={style.polls}>
                {polls.map((poll, index) => (
                    <View key={index.toString()} style={[styles.row, { alignItems: "center", padding: 3}]}>
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
                    placeholder={"Add short and descriptive poll title. i.e. Drink"} 
                    placeholderTextColor="#E4E4E4"
                    value={current.title}
                    maxLength={15}
                    onChange={(e) => this.setState({ current: {...this.state.current, title: e.nativeEvent.text } })}
                    onSubmitEditing={(e) => this.setState({ current: {...this.state.current, title: e.nativeEvent.text } })}
                />
                {(!!errors.title) && (<Text style={styles.error}>{errors.title}</Text>)}
                
                
                <Text style={style.title}>Question</Text>
                <TextInput 
                    style={styles.textInput} 
                    placeholder={"Add poll question"} 
                    placeholderTextColor="#E4E4E4" 
                    value={current.question}
                    onChange={(e) => this.setState({ current: {...this.state.current, question: e.nativeEvent.text } })}
                    onSubmitEditing={(e) => this.setState({ current: {...this.state.current, question: e.nativeEvent.text } })}

                />
                {(!!errors.question) && (<Text style={styles.error}>{errors.question}</Text>)}
        
                <View style={styles.between}>
                    <Text style={style.title}>Options</Text>

                    <TouchableOpacity style={styles.icon} onPress={() => this.setState({ open: true })}>
                        <Ionicons name={'ios-add'} size={30} color={"#707070"}/>
                    </TouchableOpacity>
                </View>
                
                <ScrollView>
                    {Object.keys(current.options).map((option, index) => (
                        <View key={index.toString()} style={[styles.row, { alignItems: "center"}]}>
                            <TouchableOpacity style={styles.icon} onPress={() => this.deleteOption(option)}>
                                <Ionicons name={'ios-remove-circle-outline'} size={30} color={"#EC3636"}/>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={() => this.editOption(option)}>
                                <Text style={style.to}>{option}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                    
                {(open) && (
                <View style={[styles.detailsRow, { alignItems: "center"}]}>
                    <TextInput 
                        style={styles.detailsInput} 
                        placeholder={"Add poll option"} 
                        placeholderTextColor="#E4E4E4"
                        value={inputValue}
                        autoFocus
                        keyboardType={"default"}
                        onChange={(e) => this.setState({ inputValue: e.nativeEvent.text })}
                        onSubmitEditing={() => this.addOption()}

                    />
                    <TouchableOpacity style={styles.icon} onPress={() => this.addOption()}>
                        <Ionicons name={'ios-send'} size={30} color={'#707070'}/>
                    </TouchableOpacity>
                </View>)}
                {(!!errors.options) && (<Text style={styles.error}>{errors.options}</Text>)}
        
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
