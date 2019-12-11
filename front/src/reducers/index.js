import { combineReducers } from 'redux';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';
import gifReducer from './gifReducer';

// Redux: Combination of reducers to create the global reducer.
const allReducers = combineReducers({
    auth: authReducer,
    message: messageReducer,
    user: userReducer,
    gif: gifReducer
});

export default allReducers;