import React, { Component } from 'react'
import Header from "../../header/Header.js"
import { Toast } from "antd-mobile"
import {connect} from "react-redux"
import {change_action} from "../../../store/store.js"
 class Changecity extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            phone: "",
            address: "",
            sex: "",
            id: 0
        }
    }
    componentDidMount() {
        this.setState({
            name: this.props.history.location.state.data.name,
            phone: this.props.history.location.state.data.phone,
            address: this.props.history.location.state.data.address,
            sex: this.props.history.location.state.data.sex,
            id: this.props.history.location.state.data.id
        })
    }
    add = () => {
        console.log(this.state)

        if (this.state.name === "" || this.state.phone === "" || this.state.sex === "" || this.state.address === "") {
            Toast.info('姓名/电话/地址，为空！', 1);
        } else {
            Toast.info('修改地址成功', 1);
            this.props.change_action(this.state)
            setTimeout(() => {
                this.props.history.push({ pathname: '/mycity' })
            }, 500);

        }
    }
    render() {
        return (
            <div className="changecity">
                <Header left={<span onClick={() => this.props.history.go(-1)}>&lt;</span>} center="编辑收收货地址"></Header>
                <div className="content">
                    <p> <span>联系人</span> <span><input type="text" placeholder="姓名" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} /></span></p>
                    <p><span></span><span><b className={this.state.sex === "男" ? "sex" : ''} onClick={(e) => this.setState({ sex: e.target.innerHTML })}>男</b><b onClick={(e) => this.setState({ sex: e.target.innerHTML })} className={this.state.sex === "女" ? "sex" : ''}>女</b></span></p>
                    <p><span>电话</span><span><input type="text" placeholder="手机号码" value={this.state.phone} onChange={(e) => { this.setState({ phone: e.target.value }) }} /></span></p>
                    <p><span>地址</span><span><input type="text" placeholder="请输入收货地址" value={this.state.address} onChange={(e) => { this.setState({ address: e.target.value }) }} /></span></p>
                </div>
                <div className="addcity" onClick={() => this.add()}>
                    保存地址
                </div>
            </div>
        )
    }
}

export default connect (
    (state)=>{
        return {

        }
    },
    (dispatch)=>{
        return {
            change_action:(item)=>{
                dispatch(change_action(item))
            }
        }
    }
)(Changecity)