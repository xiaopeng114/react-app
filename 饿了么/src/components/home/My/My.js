import React, { Component } from 'react'
import Header from "../../header/Header"
import { Icon } from 'antd-mobile';

export default class My extends Component {
    render() {
        return (
            <div className="my">
                <Header bac="white" center="我的" ></Header>
                <div className="content">
                    <div><span>我的红包</span><span><Icon type="right" /></span></div>
                    <div onClick={() => this.props.history.push({ pathname: '/mycity' })}><span >我的地址</span><span><Icon type="right" /></span></div>
                    <div onClick={() => this.props.history.push({ pathname: '/mycollect' })}><span>我的收藏</span><span><Icon type="right" /></span></div>
                    <div><span>我的客服</span><span><Icon type="right" /></span></div>
                </div>
            </div>
        )
    }
}
