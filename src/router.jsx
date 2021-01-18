import { Component, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom'
import { canTurnTo } from '@/components/main/util'
import { setUserInfo } from '@/store/action/user'
import { queryUserInfo } from '@/api/user'
import { getToken, removeToken } from '@/common/auth'
import { baseLoading } from '@/App'
import { homePath } from '@/config'
import { Modal } from 'antd'
import routes from '@/routes'
import store from '@/store'
import Axios from 'axios'

const LOGIN_PATH = '/login'

class HasUserInfo extends Component {
  static propTypes = {
    component: PropTypes.any,
    path: PropTypes.string.isRequired,
    noHasAccess: PropTypes.bool
  }

  constructor (props) {
    super(props)

    this.state = this.getStateUserInfo()
    this.unsubscribe = store.subscribe(() => {
      this.setState(this.getStateUserInfo())
    })
  }

  componentDidMount () {
    if (!this.state.hasGetInfo) {
      baseLoading.onShow()
      this.getUserInfo()
        .catch((err) => {
          removeToken()
          this.modal = Modal.error({
            title: '错误',
            content: err.message,
            onOk: function () {
              this.props.history.replace(LOGIN_PATH)
            }.bind(this)
          })
        })
        .finally(() => {
          baseLoading.onHide()
        })
    }
  }

  getStateUserInfo () {
    const storeState = store.getState()
    return storeState.user.userInfo
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
            store.dispatch(setUserInfo(data))
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
    this.unsubscribe()
  }

  render () {
    const { hasGetInfo, access } = this.state
    const { component: Component, noHasAccess, path, ...props } = this.props
    if (hasGetInfo) {
      if (noHasAccess || canTurnTo(path, routes, access)) {
        return (<Component {...props}/>)
      } else {
        return (<Redirect from={path} to="/401"/>)
      }
    }
    return null
  }
}

function fadingRoute (route) {
  return function (props) {
    const token = getToken()
    const pathName = props.location.pathname
    if (pathName !== LOGIN_PATH && !token) {
      return (<Redirect from={pathName} to={LOGIN_PATH}/>)
    } else if (pathName === LOGIN_PATH && !token) {
      return (<route.component {...props}/>)
    } else if (pathName === LOGIN_PATH && token) {
      return (<Redirect from={pathName} to={homePath}/>)
    } else {
      const hasUserInfoProps = {
        component: route.component,
        noHasAccess: route.noHasAccess,
        path: route.path,
        ...props
      }
      return (<HasUserInfo {...hasUserInfoProps}/>)
    }
  }
}

function PrivateRoute ({ ...route }) {
  const routeProps = {
    exact: route.exact,
    path: route.path,
    render: fadingRoute(route)
  }
  return (
    <Route {...routeProps}/>
  )
}

// lazy 懒加载替换元素
export const SuspenseLoading = (<div/>)

export function createRoute (routes) {
  return routes.map((route, i) => {
      return (
        <PrivateRoute key={i} {...route}/>
      )
    }
  )
}

export default function Router () {
  return (
    <HashRouter>
      <Suspense fallback={SuspenseLoading}>
        <Switch>
          <Redirect exact from="/" to={homePath}/>
          {createRoute(routes)}
        </Switch>
      </Suspense>
    </HashRouter>
  )
}
