import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    }
});

export default class Poll extends Component {
    state = {
        title: "",
        question: "",
        options: [],
        inputValue: '',
        mode: "create"
    }

    
    componentDidMount() {
        const { selectedIndex, selectedData } = this.props;

        if (selectedIndex !== -1) {
            this.setState({ data: selectedData })
        }
    }

    addOption = () => {
        const { options, inputValue} = this.state;

        if (inputValue) {
            options.push(inputValue)
            this.setState({ options: [ ...options], inputValue: "" })
        }
    }

    deleteOption = (index) => {
        const { options, inputValue} = this.state;

        options.splice(index, 1);

        this.setState({ options: [...options] })

    }

    render() {
        const { save, cancel } = this.props;
        const { options, inputValue, title, question } = this.state;

        return (
        <View style={{ borderRadius: 20, marginTop: 0, marginBottom: 9, width: '100%', minHeight: 100, backgroundColor: '#E4E4E4', padding: 5, flex: 1 }}>
            <Text style={style.title}>Title</Text>
            <TextInput 
                style={styles.textInput} 
                placeholder={"Add poll title. i.e. Food"} 
                placeholderTextColor="#0E0C20"
                value={title}
                onChange={(e) => this.setState({ title: e.nativeEvent.text })}
                onSubmitEditing={(e) => this.setState({ title: e.nativeEvent.text })}
            />
            
            
            <Text style={style.title}>Question</Text>
            <TextInput 
                style={styles.textInput} 
                placeholder={"Add poll question"} 
                placeholderTextColor="#0E0C20" 
                value={question}
                onChange={(e) => this.setState({ question: e.nativeEvent.text })}
                onSubmitEditing={(e) => this.setState({ question: e.nativeEvent.text })}

            />
    
            <Text style={style.title}>Options</Text>
            <ScrollView>
                {options.map((option, index) => (
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
                <TouchableOpacity style={styles.icon} onPress={() => save({ title, question, options })}>
                    <Text style={[style.todoAction, { color: '#2DF19C' }]}>SAVE</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.icon} onPress={() => cancel()}>
                    <Text style={[style.todoAction, { color: '#EC3636' }]}>CANCEL</Text>
                </TouchableOpacity>
            </View>
        </View>

        )
    }
}
