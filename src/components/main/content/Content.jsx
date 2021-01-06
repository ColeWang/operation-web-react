import React, { Component } from 'react'
import { BackTop } from 'antd'
import './style/content.scss'

export default class Content extends Component {
  constructor (props) {
    super(props)

    this.space = React.createRef()
    this.setTarget = this.setTarget.bind(this)
  }

  setTarget () {
    return this.space.current
  }

  render () {
    return (
      <div className="main-content">
        <div className="main-content-space" ref={this.space}>

        </div>
        <BackTop target={this.setTarget}/>
      </div>
    )
  }
}
