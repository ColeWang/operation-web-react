import { Component, Suspense } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { SuspenseLoading, createRoute } from '@/Router'
import { getRouteList } from '@/components/main/util'
import { mainRoutes } from '@/routes'
import { connect } from 'react-redux'

export default connect(
  (state) => ({
    access: state.user.userInfo.access
  })
)(class Router extends Component {
  constructor (props) {
    super(props)

    this.state = {
      routeList: getRouteList(mainRoutes, props.access)
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
})
