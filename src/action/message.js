import { ADD_MESSAGE, CLEAR_MESSAGE } from '../types';

export const addMessageReducer = (msg) => dispatch => {
    return dispatch({
        type: ADD_MESSAGE,
        payload: msg
    })
}


export const clearMessageReducer = () => dispatch => {
    return dispatch({
        type: CLEAR_MESSAGE,
    })
}