import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import axios from "axios"

function axios_action() {
    return () => {
        axios.get("/get").then(res => {
            store.dispatch(axiosadd_action(res.data.list))
        })
    }
}
function axiosadd_action(item) {
    return {
        type: "AXIOS",
        item: item
    }
}
function add_action(item) {
    return {
        type: 'ADD',
        item: item
    }
}

function remo_action(item) {
    return {
        type: "REMO",
        item: item
    }
}
function shoppdata_action(item) {
    return {
        type: "SHOPP",
        item: item
    }
}
function subtract_action(item) {
    return {
        type: "SUBTRACT",
        item: item
    }
}
function addcity_action(item) {
    return {
        type: "ADDCITY",
        item: item
    }
}
function change_action(item) {
    return {
        type: "CHANGE",
        item: item
    }
}
function default_action(item) {
    return {
        type: "DEFAULT",
        item: item
    }
}
let data = {
    defaultcityid: localStorage.getItem("defaultcityid") ? JSON.parse(localStorage.getItem("defaultcityid")) : 0,// 默认地址的id
    addid: localStorage.getItem("addid") ? JSON.parse(localStorage.getItem("addid")) : 0,  //记录新增地址数据的最后一个id
    citydata: localStorage.getItem("city") ? JSON.parse(localStorage.getItem("city")) : [], //收货地址
    shoppdata: localStorage.getItem("shopp") ? JSON.parse(localStorage.getItem("shopp")) : [],//购物车数据
    list: localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [], // 商家列表
    collectdata: localStorage.getItem("collectdata") ? JSON.parse(localStorage.getItem("collectdata")) : [] //收藏的店铺
}

function reduce(state = data, action) {
    state = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        // 收藏
        case "ADD":
            let flag = state.collectdata.find(ite => ite.collect === action.item.collect)
            if (!flag) {
                console.log("收藏", action.item)
                state.collectdata.push(action.item)
                localStorage.setItem("collectdata", JSON.stringify(state.collectdata))
            }
            console.log("已收藏", state.collectdata)
            return state
        // 取消收藏
        case "REMO":
            let ind = state.collectdata.findIndex(ite => ite.collect === action.item.collect)
            state.collectdata.splice(ind, 1)
            localStorage.setItem("collectdata", JSON.stringify(state.collectdata))
            return state
        // 异步数据
        case "AXIOS":
            console.log(action.item)
            if (!localStorage.getItem("list")) {
                state.list = action.item
                localStorage.setItem("list", JSON.stringify(action.item))
            }
            return state
        // 加入购物车 购物车加加
        case "SHOPP":
            let shoppflag = state.shoppdata.find(i => i.id === action.item.id)
            if (!shoppflag) {
                action.item.num = 1
                state.shoppdata.push(action.item)
                localStorage.setItem("shopp", JSON.stringify(state.shoppdata))
            } else {
                shoppflag.num++
                localStorage.setItem("shopp", JSON.stringify(state.shoppdata))
            }
            console.log(state.shoppdata)
            return state
        //购物车减减
        case "SUBTRACT":
            let sub = state.shoppdata.find(i => i.id === action.item.id)
            console.log(sub)
            if (sub.num > 1) {
                sub.num--
            } else {
                let subind = state.shoppdata.findIndex(i => i.id === action.item.id)
                state.shoppdata.splice(subind, 1)
            }
            localStorage.setItem("shopp", JSON.stringify(state.shoppdata))
            return state
        // 添加收货地址
        case "ADDCITY":
            action.item.id = state.addid + 1
            console.log(action.item, state.citydata)
            state.citydata.push(action.item)
            localStorage.setItem("city", JSON.stringify(state.citydata))
            state.addid = action.item.id
            localStorage.setItem("addid", JSON.stringify(state.addid))
            return state
        // 编辑
        case "CHANGE":
            let index = state.citydata.findIndex(i => i.id === action.item.id)
            console.log(action.item, index)
            state.citydata.splice(index, 1, action.item)
            localStorage.setItem("city", JSON.stringify(state.citydata))
            return state
        // 默认地址
        case "DEFAULT":
            state.defaultcityid = action.item.id
            localStorage.setItem("defaultcityid",JSON.stringify(state.defaultcityid))
            console.log(state.defaultcityid)
            return state
        default:
            return state
    }
}
let store = createStore(reduce, applyMiddleware(thunk))

export {
    store,
    add_action,
    remo_action,
    axios_action,
    shoppdata_action,
    subtract_action,
    addcity_action,
    change_action,
    default_action
}