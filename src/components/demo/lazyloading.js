require('normalize.css/normalize.css');
require('styles/LazyLoading.css');

import React from 'react';
import ReactDOM from 'react-dom';

var ImgFigure = React.createClass({
            getInitialState: function() {
                return {
                  showImage: false  //是否显示要加载的图片
                };
            },

            /*
            * 如果滑动滚轮，那么就调用此函数更新state显示要加载的图片
            * @param el  传入一个图片节点，需要获取它的offsetTop
            * @return 更新state状态
            */
            updateImg: function(el) {
                var topHeight = this.props.viewport.top + this.props.viewport.height;
                    var imgtop = el.offsetTop;
                    if (imgtop < topHeight )
                    {
                        this.setState({showImage: true});
                    }
            },

            componentDidUpdate: function(prevProps) {
                var self = this;
                if (!this.state.showImage && prevProps.viewport) {
                    var el = ReactDOM.findDOMNode(self);
                    this.updateImg(el);
                }
            },

            render: function() {
                var loadingurl = require('./../../images/lazyloading/loading.gif');
                var imgsrc = this.state.showImage ? this.props.data : loadingurl ;
                return <li>
                            <img src={imgsrc} data-src={this.props.data} />
                       </li>

            }
});

var LazyLoading = React.createClass({
            getInitialState: function() {
                return {
                      viewport: {
                        top: 0,
                        height: 0
                      }
                };
            },

            /*
             * 当滚轮滑动的时候更新state，距离顶部的距离加大了。
             */
            updateViewport: function() {
                this.setState({
                  viewport: {
                    top: window.pageYOffset,
                    height: window.innerHeight
                  }
                });
            },

            componentDidMount: function() {
                window.addEventListener('scroll', this.updateViewport, false);
                this.updateViewport();
            },

            componentWillUnmount: function() {
                window.removeEventListener('scroll', this.updateViewport);
            },

            render: function() {
                var imgArrs = [];
                for (var i = 0; i < 16; i++) {
                    var imgUrl = require('./../../images/lazyloading/'+ (i+1) + '.jpg');
                    imgArrs.push(<ImgFigure key={i} data={imgUrl} viewport={this.state.viewport}/>);
                }
                return <div className="loadingbox">
                        <ul>
                            { imgArrs }
                        </ul>
                       </div>
            }
});

LazyLoading.defaultProps = {
};

export default LazyLoading;