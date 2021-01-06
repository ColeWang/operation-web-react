import { Component, Suspense } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { SuspenseLoading, createRoute } from '@/router'
import { getRouteList } from '@/components/main/util'
import store from '@/store'

export default class Router extends Component {
  render () {
    const { routes } = this.props
    const storeState = store.getState()
    const access = storeState.user.userInfo.access
    const routeList = getRouteList(routes, access)

    return (
      <Suspense fallback={SuspenseLoading}>
        <Switch>
          {createRoute(routeList)}
          <Redirect from="/*" to="/404"/>
        </Switch>
      </Suspense>
    )
  }
}
