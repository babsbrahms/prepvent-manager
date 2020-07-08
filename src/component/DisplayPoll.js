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
        padding: 3, 
        margin: 3 
    }
});

export default class DisplayPoll extends Component {
    state = {
        polls: this.props.polls,
        current: {
            title: "",
            question: "",
            options: {

            },
        },
        currentIndex: -1,
        inputValue: '',
        errors: {}
    }

    addOption = () => {
        const { current, inputValue} = this.state;

        if (inputValue) {
            this.setState({ current: { ...this.state.current, options: [ ...current.options, inputValue]}, inputValue: "" })
        }
    }

    cancelPoll = () => this.setState({ currentIndex: -1, current: { title: "", question: "", options: {}}, errors: {} })

    selectPoll = (index) => {
        const { polls, currentIndex } = this.state;
        
        if (currentIndex === index) {
            this.cancelPoll()
        } else {
            this.setState({ currentIndex: index, current: polls[index] })
        }  
    }

    render() {
        const { polls, current } = this.state;
        
        return (
        <View style={{ borderRadius: 20, marginTop: 0, marginBottom: 9, width: '100%', minHeight: 100, backgroundColor: '#E4E4E4', padding: 5, flex: 1 }}>

            <ScrollView style={style.polls}>
                {polls.map((poll, index) => (
                    <View key={index.toString()} style={[styles.row, { alignItems: "center", padding: 3, width: '100%'}]}>
                        <TouchableOpacity onPress={() => this.selectPoll(index)}>
                            <Text style={styles.title}>{poll.title}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={{ flex: 1}}>
                <Text style={style.title}>Title</Text>
                <Text>{current.title}</Text>
                
                
                <Text style={style.title}>Question</Text>
                <Text>{current.question}</Text>
        
                <Text style={style.title}>Results</Text>
                <ScrollView>
                    {Object.keys(current.options).map((option, index) => (
                        <View key={index.toString()} >
                            <Text style={style.to}>{option} = {current.options[option]}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>

        )
    }
}
