import { Component } from 'react'
import { Avatar as AntAvatar, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import OIcon from '@/components/o-icon'
import { withRouter } from 'react-router-dom'
import { removeToken } from '@/common/auth'
import { removeUserInfo } from '@/store/action/user'
import store from '@/store'
import style from './Avatar.module.scss'

class Avatar extends Component {
  constructor (props) {
    super(props)

    this.handleLogOut = this.handleLogOut.bind(this)
  }
  handleLogOut () {
    removeToken()
    store.dispatch(removeUserInfo())
    this.props.history.push('/login')
  }

  render () {
    const menu = (
      <div className={style['card']}>
        <p onClick={this.handleLogOut}>退出登录</p>
      </div>
    )

    const dropdownProps = {
      placement: 'bottomCenter',
      overlay: menu,
      getPopupContainer (el) {
        return el.parentNode
      }
    }

    const icon = (<UserOutlined/>)

    return (
      <div className={style['avatar']}>
        <Dropdown {...dropdownProps}>
          <div className={style['avatar-con']}>
            <AntAvatar icon={icon}/>
            <OIcon className={style['icon']} type="iconarrow-down-filling"/>
          </div>
        </Dropdown>
      </div>
    )
  }
}

export default withRouter(Avatar)
