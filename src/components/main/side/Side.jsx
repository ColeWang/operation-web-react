import { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import createMenuList from './createMenuList'
import './style/side.scss'

class Side extends Component {
  static propTypes = {
    menuList: PropTypes.array,
    inlineStatus: PropTypes.bool
  }

  static defaultProps = {
    menuList: [],
    inlineStatus: false
  }

  static getDerivedStateFromProps (props) {
    const { location } = props.history

    if (props.inlineStatus) {
      return {
        setStyle: { width: '77px' },
        selectedKeys: [location.pathname]
      }
    } else {
      return {
        setStyle: { width: '238px' },
        selectedKeys: [location.pathname]
      }
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      setStyle: {},
      selectedKeys: []
    }

    this.onSelect = this.onSelect.bind(this)
  }

  onSelect (params) {
    const { history } = this.props
    if (history.location.pathname !== params.key) {
      history.push(params.key)
    }
  }

  render () {
    const { state, props } = this

    const menuProps = {
      inlineCollapsed: props.inlineStatus,
      selectedKeys: state.selectedKeys,
      onClick: this.onSelect,
      style: state.setStyle,
      theme: 'dark',
      mode: 'inline'
    }

    return (
      <div className="main-side" style={state.setStyle}>
        <div className="side">
          <div className="logo"/>
          <Menu {...menuProps}>
            {createMenuList(props.menuList)}
          </Menu>
        </div>
      </div>
    )
  }
}

export default withRouter(Side)
