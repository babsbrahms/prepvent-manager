import React, { useRef, useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';


const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "transparent",
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 9,
        left: 0,
        zIndex: 5
    },
    main: {
        backgroundColor: '#0E0C20',
        width: '80%',
        height: '100%',
        // borderRightColor: "#FFFFFF",
        // borderRightWidth: 2,
    },
    other: {
        backgroundColor: 'transparent',
        width: '20%',
        height: '100%'
    }
});

// const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

const SideBar = ({ sideBarOpen, close, children }) => {

    // Initial Value: 0
    const bar = useRef(new Animated.Value(0)).current;

    const [visible, setVisible] = useState(false)
    
    useEffect(() => {
        if ((sideBarOpen === true)) {
            openBar();
            setVisible(true);
        } else {
            closeBar()
        }
    },[sideBarOpen])

    const openBar = () => {
        console.log('open called');
        if (sideBarOpen) {
            Animated.spring(bar, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: false
            }).start();
        }
    };

    const closeBar = () => {
        Animated.timing(bar, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start(() => { 
            setVisible(false);
            close();
        });
    };

    let barWidth = bar.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    })


    return (
    <Animated.View style={[style.container, { width: barWidth }]}>
        <View style={style.main}>
            {visible && children}
        </View>
        <TouchableOpacity style={style.other} onPress={() => closeBar()}>

        </TouchableOpacity> 
    </Animated.View>
    )
}

export default SideBar;