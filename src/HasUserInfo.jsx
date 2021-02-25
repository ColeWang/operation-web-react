import { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { canTurnTo } from '@/components/main/util'
import { setUserInfo } from '@/store/action/user'
import { queryUserInfo } from '@/api/user'
import { removeToken } from '@/common/auth'
import { baseLoading } from '@/App'
import { Modal } from 'antd'
import routes from '@/routes'
import Axios from 'axios'

export const LOGIN_PATH = '/login'

export default connect(
  (state) => ({
    userInfo: state.user.userInfo
  }),
  {
    setUserInfo: (data) => setUserInfo(data)
  }
)(class HasUserInfo extends Component {
  static propTypes = {
    component: PropTypes.any,
    path: PropTypes.string.isRequired,
    noHasAccess: PropTypes.bool
  }

  componentDidMount () {
    if (!this.props.userInfo.hasGetInfo) {
      baseLoading.onShow()
      this.getUserInfo()
        .catch((err) => {
          removeToken()
          this.modal = Modal.error({
            title: '错误',
            content: err.message,
            onOk: () => {
              this.props.history.replace(LOGIN_PATH)
            }
          })
        })
        .finally(() => {
          baseLoading.onHide()
        })
    }
  }

  getUserInfo () {
    return new Promise((resolve, reject) => {
      Axios.all([queryUserInfo()])
        .then(Axios.spread((info) => {
          if (info.actionResult === '1') {
            const data = {
              hasGetInfo: true,
              access: []
            }
            this.props.setUserInfo(data)
            resolve(data)
          } else {
            reject(new Error(info.message))
          }
        }))
        .catch((err) => {
          reject(err)
        })
    })
  }

  componentWillUnmount () {
    this.modal && this.modal.destroy()
  }

  render () {
    const { component: Component, userInfo, noHasAccess, path, ...props } = this.props
    if (userInfo.hasGetInfo) {
      if (noHasAccess || canTurnTo(path, routes, userInfo.access)) {
        return (<Component {...props}/>)
      } else {
        return (<Redirect from={path} to="/401"/>)
      }
    }
    return null
  }
})
