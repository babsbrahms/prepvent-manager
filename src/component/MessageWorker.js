import React,  {useEffect, useRef} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { clearMessageReducer } from '../action/message';

const MessageWorker = ({ permanent, clearMessage }) => {
    let timer = useRef().current;

    useEffect(() => {
        if (!permanent) {
            // clear prevoius timer
            clearTimer();
            // add new timer
            addTimer()
        }
    },[permanent])

    const addTimer = () => {
        
        timer = setTimeout(() => {
            clearMessage()
        }, 6000)
    }

    const clearTimer = () => {
        clearTimeout(timer)
    }

    return (
        <View></View>
    )
}

const mapStateToprops = (state) => ({
    permanent: state.messageReducer.permanent
})


export default connect(mapStateToprops, { clearMessage: clearMessageReducer })(MessageWorker);