import LoginForm from './LoginForm'
import './style/login.scss'

function Login () {
  return (
    <div className="login">
      <div className="login-con">
        <div className="title">
          <p>欢迎登陆</p>
        </div>
        <div className="form-con">
          <LoginForm/>
        </div>
      </div>
      <div className="footer-wrap">
        <p>copyright@2019&nbsp;XX科技&nbsp;All&nbsp;Rights&nbsp;Reserved</p>
      </div>
    </div>
  )
}

export default Login
