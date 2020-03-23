import React, { Component } from 'react'
import Header from "../../header/Header.js"
import { connect } from "react-redux"
import { addcity_action } from "../../../store/store.js"
import { Toast } from "antd-mobile"
class Addcity extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            phone: "",
            address: "",
            sex: ""
        }
    }
    baocun = () => {
        if (this.state.name === "" || this.state.phone === "" || this.state.sex === "" || this.state.address === "") {
            Toast.info('姓名/电话/地址，为空！', 1);
        } else {
            Toast.info('保存地址成功', 1);
            this.props.addcity_action(this.state)
            setTimeout(() => {

                
                this.props.history.push({ pathname: '/mycity' })
            }, 500);

        }

    }
    render() {
        return (
            <div className="addcity">
                <Header left={<span onClick={() => this.props.history.push({ pathname: '/mycity' })}>&lt;</span>} center="新增收货地址"></Header>
                <div className="content">
                    <p> <span>联系人</span> <span><input type="text" placeholder="姓名" onChange={(e) => { this.setState({ name: e.target.value }) }} /></span></p>
                    <p><span></span><span><b className={this.state.sex === "男" ? "sex" : ''} onClick={(e) => this.setState({ sex: e.target.innerHTML })}>男</b><b onClick={(e) => this.setState({ sex: e.target.innerHTML })} className={this.state.sex === "女" ? "sex" : ''}>女</b></span></p>
                    <p><span>电话</span><span><input type="text" placeholder="手机号码" onChange={(e) => { this.setState({ phone: e.target.value }) }} /></span></p>
                    <p><span>地址</span><span><input type="text" placeholder="请输入收货地址" onChange={(e) => { this.setState({ address: e.target.value }) }} /></span></p>
                </div>
                <div className="btncity" onClick={() => this.baocun()} >
                    保存收货地址
                    </div>
            </div>
        )
    }
    // this.props.history.push({ pathname: '/mycity' 
}
export default connect(
    (state) => {
        return {

        }
    },
    (dispatch) => {
        return {
            addcity_action: (item) => {
                dispatch(addcity_action(item))
            }
        }
    }
)(Addcity)