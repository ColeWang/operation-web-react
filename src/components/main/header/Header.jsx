import { Component } from 'react'
import OIcon from '@/components/o-icon'
import './style/header.scss'

export default class Header extends Component {
  constructor (props) {
    super(props)

    this.handleInline = this.handleInline.bind(this)
  }

  handleInline () {
    this.props.setInlineStatus(!this.props.inlineStatus)
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
          {JSON.stringify(props.inlineStatus)}
        </div>
      </div>
    )
  }
}
