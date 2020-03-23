import React, { Component } from 'react'
import Header from "../header/Header.js"
import { connect } from "react-redux"
import {default_action} from "../../store/store.js"
class Mycity extends Component {
    render() {
        return (
            <div className="city">
                <Header left={<span onClick={() => this.props.history.push({ pathname: '/home/my' })}>&lt;</span>} center="我的收获地址"></Header>
                <div className="content">
                    {
                        this.props.citydata.length > 0 ?
                            this.props.citydata.map(item => {
                                return (
                                    <div key={item.id} onClick={()=> this.props.default_action(item)}>
                                        <p className="p">{item.address} {this.props.defaultcityid === item.id ? <span className="bacdef">默认地址</span> :""}</p>
                                        <p className="p">{item.name}  {item.sex}<button onClick={() => this.props.history.push({ pathname: '/changecity', state:{data:item} })}>编辑</button></p>
                                        <p>{item.phone}</p>
                                    </div>
                                )
                            })
                            : <div style={{ textAlign: "center", padding: "40px" }}>没有添加收货地址!</div>
                    }
                </div>
                <div className="addcity" onClick={() => this.props.history.push({ pathname: '/addcity' })}>
                    新增收货地址
                </div>
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            citydata: state.citydata,
            defaultcityid:state.defaultcityid
        }
    },
    (dispathch) => {
        return {
            default_action:(item)=>{
                dispathch(default_action(item))
            }
        }
    }
)(Mycity)