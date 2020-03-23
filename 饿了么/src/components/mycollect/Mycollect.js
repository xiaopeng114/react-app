import React, { Component } from 'react'
import Header from "../header/Header.js"
import { connect } from "react-redux"
class Mycollect extends Component {
    skip = (item) => {
        this.props.history.push({ pathname: '/shopping', state: item })
    }
    render() {
        return (
            <div className="mycollect">
                <Header left={<span onClick={() => this.props.history.go(-1)}>&lt;</span>} center="我的收藏"></Header>
                <div className="content">
                    {
                        this.props.collectdata.length > 0 ? this.props.collectdata.map((item, index) => {
                            return (
                                <dl key={index} onClick={() => this.skip(item)}>
                                    <dt><img src={item.image} alt="" /></dt>
                                    <dd>
                                        <p><b>{item.name}</b></p>
                                        <p>月售：{item.sales}</p>
                                        <p className="km"><span>起送：￥{item.price}</span><span>{item.km}km</span></p>
                                    </dd>
                                </dl>
                            )
                        }) : <div style={{textAlign:"center",padding:"10px"}}>没有收藏的店铺!!</div>
                    }
                </div>
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            collectdata: state.collectdata
        }
    },
    (dispatch) => {
        return {

        }
    }
)(Mycollect)