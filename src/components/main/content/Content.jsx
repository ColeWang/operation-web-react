import { Component, createRef } from 'react'
import Router from './Router'
import { BackTop } from 'antd'
import style from './Content.module.scss'

export default class Content extends Component {
  constructor (props) {
    super(props)

    this.space = createRef()
    this.setTarget = this.setTarget.bind(this)
  }

  setTarget () {
    return this.space.current
  }

  render () {
    return (
      <div className={style['main-content']}>
        <div className={style['main-content-space']} ref={this.space}>
          <Router/>
        </div>
        <BackTop target={this.setTarget}/>
      </div>
    )
  }
}
