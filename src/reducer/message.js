import { ADD_MESSAGE, CLEAR_MESSAGE} from '../types'

function messageReducer (state = { message: "", permanent: false }, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            
            return { message: action.message, permanent: !!action.permanent }

        case CLEAR_MESSAGE:
        
            return { message: "", permanent: false }
    
        default:
            return state;
    }
}

export default messageReducer;