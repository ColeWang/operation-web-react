import { Component, Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { default as loading, BaseLoading } from '@/components/base-loading'
import { ConfigProvider } from 'antd'
import PrivateRoute from '@/router'
import Main from '@/components/main'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

const Login = lazy(() => import('@/views/login'))
const Error500 = lazy(() => import('@/views/error-page/500'))
const Error404 = lazy(() => import('@/views/error-page/404'))
const Error401 = lazy(() => import('@/views/error-page/401'))

/**
 * 全局 loading
 * @type {{
 *   onShow(callback)
 *   onHide(callback)
 *   isVisible()
 * }}
 */
export const baseLoading = {}
const Loading = loading(BaseLoading, baseLoading)

// lazy 懒加载替换元素
const SuspenseLoading = (<div/>)

export default class App extends Component {
  render () {
    moment.locale('zh-cn')
    return (
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Suspense fallback={SuspenseLoading}>
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
        <Loading/>
      </ConfigProvider>
    )
  }
}
