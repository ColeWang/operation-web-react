import { Component } from 'react'
import { LOCAL_USERNAME, localCache } from '@/common/storage'
import { login } from '@/api/user'
import { setToken } from '@/common/auth'
import { homePath } from '@/config'
import OIcon from '@/components/o-icon'
import { Button, Checkbox, Form, Input } from 'antd'
import { withRouter } from 'react-router-dom'

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
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

    const username = localCache.get(LOCAL_USERNAME)
    if (username) {
      this.state.username = username
      this.state.checked = true
    }

    this.saveFormData = this.saveFormData.bind(this)
    this.checkedChange = this.checkedChange.bind(this)
    this.onFinish = this.onFinish.bind(this)
  }

  saveFormData (type) {
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
        this.submit(_data)
      })
    }
  }

  submit (data) {
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
            loading: false,
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

    const usernameRules = [
      { required: true, message: '账号不能为空' }
    ]
    const passwordRules = [
      { required: true, message: '密码不能为空' }
    ]

    const usernameIcon = (<OIcon type="icondenglu-xuanzhong"/>)
    const passwordIcon = (<OIcon type="icondenglu-mima"/>)

    const usernameInputProps = {
      placeholder: '请输入用户名',
      value: state.username,
      onChange: this.saveFormData('username'),
      addonBefore: usernameIcon
    }
    const passwordInputProps = {
      placeholder: '请输入密码',
      value: state.password,
      onChange: this.saveFormData('password'),
      addonBefore: passwordIcon
    }

    const checkedProps = {
      checked: state.checked,
      onChange: this.checkedChange
    }

    return (
      <Form onFinish={this.onFinish}>
        <Form.Item name="username" rules={usernameRules} initialValue={state.username}>
          <Input {...usernameInputProps}/>
        </Form.Item>
        <Form.Item name="password" rules={passwordRules} initialValue={state.password}>
          <Input.Password {...passwordInputProps}/>
        </Form.Item>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <Checkbox {...checkedProps}>记住账号</Checkbox>
          <a href="http://www.baidu.com" rel="noopener noreferrer" target="_blank">忘记密码</a>
        </div>
        <Form.Item validateStatus="error" help={state.errorInfo}>
          <Button type="primary" htmlType="submit" loading={state.loading} block>登录</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default withRouter(LoginForm)
