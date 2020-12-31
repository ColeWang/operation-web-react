import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Checkbox, Button } from 'antd'
import OIcon from '@/components/o-icon'
import { login } from '@/api/user'
import { localCache, LOCAL_USERNAME } from '@/common/storage'
import { setToken } from '@/common/auth'
import { homePath } from '@/config'
import './style/login.scss'

class Login extends Component {
  state = {
    // 登录
    username: '',
    password: '',
    // checked
    checked: false,
    // loading
    loading: false,
    // error
    errorInfo: ''
  }

  constructor (props) {
    super(props)

    const username = localCache.get(LOCAL_USERNAME)
    if (username) {
      this.state.username = username
      this.state.checked = true
    }

    this.inputEmit = this.inputEmit.bind(this)
    this.checkedChange = this.checkedChange.bind(this)
    this.onFinish = this.onFinish.bind(this)
  }

  inputEmit (type) {
    return function (evt) {
      this.setState({
        [type]: evt.target.value
      })
    }.bind(this)
  }

  checkedChange (evt) {
    this.setState({
      checked: evt.target.checked
    })
  }

  onFinish () {
    if (!this.state.loading) {
      this.setState({
        loading: true
      }, () => {
        const _data = {
          username: this.state.username,
          password: this.state.password,
        }
        this.onLogin(_data)
      })
    }
  }

  onLogin (data) {
    login(data)
      .then((res) => {
        if (res.actionResult === '1') {
          if (res.data.token) {
            if (this.state.checked) {
              localCache.set(LOCAL_USERNAME, this.state.username)
            } else {
              localCache.remove(LOCAL_USERNAME)
            }
            setToken(res.data.token)
            this.setState({
              loading: false
            }, () => {
              this.props.history.push(homePath)
            })
          }
        } else {
          this.setState({
            errorInfo: res.message
          })
        }
      })
      .catch(() => {
        this.setState({
          loading: false,
          errorInfo: '网络错误！'
        })
      })
  }

  render () {
    const { state } = this

    const usernameBox = (<OIcon type="icondenglu-xuanzhong"/>)
    const passwordBox = (<OIcon type="icondenglu-mima"/>)
    const usernameRules = [
      { required: true, message: '账号不能为空' }
    ]
    const passwordRules = [
      { required: true, message: '密码不能为空' }
    ]
    return (
      <div className="login">
        <div className="login-con">
          <div className="title">
            <p>欢迎登陆</p>
          </div>
          <div className="form-con">
            <Form onFinish={this.onFinish}>
              <Form.Item name="username" rules={usernameRules} initialValue={state.username}>
                <Input
                  placeholder="请输入用户名"
                  value={state.username}
                  onChange={this.inputEmit('username')}
                  addonBefore={usernameBox}
                />
              </Form.Item>
              <Form.Item name="password" rules={passwordRules} initialValue={state.password}>
                <Input.Password
                  placeholder="请输入密码"
                  value={state.password}
                  onChange={this.inputEmit('password')}
                  addonBefore={passwordBox}
                />
              </Form.Item>
              <div className="checked-con">
                <Checkbox checked={state.checked} onChange={this.checkedChange}>记住账号</Checkbox>
                <a href="http://www.baidu.com" rel="noopener noreferrer" target="_blank">忘记密码</a>
              </div>
              <Form.Item validateStatus="error" help={state.errorInfo}>
                <Button type="primary" htmlType="submit" loading={state.loading} block>登录</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="footer-wrap">
          <p>copyright@2019&nbsp;XX科技&nbsp;All&nbsp;Rights&nbsp;Reserved</p>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
