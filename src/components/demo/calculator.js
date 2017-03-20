require('normalize.css/normalize.css');
require('styles/Calculator.css');

import React from 'react';
import ReactDOM from 'react-dom';

var Screen = React.createClass({

            getInitialState: function(){
                return {value: "0"};
            },

            componentWillReceiveProps(nextProps) {
                this.setState({ value: nextProps.value });
            },
            componentDidUpdate(prevProps,prevState){
                ReactDOM.findDOMNode(this.refs.inputtext).focus();
            },

            handleChange(event) {
                this.setState({ value: e.target.value });
                this.props.onChange(e.target.value);
            },

            render: function() {
                return (
                    <form>
                        <input
                            ref='inputtext'
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                            readOnly="true"
                            autoFocus="true"
                        />
                    </form>
                );
            }
});

var SetButton = React.createClass({
            getInitialState: function(){
                return {value: this.props.value}
            },

            handleClick: function(event) {
                 this.props.onClick(this.state.value);
            },

            render: function() {
                return (<li onClick={this.handleClick.bind(this)}> {this.state.value} </li>);
            }
});


var Calculator = React.createClass({
            getInitialState: function() {
                return {
                    result: "0",
                    clear: false,
                    point: 0
                };
            },

            handleChange: function(value) {
                this.setState({result:value});
            },

            handleClick: function(value) {
                var showResult;
                var showResultArray;
                var mathOperator = ["+", "-", "*", "/"];
                var num = "00123456789";

                if (value == "C") {
                    this.setState({result: "0"});
                } else if (value == "←") {
                    this.setState({result: this.state.result.slice(0,-1)});
                } else if (value == ".") {
                    showResultArray = this.state.result.split("");
                    var length = showResultArray.length;
                    //判断最后一个是不是加减乘除符号
                    var isOperator = mathOperator.join("").indexOf(showResultArray[length-1]) == -1 ? false : true;
                    if (isOperator) {
                        this.setState({result: this.state.result += "0."});
                        //point++ ;
                        this.setState({point: point++});
                    } else if (!this.state.point) { //只能有一个小数点
                        this.setState({result: this.state.result += "."});
                        //point++;
                        this.setState({point: point++});
                    }
                } else if (num.indexOf(value) != -1) {
                    if(this.state.result == "0" || this.state.clear) {
                        //this.setState({result: "0"});
                        this.state.result = "";
                        this.setState({clear: false});
                    }
                    this.setState({result: this.state.result += value});
                } else if (value == "=") {
                    this.setState({result: eval(this.state.result) + ""}); //eval之后无法使用split等操作，所以加上""
                    //clear = true;
                    this.setState({clear: true});
                } else {  //+ - * /
                    showResult = this.state.result;
                    showResultArray = showResult.split("");
                    var length = showResultArray.length;
                    if (showResultArray[0]) {
                        if (mathOperator.join("").indexOf(showResultArray[length-1]) != -1) {
                            showResultArray[length-1] = value;
                            showResult = showResultArray.join("");
                        } else {
                            showResult += value;
                        }
                        this.setState({result: showResult});
                        //clear = false;
                        this.setState({clear: false});
                        this.setState({point: 0});
                    }
                }
            },

            render: function(){
                return <div className="content">
                <div className="container">
                    <div className="c_screen">
                        <Screen onChange={this.handleChange} value={this.state.result}></Screen>
                    </div>
                    <div className="c_btns">
                        <ul>
                            <SetButton value="C" onClick={this.handleClick}></SetButton>
                            <SetButton value="←" onClick={this.handleClick}></SetButton>
                            <SetButton value="/" onClick={this.handleClick}></SetButton>
                            <SetButton value="*" onClick={this.handleClick}></SetButton>
                            <SetButton value="7" onClick={this.handleClick}></SetButton>
                            <SetButton value="8" onClick={this.handleClick}></SetButton>
                            <SetButton value="9" onClick={this.handleClick}></SetButton>
                            <SetButton value="+" onClick={this.handleClick}></SetButton>
                            <SetButton value="4" onClick={this.handleClick}></SetButton>
                            <SetButton value="5" onClick={this.handleClick}></SetButton>
                            <SetButton value="6" onClick={this.handleClick}></SetButton>
                            <SetButton value="-" onClick={this.handleClick}></SetButton>
                            <SetButton value="1" onClick={this.handleClick}></SetButton>
                            <SetButton value="2" onClick={this.handleClick}></SetButton>
                            <SetButton value="3" onClick={this.handleClick}></SetButton>
                            <SetButton className="eq" value="=" onClick={this.handleClick}></SetButton>
                            <ul className="lastLine">
                                <SetButton value="0" onClick={this.handleClick}></SetButton>
                                <SetButton value="00" onClick={this.handleClick}></SetButton>
                                <SetButton value="." onClick={this.handleClick}></SetButton>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>;
            }
});

Calculator.defaultProps = {
};

export default Calculator;