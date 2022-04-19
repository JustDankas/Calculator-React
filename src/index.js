import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Redux} from 'redux'
import {createStore} from 'redux';
import { Provider } from 'react-redux';

// Actions
const CHANGE = 'CHANGE'
const change=(text)=>{
  return {
    type:CHANGE,
    text
  }
}

// Reducers

const displayReducer = (state = '', action)=>{
    switch(action.type){
      case CHANGE:
        return state + action.text;
      default:
        return state;
    }
}

// Store
const store = createStore(displayReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
