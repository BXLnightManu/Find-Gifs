import { combineReducers } from 'redux';
import authReducer from './authReducer';
import regReducer from './regReducer';

// Redux: Combination of reducers to create the global reducer.
const allReducers = combineReducers({
    auth: authReducer,
    reg: regReducer
});

export default allReducers;