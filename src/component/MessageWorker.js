import React,  {useEffect, useRef} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { clearMessageReducer } from '../action/message';

const MessageWorker = ({ permanent, clearMessage, message }) => {
    let timer = useRef().current;

    useEffect(() => {
        if (!permanent && !!message) {
            // clear prevoius timer
            clearTimer();
            // add new timer
            addTimer()
            console.log('called timer');
            
        }
    },[message])

    const addTimer = () => {
        
        timer = setTimeout(() => {
            clearMessage()
        }, 5000)
    }

    const clearTimer = () => {
        clearTimeout(timer)
    }

    return (
        <View></View>
    )
}

const mapStateToprops = (state) => ({
    permanent: state.messageReducer.permanent,
    message: state.messageReducer.message
})


export default connect(mapStateToprops, { clearMessage: clearMessageReducer })(MessageWorker);