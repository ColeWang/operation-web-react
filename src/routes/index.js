import { lazy } from 'react'

// 一级路由
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
    component: lazy(() => import('@/components/main'))
  }
]

// Main 二级路由
const routeMenu = [
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

export {
  routeMenu
}

export default routes
