import React, { Component } from 'react'
import logo from './logo.png'

export default class App extends Component {
  render() {
    return (
      <div>
        hello, world!
        <img src={logo} alt="logo" />

        <i className="iconfont icon-juejin" />
      </div>
    )
  }
}
