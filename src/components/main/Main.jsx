import { Component } from 'react'
import MainHeader from './header'
import MainSide from './side'
import MainContent from './content'
import observer from '@/common/observer'
import { getMenuList } from './util'
import { mainRoutes } from '@/routes'
import { connect } from 'react-redux'
import style from './Main.module.scss'

export const ALTER_INLINE_STATUS = Symbol()

export default connect(
  (state) => ({
    access: state.user.userInfo.access
  })
)(class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inlineStatus: false,
      menuList: getMenuList(mainRoutes, props.access)
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
})
