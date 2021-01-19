import { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import style from './BaseLoading.module.scss'

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
        <div className={style['x-shade']}>
          <div className={style['x-loading-wrapper']}>
            <svg viewBox="25 25 50 50" className={style['circular']}>
              <circle cx="50" cy="50" r="20" fill="none" className={style['path']}/>
            </svg>
          </div>
        </div>
      </CSSTransition>
    )
  }
}
