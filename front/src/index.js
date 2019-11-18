import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';

// Redux: Calling createStore and Provider methods to be able to create and provide the store.
import { createStore } from 'redux';
import { Provider } from  'react-redux';

// Redux: Calling reducers.
import allReducers from './reducers';

// Redux: Store creation, entirely available to the application.
const  store  =  createStore(allReducers)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
