import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Segment from '../component/Segment';

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

                <FlatList 
                onRefresh={() => {}}
                refreshing={refreshing}
                data={[1, 2]}
                renderItem={({ item, index }) => 
                <View>
                    <Text style={styles.title}>date</Text>
                    <View style={styles.segment}>
                    
                    </View>
                </View>
                }
                keyExtractor={(item,index) => index.toString()}
                />

            </View>
        )
    }
}
