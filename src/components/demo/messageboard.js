require('normalize.css/normalize.css');
require('styles/MessageBoard.css');

import React from 'react';
import ReactDOM from 'react-dom';
//import $ from 'jquery';
import $ from './js/jquery.min.js'

var ContentEditable = React.createClass({
            shouldComponentUpdate: function(nextProps){
                return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
            },

            editChange: function(){
                var html = ReactDOM.findDOMNode(this).innerHTML;
                if (this.props.onChange && html !== this.lastHtml) {

                    this.props.onChange({
                        target: {
                            value: html
                        }
                    });
                }
                this.lastHtml = html;
            },

            render: function(){
                return <div className="t_contant"
                    onInput={this.editChange}
                    onBlur={this.editChange}
                    contentEditable
                    dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
            }
});

var MessageBoardContainer = React.createClass({
            getInitialState: function() {
                return ({
                    html: "",
                    count: 0
                });
            },
            handleChange: function(event){
                this.setState({html: event.target.value});
            },

            componentDidMount: function() {
                //触发表情包的显示和隐藏
                $(".t_gif").click(function() {
                    $(".t_facebox").toggle(500);
                });

                //点击某一个表情添加到内容框中
                $(".t_facebox ul li").click(function() {
                    var img = $(this).html();
                    $(".t_contant").append(img);
                    $(".t_facebox").toggle(500);
                });

                //点击发送按钮
                $(".t_send").click(function() {
                    if(this.state.count < 3) {
                    var contant = $(".t_contant").text().trim() != ""? true : false;
                    var img = $(".t_contant").find("img").html() != null ? true : false;

                    if (contant || img) {
                        var headImgUrl = require('./../../images/messageboard/D.jpg');
                            $(".time_talk").prepend(
                                "<div class='talk_box animated bounceIn'>" +
                                    "<div class='talk_head'><img src='"+headImgUrl+"' width='66' height='66'></div>" +
                                    "<div class='talk_icon'></div>" +
                                    "<div class='talk_message'>" + $(".t_contant").html() + "</div>" +
                                "</div>"
                            );
                            $(".t_contant").text("");
                            this.setState({count: this.state.count+1});
                    } else {
                        alert("内容不能为空哦，请重新输入");
                        $(".t_contant").focus();
                        return;
                    }
                    }
                });
            },

            render: function() {
                return <div className="time_axis">
                        <div className="time_line"></div>
                        <div className="time_message">
                            <div className="time_message_head"><img src={require('./../../images/messageboard/D.jpg')} width="66" height="66" /></div>
                            <div className="time_message_icon"></div>
                            <div className="time_message_box">
                                <p className="t_title">想说点啥？</p>
                                <ContentEditable html={this.state.html} onChange={this.handleChange} />

                                <div className="t_option">
                                    <a className="t_gif" href="javascript:;"><img src={require('./../../images/messageboard/face/bba_thumb.gif')} alt="表情" width="22" height="22" /></a>
                                    <a className="t_send" href="javascript:;">发送</a>

                                    <div className="t_facebox ">
                                        <ul>
                                            <li><img src={require('./../../images/messageboard/face/zz2_thumb.gif')} title="[织]" width="22" height="22" /></li>
                                            <li><img src={require('./../../images/messageboard/face/horse2_thumb.gif')} title="[神马]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/fuyun_thumb.gif')} title="[浮云]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/geili_thumb.gif')} title="[给力]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/wg_thumb.gif')} title="[围观]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/vw_thumb.gif')} title="[威武]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/panda_thumb.gif')} title="[熊猫]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/rabbit_thumb.gif')} title="[兔子]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/otm_thumb.gif')} title="[奥特曼]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/j_thumb.gif')} title="[囧]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/hufen_thumb.gif')} title="[互粉]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/liwu_thumb.gif')} title="[礼物]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/smilea_thumb.gif')} title="[呵呵]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/tootha_thumb.gif')} title="[嘻嘻]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/laugh.gif')} title="[哈哈]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/tza_thumb.gif')} title="[可爱]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/kl_thumb.gif')} title="[可怜]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/kbsa_thumb.gif')} title="[挖鼻屎]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/cj_thumb.gif')} title="[吃惊]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/shamea_thumb.gif')} title="[害羞]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/zy_thumb.gif')} title="[挤眼]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/bz_thumb.gif')} title="[闭嘴]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/bs2_thumb.gif')} title="[鄙视]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/lovea_thumb.gif')} title="[爱你]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/sada_thumb.gif')} title="[泪]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/heia_thumb.gif')} title="[偷笑]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/qq_thumb.gif')} title="[亲亲]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/sb_thumb.gif')} title="[生病]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/mb_thumb.gif')} title="[太开心]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/ldln_thumb.gif')} title="[懒得理你]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/yhh_thumb.gif')} title="[右哼哼]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/zhh_thumb.gif')} title="[左哼哼]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/x_thumb.gif')} title="[嘘]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/cry.gif')} title="[衰]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/wq_thumb.gif')} title="[委屈]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/t_thumb.gif')} title="[吐]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/k_thumb.gif')} title="[打哈气]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/bba_thumb.gif')} title="[抱抱]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/angrya_thumb.gif')} title="[怒]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/yw_thumb.gif')} title="[疑问]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/cza_thumb.gif')} title="[馋嘴]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/88_thumb.gif')} title="[拜拜]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/sk_thumb.gif')} title="[思考]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/sweata_thumb.gif')} title="[汗]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/sleepya_thumb.gif')} title="[困]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/sleepa_thumb.gif')} title="[睡觉]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/money_thumb.gif')} title="[钱]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/sw_thumb.gif')} title="[失望]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/cool_thumb.gif')} title="[酷]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/hsa_thumb.gif')} title="[花心]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/hatea_thumb.gif')} title="[哼]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/gza_thumb.gif')} title="[鼓掌]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/dizzya_thumb.gif')} title="[晕]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/bs_thumb.gif')} title="[悲伤]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/crazya_thumb.gif')} title="[抓狂]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/h_thumb.gif')} title="[黑线]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/yx_thumb.gif')} title="[阴险]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/nm_thumb.gif')} title="[怒骂]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/hearta_thumb.gif')} title="[心]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/unheart.gif')} title="[伤心]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/pig.gif')} title="[猪头]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/ok_thumb.gif')} title="[ok]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/ye_thumb.gif')} title="[耶]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/good_thumb.gif')} title="[good]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/no_thumb.gif')} title="[不要]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/z2_thumb.gif')} title="[赞]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/come_thumb.gif')} title="[来]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/sad_thumb.gif')} title="[弱]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/lazu_thumb.gif')} title="[蜡烛]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/clock_thumb.gif')} title="[钟]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/cake.gif')} title="[蛋糕]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/m_thumb.gif')} title="[话筒]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/weijin_thumb.gif')} title="[围脖]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/lxhzhuanfa_thumb.gif')} title="[转发]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/lxhluguo_thumb.gif')} title="[路过这儿]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/bofubianlian_thumb.gif')} title="[bofu变脸]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/gbzkun_thumb.gif')} title="[gbz困]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/boboshengmenqi_thumb.gif')} title="[生闷气]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/chn_buyaoya_thumb.gif')} title="[不要啊]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/daxiongleibenxiong_thumb.gif')} title="[dx泪奔]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/cat_yunqizhong_thumb.gif')} title="[运气中]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/youqian_thumb.gif')} title="[有钱]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/cf_thumb.gif')} title="[冲锋]" /></li>
                                            <li><img src={require('./../../images/messageboard/face/camera_thumb.gif')} title="[照相机]" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="time_talk"></div>
                       </div>
            }
});

var MessageBoard = React.createClass({
        render: function() {
            return  (<div className="backgroundBox">
                        <MessageBoardContainer />
                    </div>);
        }
});

MessageBoard.defaultProps = {
};

export default MessageBoard;