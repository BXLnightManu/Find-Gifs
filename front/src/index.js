import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';

// Redux: Store creation, entirely available to the application.
import { createStore } from 'redux';
import { Provider } from  'react-redux';
import allReducers from './reducers';
const  store  =  createStore(allReducers)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
