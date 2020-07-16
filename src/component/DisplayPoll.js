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
        backgroundColor: '#2DF19C',
    },
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
        total: 0,
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
            let total = Object.values(polls[index].options).reduce((a,c) => a + c, 0);

            this.setState({ currentIndex: index, current: polls[index], total })
        }  
    }

    render() {
        const { polls, current, total } = this.state;
        
        return (
        <View style={{ borderRadius: 20, marginTop: 0, marginBottom: 9, width: '100%', minHeight: 100, backgroundColor: '#E4E4E4', padding: 5, flex: 1 }}>

            <ScrollView style={style.polls}>
                {polls.map((poll, index) => (
                    <View key={index.toString()} style={[styles.row, { alignItems: "center", padding: 3 }]}>
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
                            <View style={styles.between}>
                                <Text style={style.to}>{option}</Text>
                                <Text style={style.to}>{current.options[option]}</Text>
                            </View>

                            <View style={style.bar}>
                                <View style={[style.slide, { width: `${(current.options[option]/total)*100}%` }]}/>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>

        )
    }
}
