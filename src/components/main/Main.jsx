import { Component } from 'react'
import MainHeader from './header'
import MainSide from './side'
import MainContent from './content'
import { getMenuList } from './util'
import routes from '@/routes'
import store from '@/store'
import './style/main.scss'

function getInlineStatus () {
  const state = store.getState()
  return state.mainReducer.inlineStatus
}

export default class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inlineStatus: getInlineStatus(),
      menuList: getMenuList(routes, [])
    }
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        inlineStatus: getInlineStatus()
      })
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    const { state } = this

    return (
      <div className="main">
        <MainSide menuList={state.menuList} inlineStatus={state.inlineStatus}/>
        <div className="prime">
          <MainHeader inlineStatus={state.inlineStatus}/>
          <div className="content">
            <MainContent/>
          </div>
        </div>
      </div>
    )
  }
}
