import { Component, Suspense } from 'react'
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom'
import { baseLoading } from './App'
import { getToken } from '@/common/auth'
import { queryUserInfo } from '@/api/user'
import store from '@/store'
import Axios from 'axios'
import { setUserInfo } from '@/store/action/user'
import routes from '@/routes'
import { homePath } from '@/config'

const loginPath = '/login'

function getUserInfo () {
  const state = store.getState()
  return state.user.userInfo
}

class IsInfo extends Component {
  constructor (props) {
    super(props)

    this.state = getUserInfo()

    this.unsubscribe = store.subscribe(() => {
      this.setState(getUserInfo())
    })
  }

  componentDidMount () {
    if (!this.state.hasGetInfo) {
      baseLoading.onShow()
      this.getUserInfo()
        .catch((err) => {
          console.log(err)
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
    this.unsubscribe()
  }

  render () {
    const { hasGetInfo } = this.state
    const { component: Component, routes, ...props } = this.props

    return hasGetInfo ? (<Component {...props}  routes={routes}/>) : null
  }
}

function fadingRoute (route) {
  return function (props) {
    const token = getToken()
    const pathName = props.location.pathname
    if (pathName !== loginPath && !token) {
      return (<Redirect from={pathName} to={loginPath}/>)
    } else if (pathName === loginPath && !token) {
      return (<route.component {...props} routes={route.routes}/>)
    } else if (pathName === loginPath && token) {
      return (<Redirect from={pathName} to={homePath}/>)
    } else {
      return (<IsInfo component={route.component} {...props} routes={route.children}/>)
    }
  }
}

function PrivateRoute ({ ...route }) {
  return (
    <Route exact={route.exact} path={route.path} render={fadingRoute(route)}/>
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

export default class Router extends Component {
  render () {
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
}
