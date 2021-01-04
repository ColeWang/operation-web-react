/**
 * meta: {
 *  title: 导航栏title
 *  icon: 导航栏icon
 *  access: (null) 可访问该页面的权限数组 当前路由设置的权限会影响子路由
 * }
 */

const routeMenu = [
  {
    path: '/home',
    meta: {
      title: '首页',
      icon: 'iconhome-filling'
    }
  },
  {
    path: '/alpha-menu',
    meta: {
      title: '多级菜单',
      icon: 'iconhome-filling'
    },
    children: [
      {
        path: '/alpha-menu/level-1',
        meta: {
          title: 'level-1',
          icon: 'iconhome-filling'
        }
      },
      {
        path: '/alpha-menu/level-2',
        meta: {
          title: 'level-2',
          icon: 'iconhome-filling'
        }
      }
    ]
  }
]

export default routeMenu
