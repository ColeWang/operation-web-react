import { Component } from 'react'
import createMenuList from './createMenuList'
import OIcon from '@/components/o-icon'
import { Menu } from 'antd'

export default class SubMenu extends Component {
  render () {
    const { parentItem, ...rest } = this.props

    const sunMenuProps = {
      key: parentItem.path,
      icon: (<OIcon type={parentItem.icon}/>),
      title: parentItem.meta.title,
      ...rest
    }
    return (
      <Menu.SubMenu {...sunMenuProps}>
        {createMenuList(parentItem.children)}
      </Menu.SubMenu>
    )
  }
}
