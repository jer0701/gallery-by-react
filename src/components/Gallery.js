require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route,IndexRoute, hashHistory} from 'react-router'

let imageDatas = require('../data/imageData.json'); //如果不加json！，forEach使用不了,需要json loader

//定义一个函数遍历图片文件名，自执行来把文件信息转化成URL路径信息

imageDatas = (function genImageURL(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(imageDatas);

/*
 * 获取取范围内一个随机数
 */
function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

/*
 * 获取0~30° 之间的一个任意正负值
 */
function get30DegRandom() {
    return (Math.random() > 0.5 ? "+" : "-") + Math.ceil(Math.random() * 30);
}

var ImgFigure = React.createClass({
    /*
     * imgFigure的点击处理函数
     */
    handleClick: function(e) {
        //this.props.inverse();

        if(this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }

        e.stopPropagation();  //阻止事件冒泡
        e.preventDefault();   //阻止事件的默认行为
    },

    render: function () {
        var styleObj = {};

        //如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

        //如果图片的旋转角度有值，添加旋转角度
        if (this.props.arrange.rotate) {
            (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
                styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this));
        }

        if (this.props.arrange.isCenter) {
            styleObj.zIndex = 11;
        }

        var imgFigureClassName = "img-figure";
            imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        return(
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageURL} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div>
                </figcaption>
            </figure>
            );
    }
});

var Gallery = React.createClass({
    Constant: {
        centerPos: {
            left:0,
            right:0
        },
        hPosRange: { //水平方向取值范围
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        vPosRange: {
            x: [0, 0],
            topY: [0, 0]
        }
    },

    /*
     * 翻转图片
     * @param index 输入当前被执行inverse操作的图片队友的图片数组的index值
     * @return {function} 这是一个闭包函数，其内return一个真正待被执行的函数
     */
    inverse: function(index) {
        return function() {
            var imgsArrangeArr = this.state.imgsArrangeArr;

            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
            if (imgsArrangeArr[index].isInverse) {
                var path = null;
                switch(index) {
                    case 0:
                        path = "/lazyloading";
                        break;
                    case 1:
                        path = "/messageboard";
                        break;
                    case 2:
                        path = "/love";
                        break;
                    case 3:
                        path = "/banner";
                        break;
                    case 4:
                        path = "/calculator";
                        break;
                    case 5:
                        path = "/ball";
                        break;
                }
                if (path) {
                    hashHistory.push(path)
                }
            }
        }.bind(this);
    },


    /*
     * 重新布局所有图片
     *  @
     */
    realrange: function(centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            //vPosRangeY = vPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgsArrangeTopArr = [],
            topImgNum = Math.ceil(Math.random() * 2),
            topImgSpliceIndex = 0,

            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

            //首先居中centerIndex 的图片
            imgsArrangeCenterArr[0].pos = centerPos;

            //居中的图片不需要旋转
            imgsArrangeCenterArr[0].rotate = 0;
            imgsArrangeCenterArr[0].isCenter = true; //确认居中

            //取出要布局上侧的图片的状态信息
            topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
            imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

            //布局位于上侧的图片
            imgsArrangeTopArr.forEach(function (value, index) {
                imgsArrangeTopArr[index] = {
                    pos: {
                        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                        left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                    },
                    rotate: get30DegRandom(),
                    isCenter: false
                };
            });

            //布局左右两侧的图片
            for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
                var hPosRangeLORX = null;

                //前半部分布局左边，右半部分布局右边
                if (i < k) {
                    hPosRangeLORX = hPosRangeLeftSecX;
                } else {
                    hPosRangeLORX = hPosRangeRightSecX;
                }

                imgsArrangeArr[i] = {
                    pos: {
                        top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                        left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                    },
                    rotate: get30DegRandom(),
                    isCenter: false
                };

            }

            if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
                imgsArrangeArr.splice(topImgSpliceIndex, 0,imgsArrangeTopArr[0]);
            }

            imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
    },

    /*
    * 利用rearrange函数，居中对应index图片
    * @param index，需要被居中的图片对应的图片信息数组的index值
    * @return {Function}
    */
    center: function (index) {
        return function () {
            this.realrange(index);
        }.bind(this);
    },

    getInitialState: function() {
        return {
            imgsArrangeArr: [
                /*{
                    pos: {
                        left: '0',
                        top: '0'
                    },
                    rotate: 0, //旋转角度
                    isInverse: false, //图片正反面(正面)
                    isCenter: false    //图片是否居中(不居中)
                }*/
            ]
        };
    },

    //组件加载后，为每张图片计算其位置范围
    componentDidMount: function() {
        //首先拿到舞台的大小
        var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        //var stageDOM = this.refs.stage,
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            harfStageW = Math.ceil(stageW / 2),
            harfStageH = Math.ceil(stageH / 2);

        //拿到ImgFigure的大小
        var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        //var imgFigureDOM = this.refs.imgFigure0.refs.figure,
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            harfImgW = Math.ceil(imgW / 2),
            harfImgH = Math.ceil(imgH / 2);

        //计算中心图片的位置点
        this.Constant.centerPos = {
            left: harfStageW - harfImgW,
            top: harfStageH - harfImgH
        }

        //计算左侧，右侧区域图片排布位置范围
        this.Constant.hPosRange.leftSecX[0] = -harfImgW;
        this.Constant.hPosRange.leftSecX[1] = harfStageW - harfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = harfStageW + harfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - harfImgW;
        this.Constant.hPosRange.y[0] = -harfImgH;
        this.Constant.hPosRange.y[1] = stageH - harfImgH;

        this.Constant.vPosRange.topY[0] = -harfImgH;
        this.Constant.vPosRange.topY[1] = harfStageH - harfImgH * 3;
        this.Constant.vPosRange.x[0] = harfStageW - imgW;
        this.Constant.vPosRange.x[1] = harfStageW;

        this.realrange(0);
    },


  render() {

    var imgFigures = [];

    imageDatas.forEach(function(value, index) {
        if (!this.state.imgsArrangeArr[index]) {
            this.state.imgsArrangeArr[index] = {
                pos: {
                    left: 0,
                    top: 0
                },
                rotate: 0,
                isInverse: false,
                isCenter: false
            }
        }
        imgFigures.push(<ImgFigure key={index} data={value} ref={"imgFigure" + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />);
    }.bind(this));

    return (
        <div className="stage" ref="stage">
            <section className="img-sec">
                {imgFigures}
            </section>
        </div>
    );
  }
});

Gallery.defaultProps = {
};

export default Gallery;
