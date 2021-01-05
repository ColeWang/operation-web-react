import { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
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

    const transitionProps = {
      in: state.visible,
      classNames: 'x-mask',
      timeout: 300,
      unmountOnExit: true
    }

    return (
      <CSSTransition {...transitionProps}>
        <div className="x-shade">
          <div className="x-loading-wrapper">
            <svg viewBox="25 25 50 50" className="circular">
              <circle cx="50" cy="50" r="20" fill="none" className="path"/>
            </svg>
          </div>
        </div>
      </CSSTransition>
    )
  }
}
