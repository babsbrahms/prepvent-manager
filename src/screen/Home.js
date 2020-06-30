import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const style = StyleSheet.create({
    name: {
        color: '#0E0C20',
        // fontWeight: "regular",
        fontSize: 24,
    },
    host: {
        color: '#707070',
        fontWeight: "bold",
        fontSize: 18
    },
    date: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    }
});

export default class Home extends Component {
    state = {
        refreshing: false
    }

    render() {
        const { navigation } = this.props;
        const { refreshing } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.between}>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("Create")}>
                        <Ionicons name={'ios-add'} color={'white'} size={40}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Subscription')}>
                        <Ionicons name={'ios-wallet'} color={'white'} size={30}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Header}>EVENTS</Text>

                <View style={{padding: 5, borderRadius: 7, marginTop: 6, width: '100%', height: '100%', backgroundColor: 'white', flex: 1 }}>
        
                <FlatList 
                onRefresh={() => {}}
                refreshing={refreshing}
                data={[1]}
                renderItem={({ item, index }) => 
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                            <Text style={style.name}>Event name</Text>
                            <Text style={style.host}>Hosted by</Text>
                        </TouchableOpacity>
                        <View style={style.date}>
                            <Text style={style.host}>date</Text>
                        </View>
                        <View style={styles.hairLine} />
                    </View>
                }
                keyExtractor={(item,index) => index.toString()}
                />

                </View>
            </View>
        )
    }
}
