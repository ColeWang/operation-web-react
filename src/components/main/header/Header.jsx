import { Component } from 'react'
import PropTypes from 'prop-types'
import { ALTER_INLINE_STATUS } from '../Main'
import observer from '@/common/observer'
import OIcon from '@/components/o-icon'
import Fullscreen from './Fullscreen'
import Avatar from './Avatar'
import style from './Header.module.scss'

export default class Header extends Component {
  static propTypes = {
    inlineStatus: PropTypes.bool
  }

  static defaultProps = {
    inlineStatus: false
  }

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
      [style['icon']]: true,
      [style['down']]: props.inlineStatus
    }

    return (
      <div className={style['main-header']}>
        <div className={style['header-left']}>
          <div className={style['setting-down']} onClick={this.handleInline}>
            <OIcon className={oIconClass} type="iconcaidan"/>
          </div>
        </div>
        <div className={style['header-right']}>
          <Fullscreen/>
          <Avatar/>
        </div>
      </div>
    )
  }
}
