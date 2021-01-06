import { loginPath, SuspenseLoading, createRoute } from '@/router'
import { getToken } from '@/common/auth'
import { Redirect, Switch } from 'react-router-dom'
import { homePath } from '@/config'
import { canTurnTo, getRouteList } from '@/components/main/util'
import { routeMenu } from '@/routes'
import { Component, Suspense } from 'react'

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
      if (canTurnTo(pathName, routeMenu, [])) {
        return (<route.component {...props} routes={route.routes}/>)
      } else {
        return (<Redirect from={pathName} to="/401"/>)
      }
    }
  }
}

export default class Router extends Component {
  constructor (props) {
    super(props)

    this.state = {
      routeList: getRouteList(routeMenu, [])
    }
  }

  render () {
    const { state } = this

    return (
      <Suspense fallback={SuspenseLoading}>
        <Switch>
          {createRoute(state.routeList, fadingRoute)}
          <Redirect from="/*" to="/404"/>
        </Switch>
      </Suspense>
    )
  }
}
