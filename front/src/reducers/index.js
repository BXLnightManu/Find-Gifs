import { combineReducers } from 'redux';
import authReducer from './authReducer';
import renderReducer from './renderReducer.js';

// Redux: Combination of reducers to create the global reducer.
const allReducers = combineReducers({
    auth: authReducer,
    render: renderReducer
});

export default allReducers;