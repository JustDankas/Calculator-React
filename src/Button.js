import React, { Component } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { change } from './actions'
class Button extends Component {
    constructor(props){
        super(props);
        this.state = {
            symb:this.props.num
        }
    } 
     
    render() { 
        return (
            <button onClick={()=>this.props.onClick(this.state.symb)} className={this.props.className}
            id={numDic[this.props.num]} >{this.props.num}</button>
        );
    }
}
//
const numDic = {
    'cl':'clear',
    '=':'equals',
    7:'seven',
    8:'eight',
    9:'nine',
    '/':'divide',
    4:'four',
    5:'five',
    6:'six',
    'x':'multiply',
    1:'one',
    2:'two',
    3:'three',
    '+':'add',
    0:'zero',
    '.':'decimal',
    '-':'subtract',
}

export default Button;
