import { Component } from 'react'
import { default as loading, BaseLoading } from '@/components/base-loading'
import { ConfigProvider } from 'antd'
import Router from '@/Router'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

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

export default class App extends Component {
  render () {
    moment.locale('zh-cn')
    return (
      <ConfigProvider locale={zhCN}>
        <Loading/>
        <Router/>
      </ConfigProvider>
    )
  }
}
