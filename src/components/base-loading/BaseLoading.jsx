import { Component } from 'react'
import './style/baseLoading.scss'

export default class BaseLoading extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false
    }
  }

  render () {
    const { state } = this

    return (
      <div className={`x-shade ${state.visible ? 'x-shade-show' : 'x-shade-hide'}`}>
        <div className="x-loading-wrapper">
          <svg viewBox="25 25 50 50" className="circular">
            <circle cx="50" cy="50" r="20" fill="none" className="path"/>
          </svg>
        </div>
      </div>
    )
  }
}
