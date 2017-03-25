require('normalize.css/normalize.css');
require('styles/Ball.css');

import React from 'react';
import ReactDOM from 'react-dom';

var BallArray = React.createClass({
            getInitialState: function() {
                return { styleObj: {
                    left: this.props.style.pos.top,
                    top: this.props.style.pos.left,
                    y: this.props.style.y,
                    x: this.props.style.x,
                    color: this.props.style.color
                } };
            },

            run: function() { //运动函数
                var temp = this.state.styleObj;
                var yMoveArea = window.innerHeight - this.refs.ball.offsetHeight;
                var xMoveArea = window.innerWidth - this.refs.ball.offsetWidth;

                temp.top += temp.y;
                temp.left += temp.x;

                if (temp.top >= yMoveArea) { //触碰到底部
                    temp.top = yMoveArea;
                    temp.y = -temp.y;
                    temp.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256)  + "," + Math.floor(Math.random() * 256) +")" ;
                }

                if (temp.top <=0){ //触碰到顶部
                    temp.top = 0;
                    temp.y = -temp.y;
                }

                if (temp.left >= xMoveArea) { //触碰到右边框
                    temp.left = xMoveArea;
                    temp.x = -temp.x;
                }

                if (temp.left <= 0) { //触碰到左边框
                    temp.left = 0;
                    temp.x = -temp.x;
                }

                //将数值保存在state变量中
                var obj = {};
                obj.left = temp.left;
                obj.top = temp.top;
                obj.x = temp.x;
                obj.y = temp.y;
                obj.color = temp.color;

                this.setState({styleObj: obj});
            },

            componentDidMount: function() {
                this.interval = setInterval(this.run, 1000/60);
            },
            componentWillUnmount: function() {
                clearInterval(this.interval);
            },

            render: function() {
                var styleObj = {};
                styleObj.left = this.state.styleObj.left;
                styleObj.top = this.state.styleObj.top;
                styleObj.backgroundColor = this.state.styleObj.color;

                return <div className="ball" ref="ball" style={styleObj}>{this.props.data}</div>
            }
});

var Ball = React.createClass({
            getInitialState: function() {
                return {
                    ballArray: [
                        /*{
                            pos: {
                                left: 0,
                                top: 0
                            },
                            x: 5, //水平方向上的速度至少是5
                            y: 5, //垂直方向上的速度至少是5
                            color: "rgb(255, 0, 0)" //小球的颜色
                        }*/
                    ]
                };
            },


            render: function() {
                var balls = [];
                for (var i = 0; i < 7; i++) {
                    if (!this.state.ballArray[i]) {
                        var speed = Math.floor(Math.random() * 15 + 5); //速度至少是5
                        this.state.ballArray[i] = {
                            pos: {
                                left: 0,
                                top: 0
                            },
                            x: speed,
                            y: speed,
                            color: "rgb(255, 0, 0)"
                        }
                    }
                    balls.push(<BallArray key={i} data={i+1} style={this.state.ballArray[i]} />);
                }

                return <div className="content">
                        <div className="pack">
                            { balls }
                        </div>
                       </div>
            }
});

Ball.defaultProps = {
};

export default Ball;