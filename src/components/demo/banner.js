require('normalize.css/normalize.css');
require('styles/Banner.css');

import React from 'react';
import ReactDOM from 'react-dom';

var ImgFigure = React.createClass({
            handleMouseOver: function() {
                this.props.onMouseOver();
            },
            handleMouseOut: function() {
                this.props.onMouseOut();
            },

            render: function() {
                var styleObj = {};
                styleObj.left = this.props.styleObj.left;
                return <li onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                            <img src={this.props.data} width="320" height="200" style={styleObj}/>
                       </li>
            }
});

var SetButton = React.createClass({
            getInitialState: function(){
                return {value: this.props.value}
            },

            handleClickEvent: function(event) {
                this.props.onClick(this.state.value);
            },

            render: function() {
                return (<div className={this.props.name} onClick={this.handleClickEvent}> {this.state.value} </div>);
            }
});

var Imgs = React.createClass({
            getInitialState: function() {
                return {
                    imgArray: [], //图片子组件数组
                    direction: "left", //轮播方向
                    speed: 5,//速度
                };
            },

            //点击“<”或者“>” 触发此函数
            handleClick: function(value) {
                clearInterval(this.interval);
                if (value == "<") {
                    this.interval = setInterval(this.moveLeft, 1000/30);
                } else {
                    this.interval = setInterval(this.moveRight, 1000/30);
                }
            },

            //当鼠标进入到图片节点中触发
            handleMouseOver: function() {
                clearInterval(this.interval);
            },

            //当鼠标离开图片节点中触发
            handleMouseOut: function() {
                if (this.state.direction == "left") {
                    this.interval = setInterval(this.moveLeft, 1000/30);
                } else {
                    this.interval = setInterval(this.moveRight, 1000/30);
                }
            },

            //从右向左方向轮播
            moveLeft: function() {
                this.setState({direction: "left"});
                var imgArrayReset = [];
                for (var i = 0; i < 6; i++) {
                    var distance =  this.state.imgArray[i].left;
                    distance -= this.state.speed;

                    if (distance <= -330) {
                        distance = 330 *5;
                    }

                    imgArrayReset[i] = {
                        left: distance
                    }
                }
                this.setState({imgArray: imgArrayReset});
            },

            //从左向右方向轮播
            moveRight: function() {
                this.setState({direction: "right"});

                var imgArrayReset = [];
                for (var i = 0; i < 6; i++) {
                    var distance =  this.state.imgArray[i].left;
                    distance += this.state.speed;

                    if (distance >= 330 * 5) {
                        distance = -330;
                    }

                    imgArrayReset[i] = {
                        left: distance
                    }
                }
                this.setState({imgArray: imgArrayReset});
            },

            componentDidMount: function() {
                //this.interval = setInterval(this.moveLeft, 1000/30);
                this.interval = setInterval(this.moveRight, 1000/30);
            },

            componentWillUnmount: function() {
                clearInterval(this.interval);
            },

            render: function() {
                var imgArrs = [];
                for (var i = 0; i < 6; i++) {
                    if (!this.state.imgArray[i]) {
                    var temp = 330 * i;
                        this.state.imgArray[i] = {
                            left: temp
                        }
                    }
                    var imgUrl = require('./../../images/banner/'+ (i+1) + '.jpg');
                    imgArrs.push(<ImgFigure onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} key={i} data={imgUrl} styleObj={this.state.imgArray[i]} />);
                }

                return <div className="box">
                        <ul className="imgs">
                            {imgArrs}
                        </ul>
                        <SetButton value="<" name="btn left" onClick={this.handleClick}  ></SetButton>
                        <SetButton value=">" name="btn right" onClick={this.handleClick} ></SetButton>
                       </div>

            }
});

var Banner = React.createClass({
            render: function() {
                return <Imgs />;

                }
});

Banner.defaultProps = {
};

export default Banner;