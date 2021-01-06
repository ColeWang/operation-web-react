import { Component } from 'react'
import OIcon from '@/components/o-icon'
import Fullscreen from './Fullscreen'
import Avatar from './Avatar'
import './style/header.scss'
import store from '@/store'
import { setInlineStatus } from '@/store/action/mainAction'

export default class Header extends Component {
  constructor (props) {
    super(props)

    this.handleInline = this.handleInline.bind(this)
  }

  handleInline () {
    store.dispatch(setInlineStatus(!this.props.inlineStatus))
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
          <Fullscreen/>
          <Avatar/>
        </div>
      </div>
    )
  }
}
