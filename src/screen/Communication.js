import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddContact from '../component/AddContact';
import Poll from '../component/Poll';
import SideBar from '../component/SideBar';
import Option from '../component/Option';
import styles from '../styles';

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

const contactFilter = [
    { name: 'Any', options: true },
    { name: 'Invited', options: false },
    { name: 'Accepted', options: false },
    { name: 'Invited By', options: true },
    { name: 'Checked In', options: false },
    { name: 'Not Accepted', options: false },
    { name: 'VIP', options: false },
]

export default class Communication extends Component {
    state = {
        sideBarOpen: false,
        optionOpen: false,
        showPoll: false,
        pollIndex: -1,
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

    openSideBar = () => this.setState({ sideBarOpen: true })

    closeSideBar = () => this.setState({ sideBarOpen: false })

    openOption = () => this.setState({ optionOpen: true })

    closeOption = () => this.setState({ optionOpen: false })

    selectFilter = contact => {
        this.closeOption()
        if (contact.options) {
            this.openSideBar()
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

    cancelPoll = () => this.setState({ showPoll: false, pollIndex: -1 })

    savePoll = (poll) => {
        const { data, pollIndex } = this.state;
        const polls = data.polls;
        if (pollIndex === -1) {
            polls.push(poll);
        } else {
            polls[pollIndex] = poll;
        }
        
        this.setState({ showPoll: false, pollIndex: -1, data: {...this.state.data, polls: [ ...polls ]} })
    }

    deletePoll = (index) => {
        const { data } = this.state;

        data.polls.splice(index, 1);

        this.setState({ showPoll: false, pollIndex: -1, data: data })
    }

    editPoll = (index) => this.setState({ showPoll: true, pollIndex: index })

    render() {
        const { navigation } = this.props;
        const { sideBarOpen, optionOpen, data, showPoll, pollIndex } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("Notification")}>
                        <Ionicons name={'ios-notifications-outline'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("Notification")}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>COMMUNICATION</Text>

                <ScrollView>
                    <View style={style.container}>
                        <View style={styles.between}>
                            <Text style={style.title}>To</Text>

                            <TouchableOpacity style={styles.icon} onPress={() => this.openOption()}>
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
                                style={[styles.textInput, { marginBottom: 0}]} 
                                placeholder={"Add message body"} 
                                placeholderTextColor="#0E0C20" 
                                multiline
                                value={data.message}
                                onChange={(e) => this.setState({ data: { ...this.state.data, message: e.nativeEvent.text } })}
                                onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, message: e.nativeEvent.text } })}
                            />
                            <TextInput 
                                style={[styles.textInput, { marginBottom: 0}]} 
                                placeholder={"Host Name"} 
                                placeholderTextColor="#0E0C20" 
                                value={data.host}
                                onChange={(e) => this.setState({ data: { ...this.state.data, host: e.nativeEvent.text } })}
                                onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, host: e.nativeEvent.text } })}
                            />
                            <TextInput 
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

                            <TouchableOpacity style={styles.icon} disabled={showPoll} onPress={() => this.setState({ showPoll: true, pollIndex: -1 })}>
                                <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                            </TouchableOpacity>
                        </View>

                        {data.polls.map((poll, index) => {
                            <View key={index.toString()} style={[styles.row, { alignItems: "center"}]}>
                                <TouchableOpacity style={styles.icon} onPress={() => this.deletePoll(index)}>
                                    <Ionicons name={'ios-remove-circle-outline'} size={30} color={"#EC3636"}/>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => this.editPoll(index)}>
                                    <Text style={style.to}>POLL TITLE</Text>
                                </TouchableOpacity>  
                            </View>
                        })}

                        {(!!showPoll) &&(<Poll selectedIndex={pollIndex} selectedData={data.polls[pollIndex]} save={(poll) => this.savePoll(poll)} cancel={() => this.cancelPoll()} />)}
                    </View>


                    <View style={[styles.row, { justifyContent: "center", marginBottom: 9 }]}>
                        <TouchableOpacity style={styles.icon}>
                            <Text style={style.link}>Preview message</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <SideBar sideBarOpen={sideBarOpen} close={() => this.closeSideBar()} >
                    <AddContact selection="multiple" addContact={() => {}} />
                </SideBar>
                <Option title="Message To" openModal={optionOpen} closeModal={() => this.closeOption()}>
                    {contactFilter.map((contact) => (
                    <TouchableOpacity key={contact.name} style={styles.optionBody} onPress={() => this.selectFilter(contact)}>
                        <Text style={styles.optionText}>{contact.name}</Text>
                    </TouchableOpacity>
                    ))}

                </Option>
            </View>
        )
    }
}
