import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import Home from "../components/home/Home.js"
import Shopping from '../components/shopping/Shopping.js'
import Mycollect from '../components/mycollect/Mycollect.js'
import Mycity from '../components/mycity/Mycity.js'
import Addcity from '../components/mycity/addcity/Addcity.js'
import Changecity from '../components/mycity/Changecity/Changecity.js'
export default class Router extends Component {
    render() {
        return (
            <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/shopping" component={Shopping}></Route>
                <Route path="/mycollect" component={Mycollect}></Route>
                <Route path="/mycity" component={Mycity}></Route>
                <Route path="/addcity" component={Addcity}></Route>
                <Route path="/changecity" component={Changecity}></Route>
                <Redirect to="/home"></Redirect>
            </Switch>
        )
    }
}
