import LoginForm from './LoginForm'
import style from './Login.module.scss'

function Login () {
  return (
    <div className={style['login']}>
      <div className={style['login-con']}>
        <div className={style['title']}>
          <p>欢迎登陆</p>
        </div>
        <div className={style['form-con']}>
          <LoginForm/>
        </div>
      </div>
      <div className={style['footer-wrap']}>
        <p>copyright@2019&nbsp;XX科技&nbsp;All&nbsp;Rights&nbsp;Reserved</p>
      </div>
    </div>
  )
}

export default Login
