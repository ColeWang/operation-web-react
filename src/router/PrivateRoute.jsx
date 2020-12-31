import { Route, Redirect } from 'react-router-dom'
import { homePath } from '@/config'
import { getToken } from '@/common/auth'

// 登录页
const loginPath = '/login'

function fadingRoute (Component) {
  return function (props) {
    const token = getToken()
    const pathName = props.location.pathname
    if (pathName !== loginPath && !token) {
      return (<Redirect to={loginPath}/>)
    } else if (pathName === loginPath && !token) {
      return (<Component {...props}/>)
    } else if (pathName === loginPath && token) {
      return (<Redirect to={homePath}/>)
    } else {
      return (<Component {...props}/>)
    }
  }
}

function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={fadingRoute(Component)}/>
  )
}

export default PrivateRoute
