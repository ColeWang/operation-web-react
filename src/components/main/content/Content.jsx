import { Component, createRef } from 'react'
import Router from './router'
import { BackTop } from 'antd'
import './style/content.scss'

export default class Content extends Component {
  space = createRef()

  setTarget = () => {
    return this.space.current
  }

  render () {
    return (
      <div className="main-content">
        <div className="main-content-space" ref={this.space}>
          <Router/>
        </div>
        <BackTop target={this.setTarget}/>
      </div>
    )
  }
}
