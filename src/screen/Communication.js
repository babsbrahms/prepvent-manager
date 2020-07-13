import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView, ActivityIndicator, FlatList, Linking } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { addMessageReducer } from '../action/message';
import Poll from '../component/Poll';
import Option from '../component/Option';
import styles from '../styles';
import { guestFilter } from "../utils/filter";
import SideBar from "../component/SideBar";
import Segment from '../component/Segment';

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
    },
    messageText: {
        color: '#E4E4E4',
        fontSize: 18,
    },
    messageLink: {
        borderBottomColor: '#E4E4E4',
        padding: 4,
        marginHorizontal: 3,
        borderBottomWidth: 4,
    },
    messageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    }
});


class Communication extends Component {
    state = {
        sideBarOpen: false,
        optionOpen: false,
        optionType: "",
        showPoll: false,
        filterParams: '',
        selectedInput: '',
        message: '',
        loading: false,
        refreshing: false,
        data: {
            to: [],
            subject: "",
            message: "",
            host: "",
            contact: '',
            image: null,
            polls: []
        },
        messages: []
    }


    
    fetchMessages = () => {
        this.setState({
            messages: [ {
                uid: '1121',
                subject: 'Your are invited to my birthday party',
                body: 'https://wwww.prepvent.com',
                host: 'olayinka Ibrahim',
                contact: 'o8142319913'
            }, 
            {
                uid: '1121wq',
                subject: 'Dress code for the event',
                body: 'https://wwww.prepvent.com',
                host: 'olayinka Ibrahim',
                contact: 'o8142319913'
            }],
        })
    }

    openSideBar = () => this.setState({ sideBarOpen: true })

    closeSideBar = () => this.setState({ sideBarOpen: false })

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

    selectmessage = (message) => this.setState({ message })

    render() {
        const { navigation } = this.props;
        const { optionOpen, data, showPoll, optionType, filterParams, sideBarOpen, selectedInput, 
            message, loading, messages, refreshing } = this.state;
        
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
                    <Text style={styles.title}>Message</Text>

                    <View style={[styles.row, { marginBottom: 9, width: '100%' }]}>
                        <TouchableOpacity 
                            disabled={loading}
                            style={[style.messageLink, { borderBottomColor: message === 'compose'? '#2DF19C' : '#E4E4E4'}]}
                            onPress={() => this.selectmessage('compose')}
                        >
                            <Text style={style.messageText}>Compose Message</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={loading}
                            style={[style.messageLink, { borderBottomColor: message === 'previous'? '#2DF19C' : '#E4E4E4'}]}
                            onPress={() => {
                                this.selectmessage('previous');
                                this.fetchMessages();
                            }}
                        >
                            <Text style={style.messageText}>Previous Message(s)</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {(message === 'previous') && (
                    <Segment>
                        <FlatList 
                            onRefresh={() => this.fetchMessages()}
                            refreshing={refreshing}
                            data={messages}
                            renderItem={({ item, index }) => 
                            (<View>
                                <View style={styles.between}>
                                    <Text style={style.messageTitle}>{item.subject}</Text>

                                    <TouchableOpacity style={styles.icon} 
                                        onPress={() => {}}
                                    >
                                        <Ionicons name={'ios-send'} size={30} color={"#707070"}/>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => Linking.openURL(item.body)}>
                                    <Text style={{ fontStyle: 'italic'}}>{item.body}</Text>
                                </TouchableOpacity>
                                
                                <Text>{item.host}</Text>
                                <Text>{item.contact}</Text>
                                <View style={styles.hairLine} />
                            </View>) 
                            }
                            keyExtractor={(item,index) => index.toString()}
                        />

                    </Segment>
                )}
                

                {(message === 'compose') && (
                <ScrollView>
                    <View style={style.container}>
                        <Text style={style.title}>Subject</Text>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder={"Add message subject"} 
                            placeholderTextColor="#E4E4E4" 
                            value={data.subject}
                            onChange={(e) => this.setState({ data: { ...this.state.data, subject: e.nativeEvent.text } })}
                            onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, subject: e.nativeEvent.text } })}
                        />
                    </View>


                    <View style={style.container}>
                        <Text style={style.title}>Body</Text>
                        {(!!selectedInput) && (<Text style={styles.inputLabel}>{selectedInput}</Text>)}
                        <View style={styles.textInput}>
                            <TextInput
                                key={"message"}
                                style={[styles.textInput, { marginBottom: 0}]} 
                                placeholder={"Add message body"} 
                                placeholderTextColor="#E4E4E4" 
                                multiline
                                onFocus={() => this.setState({ selectedInput : 'Message'})}
                                onBlur={() => this.setState({ selectedInput : ''})}
                                value={data.message}
                                onChange={(e) => this.setState({ data: { ...this.state.data, message: e.nativeEvent.text } })}
                                onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, message: e.nativeEvent.text } })}
                            />
                            <TextInput 
                                key={"host"}
                                style={[styles.textInput, { marginBottom: 0}]} 
                                placeholder={"Host Name"} 
                                placeholderTextColor="#E4E4E4" 
                                onFocus={() => this.setState({ selectedInput : 'Host Name'})}
                                onBlur={() => this.setState({ selectedInput : ''})}
                                value={data.host}
                                onChange={(e) => this.setState({ data: { ...this.state.data, host: e.nativeEvent.text } })}
                                onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, host: e.nativeEvent.text } })}
                            />
                            <TextInput 
                                key={"contact"}
                                style={[styles.textInput, { marginBottom: 0}]} 
                                placeholder={"Organizer's contact"} 
                                placeholderTextColor="#E4E4E4" 
                                onFocus={() => this.setState({ selectedInput : "Organizer's contact"})}
                                onBlur={() => this.setState({ selectedInput : ''})}
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
                </ScrollView>)}

                <Option title="Message To" openModal={optionOpen} closeModal={() => this.closeOption()}>
                    {(optionType === 'contact') && guestFilter.map((contact) => (
                    <TouchableOpacity key={contact.name} style={[styles.optionBody, { borderBottomColor: filterParams === contact.name? '#2DF19C': '#707070'} ]} onPress={() => this.selectFilter(contact)}>
                        <Text style={styles.optionText}>{contact.name}</Text>
                    </TouchableOpacity>
                    ))}

                    {(optionType === 'invite') && (<View>
                        <ActivityIndicator size="small" color={'#2DF19C'} />
                    </View>)}
                </Option>

                <SideBar sideBarOpen={sideBarOpen} close={() => this.closeSideBar()} >

                </SideBar>
            </View>
        )
    }
}


const mapStateToprops = (state) => ({
    user: state.userReducer
})

const mapDisptachToprops = {
    addMessage: addMessageReducer
}

export default connect(mapStateToprops, mapDisptachToprops)(Communication);