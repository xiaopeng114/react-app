import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div className={`header ${this.props.bac === "bac" ? "bac" :"white "}`}>
                <span>{this.props.left}</span>
                <span>{this.props.center}</span>
                <span>{this.right}</span>
            </div>
        )
    }
}
