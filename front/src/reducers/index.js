import { combineReducers } from 'redux';
import authReducer from './authReducer';
import popUpReducer from './popUpReducer';

const allReducers = combineReducers({
    auth: authReducer,
    flash: popUpReducer
});

export default allReducers;