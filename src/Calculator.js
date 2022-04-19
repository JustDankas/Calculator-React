import React, { Component } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { change } from './actions'
import Button from './Button';

const numRgx = /\d/;
const opRgx = /[\/x\.\-\+]/;
const _Rgx = /_/;
class Calculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:'0',
            
        }
    } 

    handleChange(arg){
        const text = arg.split('').filter(char=>{
            let s = ''+char;
            console.log(s);
            if((numRgx.test(char) || opRgx.test(char)) && !_Rgx.test(char)){
                return true;
            }
        }).join('')
        this.setState({
            text
        })
    }
    handleClick(t){
        if(t==='='){
            this.setState({
                text:results(this.state.text)
            })
            
        }else if(t==='cl'){
            this.setState({
                text: '0'
            })
        }else{
            let text = this.state.text + t;
            let hasDot = false;
            console.log('dot',hasDot);
            if(text[0]==='0'){
                text =  text.split('').pop();
            }
            
            // if(this.state.text[this.state.text.length-1]==='.' && t=='.'){
            //     text =  text.split('').pop();
            // }

            // text = text.split('').filter((char,index)=>{
            //     if(char=='.' && hasDot){
            //         return false;
            //     }else if(!hasDot && char=='.'){
            //         hasDot = true;
            //     }
            //     if(index == 0 && char==0){
            //         return false;
            //     }
            //     if(char==','){
            //         return false;
            //     }
            //     if(opRgx.test(char)){
            //         hasDot= false;
            //     }
            //     return true;
            // });
            //console.log(text,'text',hasDot);
            this.setState({
                text
            })
        }
        
    }
    render() { 
        return (
            <div className="calculator">
                <div id="display">
                    {this.state.text
                    /* Uncomment this if you want writtable input other than buttons
                     <input onChange={(e)=> this.handleChange(e.target.value)} 
                     type="text" className="input" value={this.state.text}  /> */}
                </div>
                <div className="keyboard">
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn number" num='cl' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn operator" num='=' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn number" num='7' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn number" num='8' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn number" num='9' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn operator" num='/' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn number" num='4' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn number" num='5' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn number" num='6' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn operator" num='x'/>
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn number" num='1' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn number" num='2' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn number" num='3' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn operator" num='+' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn number" num='0' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn number" num='.' />
                <Button onClick={(t)=>this.handleClick(t)} className="calc-btn operator" num='-' />
                
                </div>
            </div>
        );
    }
}

 function results(string){
      
         const numTable = [];
         const opTable = [];
         let s = '';
         
         // Insert numbers to numTable and Operators to opTable
         for(let i=0;i<string.length;i++){
             
             const letter = string[i];
             
             if(/\d|\./.test(letter)){
                 if(/\./.test(string[i-1]) && letter=='.'){

                 }else{
                    s+=letter;
                 }
                 
             }
             else{
                if(/\-/.test(letter) && (/[\/|x]/.test(string[i-1]) || i==0)){
                    s+=letter;
                 }else{
                     
                    
                    if(/\/|x|\+|\-/.test(string[i-1])){
                        console.log(opTable,'1');
                        if(/-/.test(string[i-1])){
                            s = s.slice(0,s.length-1);
                            console.log(s,'s')
                        }
                        opTable.pop();
                        console.log(opTable,'2');
                    }
                    if(s!=''){
                        numTable.push(s);
                     }
                    opTable.push(letter);
                    console.log(opTable,'3');
                    s='';
                 }
                 
             }

         }
         console.log(numTable,opTable);
         // is last a number? if so insert , else remove last operator
         if(/\d/.test(s)){
             numTable.push(s);
         }
         else{
             opTable.pop();
         }
         console.log(numTable,opTable);

         
         let i = 0;
         
         while(opTable.length>=1){
             
             let operator = '';
             let n1 = 0;
             let n2 = 0;

             if(i<opTable.length){

                 if(/x|\//.test(opTable[i])){
                     operator = opTable.splice(i,1);
                     n2 = numTable.splice(i+1,1);
                     if(numTable[i-1]=='-'){

                     }
                     n1 = numTable.splice(i,1);
                     numTable.splice(i,0,opDic[operator](n1,n2));
                     
                     
                }else{
                    i++;
                }
             }else{
                 n1 = numTable.shift();
                 n2 = numTable.shift();
                 operator = opTable.shift();
                 numTable.unshift(opDic[operator](n1,n2));
                 console.log(n1,n2,operator,numTable);
             }
             //console.log(numTable);
             
             
             //res = opDic[operator](res,n2);
             
         }
         //clear();
         //updateScreen(numTable[0]);
         console.log(numTable[0]);
         return numTable[0];
 
}


const opDic = {
    '+':addition,
    '-':subtraction,
    'x':multiplication,
    '/':division,
}

function addition(a,b){
    return Number(a)+Number(b);
}
function subtraction(a,b){
    return Number(a)-Number(b);
}
function multiplication(a,b){
    return Number(a)*Number(b);
}
function division(a,b){
    return Number(a)/Number(b);
}
export default Calculator;


