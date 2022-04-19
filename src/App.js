import React, { Component } from 'react';
import Calculator from './Calculator';
import Button from './Button';
import './App.scss';
import { useSelector } from 'react-redux';



class App extends Component {
  state = {  } 
  
  render() { 
    return (
      <div className="App">
        <Calculator />
      </div>
    );
  }
}
 
export default App;
