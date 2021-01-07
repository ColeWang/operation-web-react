import { Component, Suspense } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { SuspenseLoading, createRoute } from '@/router'
import { getRouteList } from '@/components/main/util'
import { mainRoutes } from '@/routes'
import store from '@/store'

export default class Router extends Component {
  render () {
    const storeState = store.getState()
    const access = storeState.user.userInfo.access
    const routeList = getRouteList(mainRoutes, access)

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
