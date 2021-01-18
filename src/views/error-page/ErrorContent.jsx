import { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Button, Space } from 'antd'
import { homePath } from '@/config'
import './style/errorContent.scss'

class ErrorContent extends Component {
  static propTypes = {
    code: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }

  constructor (props) {
    super(props)

    this.timer = null

    this.state = {
      second: 5
    }

    this.backHome = this.backHome.bind(this)
    this.backPrev = this.backPrev.bind(this)
  }

  backHome () {
    this.props.history.replace(homePath)
  }

  backPrev () {
    this.props.history.go(-1)
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      if (this.state.second === 0) {
        this.backPrev()
      } else {
        this.setState({
          second: (this.state.second - 1)
        })
      }
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    const { props, state } = this

    return (
      <div className="error-page">
        <div className="content-con">
          <img src={props.src} alt={props.code}/>
          <div className="text-con">
            <h4>{props.code}</h4>
            <h5>{props.desc}</h5>
          </div>
          <Space className="back-btn-group" size={10}>
            <Button onClick={this.backHome}>返回首页</Button>
            <Button onClick={this.backPrev}>返回上一页({state.second}s)</Button>
          </Space>
        </div>
      </div>
    )
  }
}

export default withRouter(ErrorContent)
