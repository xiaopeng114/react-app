import React, { Component } from 'react'
import { NavLink, Route, Redirect, Switch } from "react-router-dom"
import Hone from "./hone/Hone.js"
import Order from './Order/Order.js'
import My from './My/My.js'

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="content">
                    <Switch>
                        <Route path="/home/hone" component={Hone}></Route>
                        <Route path="/home/order" component={Order}></Route>
                        <Route path="/home/my" component={My}></Route>
                        <Redirect to="/home/hone"></Redirect>
                    </Switch>
                </div>
                <div className="botton">
                    <NavLink to="/home/hone">首页</NavLink>
                    <NavLink to="/home/order">订单</NavLink>
                    <NavLink to="/home/my">我的</NavLink>
                </div>
            </div>
        )
    }
}
