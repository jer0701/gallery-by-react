require('normalize.css/normalize.css');
require('styles/Love.css');

import React from 'react';
import ReactDOM from 'react-dom';

//阴影效果组件
var Shadow = React.createClass({
            getInitialState: function() {
                return { timeover: false };
            },

            componentDidMount: function() {
                setTimeout(function() {
                        this.props.clearShadow();
                    }.bind(this), 10000);
            },

            render: function() {
                var styleObj = {};
                var ranColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
                styleObj = {background: ranColor};

                return <div className="l_shadow">
                        <span className="heart left" style={styleObj}></span>
                        <span className="heart right" style={styleObj}></span>
                        <span className="bottom" style={styleObj}></span>
                       </div>
            }
});

//中间心形的组件
var Heart = React.createClass({
            getInitialState: function() {
                return { shadows: [] };
            },

            //点击心的时候触发此函数，添加Shadow效果
            handleClick: function(event) {
                var temp = this.state.shadows;
                temp.push(<Shadow clearShadow={this.clearShadow()}/>);
                this.setState({shadows: temp});

            },

            //定时器清理Shadow节点
            clearShadow: function() {
                return function() {
                    var temp = this.state.shadows;
                    temp.shift();
                    this.setState({shadows: temp});
                }.bind(this);
            },

            render: function() {
                return <div className="love">
                        <div className="l_in">
                            <span className="heart left"></span>
                            <span className="heart right"></span>
                            <span className="bottom"></span>
                            <a className="btn" href="javascript:;" onClick={this.handleClick}>点我</a>
                        </div>
                        <div className="l_out">
                            <span className="heart left"></span>
                            <span className="heart right"></span>
                            <span className="bottom"></span>
                        </div>
                        { this.state.shadows }
                       </div>

                }
});

var Love = React.createClass({

            render: function() {
                return <div >
                        <Heart />
                       </div>
            }
});

Love.defaultProps = {
};

export default Love;