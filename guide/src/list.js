import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { add } from './common'

console.log(add(1, 2))

class App extends Component {
  render() {
    return (
      <div>
        list page
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
