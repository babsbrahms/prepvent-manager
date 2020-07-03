import { ADD_MESSAGE, CLEAR_MESSAGE} from '../types'

function messageReducer (state = { message: "" }, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            
            return { message: action.payload }

        case CLEAR_MESSAGE:
        
            return { message: "" }
    
        default:
            return state;
    }
}

export default messageReducer;