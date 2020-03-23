import React, { Component } from 'react'
// import axios from "axios"
import { Icon } from 'antd-mobile'
import {store,axios_action}　from "../../../store/store"
export default class Hone extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            listclone:[],
            flag: true,
            valueinp: "",
            filterdata: []
        }
    }
    componentDidMount() {
        store.dispatch(axios_action())
       
        this.setState({
            list:  store.getState().list,
            listclone: store.getState().list,
            flag: true
        })
        // axios.get("/get").then(res => {
        //     console.log(res.data.list)
        //     this.setState({
        //         list: res.data.list,
        //         listclone:res.data.list,
        //         flag: true
        //     })

        // })
    }
    // 获取焦点
    focus = () => {
        this.setState({
            flag: false
        })
    }
    // 失去焦点
    blur = () => {
        if (this.state.valueinp === "") {
            this.setState({
                flag: true
            })
        }

    }
    // 模糊搜索
    inc = (e) => {
        this.setState({
            valueinp: e,
            filterdata: this.state.list.filter(item => item.name.includes(e))
        }, () => {
            console.log(this.state.filterdata)
            if (this.state.filterdata.length > 0) {
                this.setState({
                    list: this.state.filterdata
                })
            }
        })
        if(e === "") {
            console.log("空")
            this.setState({
                list: this.state.listclone,
                filterdata:[]

            })
        }


    }
    skip = (item)=>{
        this.props.history.push({pathname: '/shopping',state:item })
    }
    render() {
        return (
            <div className="hone">
                <div className="input">
                    <input type="text" onBlur={() => this.blur()} onFocus={() => this.focus()} onInput={(e) => this.inc(e.target.value)} />
                    {
                        this.state.flag && <div className="pos">
                            <Icon type="search"></Icon>
                            <span>输入商家、商品名称</span>
                        </div>
                    }

                </div>
                <p>猜你喜欢</p>
                <div className="sort">
                    <span>综合排序</span>
                    <span>距离最近</span>
                    <span>销量最高</span>
                    <span>筛选</span>
                </div>
                <div className="content">
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <dl key={index} onClick={()=>this.skip(item)}>
                                    <dt><img src={item.image} alt="" /></dt>
                                    <dd>
                                        <p><b>{item.name}</b></p>
                                        <p>月售：{item.sales}</p>
                                        <p className="km"><span>起送：￥{item.price}</span><span>{item.km}km</span></p>
                                    </dd>
                                </dl>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
