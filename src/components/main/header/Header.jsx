import { Component } from 'react'
import { ALTER_INLINE_STATUS } from '../Main'
import observer from '@/common/observer'
import OIcon from '@/components/o-icon'
import IAvatar from './IAvatar'
import './style/header.scss'

export default class Header extends Component {
  constructor (props) {
    super(props)

    this.handleInline = this.handleInline.bind(this)
  }

  handleInline () {
    observer.emit(ALTER_INLINE_STATUS, !this.props.inlineStatus)
  }

  render () {
    const { props } = this

    const oIconClass = {
      'icon': true,
      'down': props.inlineStatus
    }

    return (
      <div className="main-header">
        <div className="header-left">
          <div className="setting-down" onClick={this.handleInline}>
            <OIcon className={oIconClass} type="iconcaidan"/>
          </div>
        </div>
        <div className="header-right">
          <IAvatar/>
        </div>
      </div>
    )
  }
}
