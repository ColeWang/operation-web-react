import { Component, Suspense } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { SuspenseLoading, createRoute } from '@/router'
import { getRouteList } from '@/components/main/util'
import { routeMenu } from '@/routes'

const routeList = getRouteList(routeMenu, [])

export default class Router extends Component {
  render () {
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
