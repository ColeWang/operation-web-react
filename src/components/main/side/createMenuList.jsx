import OIcon from '@/components/o-icon'
import { Menu } from 'antd'
import { showChildren } from '../util'
import SubMenu from './SubMenu'

function createMenuList (list) {
  return list.map((item) => {
    if (item.children && item.children.length === 1) {
      const itemProps = {
        key: item.children[0].path,
        icon: (<OIcon type={item.children[0].icon}/>)
      }
      return (<Menu.Item {...itemProps}>{item.children[0].meta.title}</Menu.Item>)
    } else {
      if (showChildren(item)) {
        const subMenuProps = {
          key: item.path,
          parentItem: item
        }
        return (<SubMenu {...subMenuProps}/>)
      } else {
        const itemProps = {
          key: item.path,
          icon: (<OIcon type={item.icon}/>)
        }
        return (<Menu.Item {...itemProps}>{item.meta.title}</Menu.Item>)
      }
    }
  })
}

export default createMenuList
