import { Component, Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from '@/routes'
import { homePath } from "@/config"

const Home = lazy(() => import('@/views/home'))
const Login = lazy(() => import('@/views/login'))
const Error500 = lazy(() => import('@/views/error-page/500'))

const Loading = (<div/>)

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Suspense fallback={Loading}>
          <Switch>
            <PrivateRoute path="/home" component={Home}/>
            <PrivateRoute path="/login" component={Login}/>
            <PrivateRoute path="/500" component={Error500}/>
            <Route path="/" render={() => (<Redirect to={homePath}/>)}/>
            <Redirect from="/*" to="/404"/>
          </Switch>
        </Suspense>
      </BrowserRouter>
    )
  }
}
