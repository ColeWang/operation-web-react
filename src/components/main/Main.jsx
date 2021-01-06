import { Component } from 'react'
import MainHeader from './header'
import MainSide from './side'
import MainContent from './content'
import observer from '@/common/observer'
import { getMenuList } from './util'
import './style/main.scss'

export const ALTER_INLINE_STATUS = Symbol()

export default class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inlineStatus: false,
      menuList: getMenuList(props.routes, [])
    }

    this.setInlineStatus = this.setInlineStatus.bind(this)
    observer.addListener(ALTER_INLINE_STATUS, this.setInlineStatus)
  }

  setInlineStatus (value) {
    this.setState({
      inlineStatus: value
    })
  }

  componentWillUnmount () {
    observer.removeListener(ALTER_INLINE_STATUS, this.setInlineStatus)
  }

  render () {
    const { state } = this
    const { routes } = this.props

    return (
      <div className="main">
        <MainSide menuList={state.menuList} inlineStatus={state.inlineStatus}/>
        <div className="prime">
          <MainHeader inlineStatus={state.inlineStatus}/>
          <div className="content">
            <MainContent routes={routes}/>
          </div>
        </div>
      </div>
    )
  }
}
