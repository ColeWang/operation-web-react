import { Component, Suspense } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { SuspenseLoading, createRoute } from '@/router'
import { getRouteList } from '@/components/main/util'
import { mainRoutes } from '@/routes'
import store from '@/store'

export default class Router extends Component {
  constructor (props) {
    super(props)
    const storeState = store.getState()
    const access = storeState.user.userInfo.access

    this.state = {
      routeList: getRouteList(mainRoutes, access)
    }
  }

  render () {
    return (
      <Suspense fallback={SuspenseLoading}>
        <Switch>
          {createRoute(this.state.routeList)}
          <Redirect from="/*" to="/404"/>
        </Switch>
      </Suspense>
    )
  }
}
