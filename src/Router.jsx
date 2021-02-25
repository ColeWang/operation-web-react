import { Suspense } from 'react'
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom'
import HasUserInfo, { LOGIN_PATH } from '@/HasUserInfo'
import { getToken } from '@/common/auth'
import { homePath } from '@/config'
import routes from '@/routes'

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
