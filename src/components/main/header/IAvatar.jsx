import { Component } from 'react'
import { Avatar, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { removeToken } from '@/common/auth'
import './style/iAvatar.scss'

class IAvatar extends Component {
  constructor (props) {
    super(props)

    this.handleLogOut = this.handleLogOut.bind(this)
  }

  handleLogOut () {
    removeToken()
    this.props.history.push('/login')
  }

  render () {
    const menu = (
      <div className="card">
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
      <div className="avatar">
        <Dropdown {...dropdownProps}>
          <div className="avatar-con">
            <Avatar icon={icon}/>
          </div>
        </Dropdown>
      </div>
    )
  }
}

export default withRouter(IAvatar)
