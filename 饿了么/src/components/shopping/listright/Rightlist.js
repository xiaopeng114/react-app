import React, { Component } from 'react'
import { connect } from "react-redux"
import { shoppdata_action } from "../../../store/store.js"
class Rightlist extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    addshopp = (item) => {
        this.props.shoppdata_action(item)
    }
    render() {
        return (
            <div className="rightlistcomponent">
                {console.log(this.props.list.content)}
                {
                    this.props.list.content.map(item => {
                        return (
                            <dl key={item.id}>
                                <dt><img src={item.image} alt="" /></dt>
                                <dd>
                                    <p><b style={{ fontSize: "17px" }}>{item.com}</b></p>
                                    <p className="content_p">{item.text}</p>
                                    <p className="price_p"> <b>￥{item.oneprice}</b><span onClick={() => this.addshopp(item)}>+</span></p>
                                </dd>
                            </dl>
                        )
                    })
                }
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {

        }
    },
    (dispatch) => {
        return {
            shoppdata_action: (item) => {
                dispatch(shoppdata_action(item))
            }
        }
    }
)(Rightlist)