import React, { Component, lazy, Suspense } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import PrivateRoute from '@/router'
import { BackTop } from 'antd'
import './style/content.scss'

const Home = lazy(() => import('@/views/home'))
const Level1 = lazy(() => import('@/views/alpha-menu/Level1'))
const Level2 = lazy(() => import('@/views/alpha-menu/Level2'))

// lazy 懒加载替换元素
const SuspenseLoading = (<div/>)

// @todo 权限以及路由权限校验

export default class Content extends Component {
  constructor (props) {
    super(props)

    this.space = React.createRef()
    this.setTarget = this.setTarget.bind(this)
  }

  setTarget () {
    return this.space.current
  }

  render () {
    return (
      <div className="main-content">
        <div className="main-content-space" ref={this.space}>
          <Suspense fallback={SuspenseLoading}>
            <Switch>
              <PrivateRoute path="/home" component={Home}/>
              <PrivateRoute path="/alpha-menu/level-1" component={Level1}/>
              <PrivateRoute path="/alpha-menu/level-2" component={Level2}/>
              <Redirect from="/*" to="/404"/>
            </Switch>
          </Suspense>
        </div>
        <BackTop target={this.setTarget}/>
      </div>
    )
  }
}
