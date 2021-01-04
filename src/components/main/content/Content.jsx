import { Component, lazy, Suspense } from 'react'
import PrivateRoute from '@/router'
import './style/content.scss'
import { Redirect, Switch } from 'react-router-dom'

const Home = lazy(() => import('@/views/home'))
const Level1 = lazy(() => import('@/views/alpha-menu/Level1'))
const Level2 = lazy(() => import('@/views/alpha-menu/Level2'))

// lazy 懒加载替换元素
const SuspenseLoading = (<div/>)

export default class Content extends Component {
  render () {
    return (
      <div className="main-content">
        <div className="main-content-space">
          <Suspense fallback={SuspenseLoading}>
            <Switch>
              <PrivateRoute path="/home" component={Home}/>
              <PrivateRoute path="/alpha-menu/level-1" component={Level1}/>
              <PrivateRoute path="/alpha-menu/level-2" component={Level2}/>
              <Redirect from="/*" to="/404"/>
            </Switch>
          </Suspense>
        </div>
      </div>
    )
  }
}
