import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Segment from '../component/Segment';
import styles from '../styles';

export default class Notification extends Component {
    state = {
        refreshing: false
    }
    render() {
        const { navigation } = this.props;
        const { refreshing } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                        <Ionicons name={'ios-arrow-back'} color={'white'} size={30}/>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.icon}>
                        <Ionicons name={'ios-add'} color={'white'} size={30}/>
                    </TouchableOpacity> */}
                </View>

                <Text style={styles.Header}>NOTIFICATION</Text>
                <Segment>
                    <FlatList 
                    onRefresh={() => {}}
                    refreshing={refreshing}
                    data={[1, 2]}
                    renderItem={({ item, index }) => 
                    <View>

                        <View style={styles.hairLine}/>
                    </View>
                    }
                    keyExtractor={(item,index) => index.toString()}
                    />
                </Segment>


            </View>
        )
    }
}
