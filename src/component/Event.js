import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Switch, ScrollView, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment"
import Poll from './Poll';
import Segment from './Segment';
import { Rules } from '../component/Rules'
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
    deadline: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'center',
        padding: 8
    },
    container: {
        marginBottom: 9
    }
});


export default class Event extends Component {
    state = {
        showDate: false,
        showPoll: false,
        pollIndex: -1,
        showDeadline: false,
        data: {
            poster: null,
            date: new Date(),
            location: "",
            state: "",
            country: "",
            budget: "",
            invitation: "",
            host: "",
            polls: [],
            contact: "",
            checkin: false,
            checkinRule: 'accepted',
            tableChartRule: 'accepted'
        }
    }

    changeCheckIn = () => this.setState({ data: { ...this.state.data, checkin: !this.state.data.checkin }})

    addPoster = () => {
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
            
                
              const source = { uri: (Platform.OS === 'android')? `file://${response.path}` : response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                data: {
                    ...this.state.data,
                    poster: source
                }
              });
            }
          });
    }

    changeDate = (e, selectedDate) => {
        console.log(e);
        if (e.nativeEvent.type === 'set') {
            this.setState({ showDate: false, data: { ...this.state.data, date: selectedDate }  })
        } else {
            this.setState({ showDate: false })
        }  
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
        console.log(polls);
        
        
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
        const  { data, showDate, showPoll, showDeadline, pollIndex } = this.state

        return (
            <ScrollView>
                <View style={style.container}>
                    <View style={styles.between}>
                        <Text style={style.title}>Poster</Text>

                        <TouchableOpacity style={styles.icon} onPress={() => this.addPoster()}>
                            <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                        </TouchableOpacity>
                        
                    </View>

                    {(!!data.poster) && (<Image style={styles.image} resizeMode={'cover'} source={data.poster} />)}
                </View>


                <View style={style.container}>
                    <View style={styles.between}>
                        <Text style={style.title}>Date</Text>

                        <TouchableOpacity style={styles.icon} onPress={() => this.setState({ showDate: true })}>
                            <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                        </TouchableOpacity>
                        
                    </View>
                    <Text style={style.to}>{moment(data.date).format("ddd do MMMM YYYY")}</Text>
                </View>


                <View style={style.container}>
                    <Text style={style.title}>Location</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder={"Add event location"} 
                        placeholderTextColor="#0E0C20" 
                        value={data.location}
                        onChange={(e) => this.setState({ data: { ...this.state.data, location: e.nativeEvent.text } })}
                        onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, location: e.nativeEvent.text } })}
                        
                    />


                    <View style={[styles.segment, { backgroundColor: '#E4E4E4'}]}>
                        <Text style={[style.title, { color: '#000000'}]}>State</Text>
                        {/* <Text style={[style.to, { color: '#707070'}]}>Kwara</Text> */}
                        <TextInput 
                            style={styles.textInput} 
                            placeholder={"Add event location state"} 
                            placeholderTextColor="#0E0C20" 
                            value={data.state}
                            onChange={(e) => this.setState({ data: { ...this.state.data, state: e.nativeEvent.text } })}
                            onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, state: e.nativeEvent.text } })}
                        />

                        <Text style={[style.title, { color: '#000000', marginTop: 9 }]}>Country</Text>
                        {/* <Text style={[style.to, { color: '#707070'}]}>Nigeria</Text> */}
                        <TextInput 
                            style={styles.textInput} 
                            placeholder={"Add event location country"} 
                            placeholderTextColor="#0E0C20" 
                            value={data.country}
                            onChange={(e) => this.setState({ data: { ...this.state.data, country: e.nativeEvent.text } })}
                            onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, country: e.nativeEvent.text } })}
                        />
                    </View>
                </View>

                <View style={style.container}>
                    <Text style={style.title}>Budget</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder={"Enter your budget for this event"} 
                        placeholderTextColor="#0E0C20" 
                        keyboardType={"phone-pad"}
                        value={data.budget}
                        onChange={(e) => this.setState({ data: { ...this.state.data, budget: e.nativeEvent.text } })}
                        onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, budget: e.nativeEvent.text } })}
                    />
                </View>


                <View style={style.container}>
                    <View style={styles.between}>
                        <Text style={style.title}>Check In</Text>
                        <Switch value={data.checkin}  onValueChange={() => this.changeCheckIn()} trackColor={{ true: '#2DF19C', false: '#EC3636'}} thumbColor={'#FFFFFF'} />
                    </View>
                </View>


                <View style={style.container}>
                    <View style={styles.between}>
                        <Text style={style.title}>Theme</Text>

                        <TouchableOpacity style={styles.icon}>
                            <Ionicons name={'ios-arrow-forward'} size={30} color={"#FFFFFF"}/>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={styles.segment}>

                    </View>
                </View>


                <View style={style.container}>
                    <Text style={style.title}>Invitation letter</Text>
                    <View style={styles.textInput}>
                        <TextInput 
                            style={[styles.textInput, { marginBottom: 0}]} 
                            placeholder={"Add inviation letter"} 
                            placeholderTextColor="#0E0C20" 
                            multiline
                            value={data.invitation}
                            onChange={(e) => this.setState({ data: { ...this.state.data, invitation: e.nativeEvent.text } })}
                            onSubmitEditing={(e) => this.setState({ data: { ...this.state.data, invitation: e.nativeEvent.text } })}
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
                        <Text style={style.title}>Poll</Text>

                        <TouchableOpacity style={styles.icon} disabled={showPoll} onPress={() => this.setState({ showPoll: true, pollIndex: -1 })}>
                            <Ionicons name={'ios-add'} size={30} color={"#FFFFFF"}/>
                        </TouchableOpacity>
                        
                    </View>

                    <View style={{ flex: 1}}>
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
                    </View>

                    {(!!showPoll) &&(<Poll selectedIndex={pollIndex} selectedData={data.polls[pollIndex]} save={(poll) => this.savePoll(poll)} cancel={() => this.cancelPoll()} />)}
                </View>


                <View style={[styles.row, { justifyContent: "center", marginBottom: 9 }]}>
                    <TouchableOpacity style={styles.icon}>
                        <Text style={style.link}>Preview invitation page</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.between}>
                    <Text style={style.title}>Advance Option</Text>

                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name={'ios-arrow-forward'} size={30} color={"#FFFFFF"}/>
                    </TouchableOpacity>
                    
                </View>

                <View style={style.container}>
                    <Segment color='#E4E4E4'>
                        <Text style={[style.title, { color: '#000000'}]}>Acceptance Deadline</Text>
                        
                            
                            <TouchableOpacity style={style.deadline}>
                                <Text style={[style.to, { color: '#707070'}]}>none</Text>
                                <Ionicons name={'ios-arrow-forward'} size={30} color={'#707070'}/>
                            </TouchableOpacity>
            
                        <View>
                            <Rules key="check" title={'Check In Rules'} value={data.checkinRule} selectRule={(value) => this.setState({ data: { ...this.state.data, checkinRule: value}})}/>
                        </View>
                    </Segment>
                    <View style={[styles.segment, { backgroundColor: '#E4E4E4'}]}>
                        <Rules key='table' title={'Table Chart Rules'} value={data.tableChartRule} selectRule={(value) => this.setState({ data: { ...this.state.data, tableChartRule: value}})}/>
                    </View>
                </View>
               

            </ScrollView>
        )
    }
}
