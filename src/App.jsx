import { Component, Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from '@/router'
import Main from '@/components/main'

const Login = lazy(() => import('@/views/login'))
const Error500 = lazy(() => import('@/views/error-page/500'))
const Error404 = lazy(() => import('@/views/error-page/404'))
const Error401 = lazy(() => import('@/views/error-page/401'))

const Loading = (<div/>)

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Suspense fallback={Loading}>
          <Switch>
            <PrivateRoute path="/login" component={Login}/>
            <PrivateRoute path="/500" component={Error500}/>
            <PrivateRoute path="/404" component={Error404}/>
            <PrivateRoute path="/401" component={Error401}/>
            <PrivateRoute path="/" component={Main}/>
            <Redirect from="/*" to="/404"/>
          </Switch>
        </Suspense>
      </BrowserRouter>
    )
  }
}
