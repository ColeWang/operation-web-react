import { lazy } from 'react'
import Main from '@/components/main'

/**
 * / 路径下 Main 组件生效 （一级路由不生效）
 * meta: {
 *  title: 导航栏title
 *  icon: 导航栏icon
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  access: (null) 可访问该页面的权限数组 当前路由设置的权限会影响子路由
 * }
 */
const routes = [
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('@/views/login'))
  },
  {
    path: '/500',
    exact: true,
    component: lazy(() => import('@/views/error-page/500'))
  },
  {
    path: '/404',
    exact: true,
    component: lazy(() => import('@/views/error-page/404'))
  },
  {
    path: '/401',
    exact: true,
    component: lazy(() => import('@/views/error-page/401'))
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/home',
        exact: true,
        component: lazy(() => import('@/views/home')),
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
            exact: true,
            component: lazy(() => import('@/views/alpha-menu/Level1')),
            meta: {
              title: 'level-1',
              icon: 'iconhome-filling'
            }
          },
          {
            path: '/alpha-menu/level-2',
            exact: true,
            component: lazy(() => import('@/views/alpha-menu/Level2')),
            meta: {
              title: 'level-2',
              icon: 'iconhome-filling'
            }
          }
        ]
      }
    ]
  }
]

export default routes
