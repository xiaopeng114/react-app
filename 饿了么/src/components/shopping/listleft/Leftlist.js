import React, { Component } from 'react'

export default class Leftlist extends Component {
    constructor(){
        super();
        this.state = {
            activeindex:0
        }
    }
    tab = (index)=>{
        this.props.tabind(index)
        this.setState({
            activeindex:index
        })
    }
    render() {
        return (
            <div>
                {
                    // console.log(this.props.list)
                    this.props.list.map((item, index) => {
                        return (
                            <div className={this.state.activeindex === index ? "active" : ""} onClick={()=>this.tab(index)} key={index}>{item.title}</div>
                        )
                    })
                }
            </div>
        )
    }
}
