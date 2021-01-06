import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import createMenuList from './createMenuList'
import './style/side.scss'

class Side extends Component {
  static getDerivedStateFromProps (props) {
    if (props.inlineStatus) {
      return {
        setStyle: { width: '77px' },
        selectedKeys: [props.history.location.pathname]
      }
    } else {
      return {
        setStyle: { width: '238px' },
        selectedKeys: [props.history.location.pathname]
      }
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      setStyle: { width: '238px' },
      selectedKeys: [],
      openKeys: []
    }

    this.onSelect = this.onSelect.bind(this)
    this.onOpenChange = this.onOpenChange.bind(this)
  }

  onSelect (params) {
    const { history } = this.props
    if (history.location.pathname !== params.key) {
      history.push(params.key)
    }
  }

  onOpenChange (openKeys) {
    this.setState({
      openKeys: openKeys
    })
  }

  render () {
    const { state, props } = this

    const menuProps = {
      inlineCollapsed: props.inlineStatus,
      selectedKeys: state.selectedKeys,
      openKeys: state.openKeys,
      onClick: this.onSelect,
      onOpenChange: this.onOpenChange,
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
