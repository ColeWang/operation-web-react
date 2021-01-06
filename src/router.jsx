import { Component, Suspense } from 'react'
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom'
import { getToken } from '@/common/auth'
import routes from '@/routes'
import { homePath } from '@/config'

export const loginPath = '/login'

// lazy 懒加载替换元素
export const SuspenseLoading = (<div/>)

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
      return (<route.component {...props} routes={route.routes}/>)
    }
  }
}

function PrivateRoute ({ fadingRoute, ...route }) {
  return (
    <Route exact={route.exact} path={route.path} render={fadingRoute(route)}/>
  )
}

export function createRoute (routes, fadingRoute) {
  return routes.map((route, i) => {
      return (
        <PrivateRoute fadingRoute={fadingRoute} key={i} {...route}/>
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
            {createRoute(routes, fadingRoute)}
          </Switch>
        </Suspense>
      </HashRouter>
    )
  }
}
