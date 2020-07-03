import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { addMessageReducer } from '../action/message';
import Segment from '../component/Segment';
import styles from '../styles';

const style = StyleSheet.create({
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
    space: {
        marginTop: 20
    }
});

class Subscription extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                        <Ionicons name={'ios-arrow-back'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name={'ios-checkmark'} color={'white'} size={40}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>SUBSCRIPTION</Text>

                <ScrollView>
                    <Text style={styles.title}>Basic</Text>
                    <Segment>
                        <View style={styles.details}>
                            <View>

                            </View>
                            <TouchableOpacity style={style.button}>
                                <Text style={style.btnText}>SELECT</Text>
                            </TouchableOpacity>
                        </View>
                    </Segment>


                    <View style={style.space} />


                    <Text style={styles.title}>Gold</Text>
                    <Segment>
                        <View style={styles.details}>
                            <View>

                            </View>
                            <TouchableOpacity style={style.button}>
                                <Text style={style.btnText}>SELECT</Text>
                            </TouchableOpacity>
                        </View>
                    </Segment>


                    <View style={style.space} />


                    <Text style={styles.title}>Platinum</Text>
                    <Segment>
                        <View style={styles.details}>
                            <View>

                            </View>
                            <TouchableOpacity style={style.button}>
                                <Text style={style.btnText}>SELECT</Text>
                            </TouchableOpacity>
                        </View>
                    </Segment>


                    <View style={style.space} />


                    <Text style={styles.title}>Extra Credit</Text>
                    <Segment>


                    </Segment>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToprops = (state) => ({
    
})

const mapDisptachToprops = {
    addMessage: addMessageReducer
}

export default connect(mapStateToprops, mapDisptachToprops)(Subscription);