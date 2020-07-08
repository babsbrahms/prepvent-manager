import { ADD_MESSAGE, CLEAR_MESSAGE } from '../types';

export const addMessageReducer = (message, permanent) => dispatch => {
    return dispatch({
        type: ADD_MESSAGE,
        message,
        permanent
    })
}


export const clearMessageReducer = () => dispatch => {
    return dispatch({
        type: CLEAR_MESSAGE,
    })
}