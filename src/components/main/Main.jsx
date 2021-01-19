import { Component } from 'react'
import MainHeader from './header'
import MainSide from './side'
import MainContent from './content'
import observer from '@/common/observer'
import { getMenuList } from './util'
import { mainRoutes } from '@/routes'
import store from '@/store'
import style from './Main.module.scss'

export const ALTER_INLINE_STATUS = Symbol()

export default class Main extends Component {
  constructor (props) {
    super(props)

    const storeState = store.getState()
    const access = storeState.user.userInfo.access

    this.state = {
      inlineStatus: false,
      menuList: getMenuList(mainRoutes, access)
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

    return (
      <div className={style['main']}>
        <MainSide menuList={state.menuList} inlineStatus={state.inlineStatus}/>
        <div className={style['prime']}>
          <MainHeader inlineStatus={state.inlineStatus}/>
          <div className={style['content']}>
            <MainContent/>
          </div>
        </div>
      </div>
    )
  }
}
