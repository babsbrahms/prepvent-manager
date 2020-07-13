import { combineReducers } from 'redux';
import messageReducer from "./reducer/message";
import eventReducer from './reducer/event';
import notificationReducer from './reducer/notification';
import organizersReducer from './reducer/organizers';
import pollsReducer from './reducer/polls';
import tablesReducer from './reducer/tables';
import userReducer from './reducer/user';

const reducers = combineReducers({
    messageReducer,
    eventReducer,
    notificationReducer,
    organizersReducer,
    pollsReducer,
    tablesReducer,
    userReducer
});

export default reducers;

