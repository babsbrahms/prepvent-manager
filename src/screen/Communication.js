import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { addMessageReducer } from '../action/message';
import Poll from '../component/Poll';
import Option from '../component/Option';
import styles from '../styles';
import { contactFilter } from "../utils/filter";

const style = StyleSheet.create({
    title: {
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 25
    },
    to: {
        color: '#FFFFFF',
        fontSize: 24,
        marginBottom: 9  
    },
    link: {
        color: '#707070',
        fontSize: 24
    },
    container: {
        marginBottom: 9
    }
});


class Communication extends Component {
    state = {
        optionOpen: false,
        optionType: "",
        showPoll: false,
        data: {
            to: [],
            subject: "",
            message: "",
            host: "",
            contact: '',
            image: null,
            polls: []
        }
    }

    openOption = (option) => this.setState({ optionOpen: true, optionType: option })

    closeOption = () => this.setState({ optionOpen: false, optionType: "" })

    selectFilter = contact => {
        this.closeOption()
        if (contact.options) {
            this.openOption('invite')
        } else {

        }
    }

    addImage = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        };
          
          /**
           * The first arg is the options object for customization (it can also be null or omitted for default options),
           * The second arg is the callback which sends object: response (more info in the API Reference)
           */
        ImagePicker.showImagePicker(options, (response) => {
           // console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                data: {
                    ...this.state.data,
                    image: source
                }
              });
            }
        });
    }

    render() {
        const { navigation } = this.props;
        const { optionOpen, data, showPoll, optionType } = this.state;
        
        console.log(data.polls);
        return (
            <View style={styles.container}>
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("Notification")}>
                        <Ionicons name={'ios-notifications-outline'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={() => {}}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>COMMUNICATION</Text>

                <ScrollView>
                    <View style={style.container}>
                        <View style={styles.between}>
                            <Text style={style.title}>To</Text>

                            <TouchableOpacity style={styles.icon} onPress={() => this.openOption("contact")}>
                                <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                            </TouchableOpacity>
                            
                        </View>
                        <Text style={style.to}> 24 contacts</Text>
                    </View>



                    <View style={style.container}>
                        <Text style={style.title}>Subject</Text>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder={"Add message subject"} 
                            placeholderTextColor="#0E0C20" 
                            value={data.subject}
                            onChange={(e) => this.setState({ data: { ...this.state.data, subject: e.nativeEvent.text } })}
                            onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, subject: e.nativeEvent.text } })}
                        />
                    </View>


                    <View style={style.container}>
                        <Text style={style.title}>Body</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                key={"message"}
                                style={[styles.textInput, { marginBottom: 0}]} 
                                placeholder={"Add message body"} 
                                placeholderTextColor="#0E0C20" 
                                multiline
                                value={data.message}
                                onChange={(e) => this.setState({ data: { ...this.state.data, message: e.nativeEvent.text } })}
                                onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, message: e.nativeEvent.text } })}
                            />
                            <TextInput 
                                key={"host"}
                                style={[styles.textInput, { marginBottom: 0}]} 
                                placeholder={"Host Name"} 
                                placeholderTextColor="#0E0C20" 
                                value={data.host}
                                onChange={(e) => this.setState({ data: { ...this.state.data, host: e.nativeEvent.text } })}
                                onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, host: e.nativeEvent.text } })}
                            />
                            <TextInput 
                                key={"contact"}
                                style={[styles.textInput, { marginBottom: 0}]} 
                                placeholder={"Organizer's contact"} 
                                placeholderTextColor="#0E0C20" 
                                value={data.contact}
                                onChange={(e) => this.setState({ data: { ...this.state.data, contact: e.nativeEvent.text } })}
                                onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, contact: e.nativeEvent.text } })}
                            />
                        </View>
                    </View>

                    <View style={style.container}>
                        <View style={styles.between}>
                            <Text style={style.title}>Image</Text>

                            <TouchableOpacity onPress={() => this.addImage()} style={styles.icon}>
                                <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                            </TouchableOpacity>
                        </View>

                        {(data.image !== null) && (<Image style={styles.image} source={data.image} />)}
                    </View>


                    
                    <View style={style.container}>
                        <View style={styles.between}>
                            <Text style={style.title}>Poll</Text>

                            <TouchableOpacity style={styles.icon} disabled={showPoll} onPress={() => this.setState({ showPoll: true })}>
                                <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                            </TouchableOpacity>
                        </View>


                        
                        {(!!showPoll) && (<Poll 
                            polls={data.polls} 
                            updatePoll={(polls) => this.setState({ ...this.state.data, polls })} 
                        />)}
                    </View>


                    <View style={[styles.row, { justifyContent: "center", marginBottom: 9 }]}>
                        <TouchableOpacity style={styles.icon}>
                            <Text style={style.link}>Preview message</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Option title="Message To" openModal={optionOpen} closeModal={() => this.closeOption()}>
                    {(optionType === 'contact') && contactFilter.map((contact) => (
                    <TouchableOpacity key={contact.name} style={styles.optionBody} onPress={() => this.selectFilter(contact)}>
                        <Text style={styles.optionText}>{contact.name}</Text>
                    </TouchableOpacity>
                    ))}

                    {(optionType === 'invite') && (<View>
                        <ActivityIndicator size="small" color={'#2DF19C'} />
                    </View>)}
                    

                </Option>
            </View>
        )
    }
}


const mapStateToprops = (state) => ({
    
})

const mapDisptachToprops = {
    addMessage: addMessageReducer
}

export default connect(mapStateToprops, mapDisptachToprops)(Communication);