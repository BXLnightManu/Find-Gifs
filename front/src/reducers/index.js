import { combineReducers } from 'redux';
import authReducer from './authReducer';
import regReducer from './regReducer';

const allReducers = combineReducers({
    auth: authReducer,
    reg: regReducer
});

export default allReducers;