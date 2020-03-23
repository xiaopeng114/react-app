import React, { Component } from 'react'
import Header from "../header/Header.js"
import { connect } from "react-redux"
import { Toast, Modal } from 'antd-mobile';
import Leftlist from "./listleft/Leftlist.js"
import Rightlist from "./listright/Rightlist.js"
import { add_action, remo_action, shoppdata_action, subtract_action } from "../../store/store.js"
// import srcurl from "../../4ae3af032934412187607e077c3a3e14.gif"
class Shopping extends Component {
    constructor() {
        super();
        this.state = {
            inde: 0,
            shoopflag: false,
            remoadd: true
        }
    }
    shoucang = (item) => {
        this.props.add_action(item)
        Toast.success("收藏成功", 1, null, false)
    }
    remo = (item) => {
        this.props.remo_action(item)
        Toast.success("取消收藏", 1, null, false)
    }
    // 子组件触发的事件
    tableft = (index) => {
        this.setState({
            inde: index
        }, () => {
            console.log(this.state.inde)
        })
    }
    close = () => {
        this.setState({
            shoopflag: true,
            remoadd: true
        })
    }
    offflag = () => {
        this.setState({
            shoopflag: false,
            remoadd: false
        })

    }
    //数量加加
    addshopp = (item) => {

        this.props.shoppdata_action(item)

    }
    // 数量减减
    subtract = (item) => {
        if (item.num > 1) {
            this.props.subtract_action(item)
        } else {
            Modal.alert('提示', '确定要从购物车删除吗???', [
                { text: '取消', onPress: () => console.log('cancel') },
                {
                    text: '确定',
                    onPress: () =>
                        new Promise((resolve) => {
                            Toast.info('以从购物车删除', 1);
                            this.props.subtract_action(item);
                            setTimeout(resolve, 10);
                        }),
                },
            ])

        }

    }
    render() {
        let item = this.props.location.state
        return (
            <div className="shopping">
                <Header left={<span onClick={() => this.props.history.go(-1)}>&lt;</span>} center="店铺" bac="bac"></Header>
                {/* 店铺头部  收藏 */}
                <div className="nav">
                    <dl>
                        <dt><img src={item.image} alt="" /></dt>
                        <dd>
                            <span>{item.name} (店铺)</span>
                            {
                                this.props.collectdata.find(ite => ite.collect === item.collect) ? <span style={{ fontSize: "40px" }} className="iconbac iconfont icon-xihuan" onClick={() => this.remo(item)}></span> : <span style={{ fontSize: "40px" }} className="iconfont icon-xihuan" onClick={() => this.shoucang(item)}></span>
                            }

                        </dd>
                    </dl>
                </div>
                {/*店铺商品列表  */}
                <div className="list">
                    <div className="listleft">
                        <Leftlist tabind={(index) => this.tableft(index)} list={this.props.location.state.childred}></Leftlist>
                    </div>
                    <div className="rightlist">
                        <Rightlist list={this.props.location.state.childred[this.state.inde]}></Rightlist>
                    </div>
                </div>
                {/* 结算 */}
                <div className="bottoms">
                    {
                        this.props.shoppdata.length > 0 ?
                            <dl>
                                <dt><img src={require('../../favicon.ico')} alt="404" /> </dt>
                                <dd>
                                    <p style={{ color: "#ffffff" }}>￥{this.props.shoppdata.reduce((i, item) => { return i + (item.num * item.oneprice) }, 0)}</p>
                                    <p style={{ background: "green", color: "#ffffff" }} onClick={() => this.close()}>去结算</p>
                                </dd>
                            </dl>
                            :
                            <dl>
                                <dt><img src={require('../../favicon.ico')} alt="404" /> </dt>
                                <dd>
                                    <p>未勾选商品</p>
                                    <p>￥128起送</p>
                                </dd>
                            </dl>
                    }

                </div>
                {/* 购物车 */}
                {
                    <div className={`shopp_shade ${this.state.shoopflag ? "addWidths" : ""} ${this.state.remoadd ? "" : "remoWidths"}`}>
                        <div className="top" onClick={() => this.offflag()}>

                        </div>
                        <div className="botton_list">
                            <div className="shopp_nav">
                                <span> <b>已选商品</b> </span><span>清空</span>
                            </div>
                            <div className="shopp_list">
                                {
                                    this.props.shoppdata.map(item => {
                                        return (
                                            <dl key={item.id}>
                                                <dt><img src={item.image} alt="" /></dt>
                                                <dd>
                                                    <p><b>{item.com}</b></p>
                                                    <p><span>￥{item.oneprice}</span><span className="span_add_remo"> <span onClick={() => this.subtract(item)}>-</span>{item.num}<span onClick={() => this.addshopp(item)}>+</span></span></p>
                                                </dd>
                                            </dl>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            collectdata: state.collectdata,
            shoppdata: state.shoppdata
        }
    },
    (dispatch) => {
        return {
            add_action: (item) => {
                dispatch(add_action(item))
            },
            remo_action: (item) => {
                dispatch(remo_action(item))
            },
            shoppdata_action: (item) => {
                dispatch(shoppdata_action(item))
            },
            subtract_action: (item) => [
                dispatch(subtract_action(item))
            ]
        }
    }
)(Shopping)