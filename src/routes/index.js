import { lazy } from 'react'
import Main from '@/components/main'

const routes = [
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('@/views/login')),
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/home',
    component: Main,
    children: [
      {
        path: '/home/index',
        exact: true,
        component: lazy(() => import('@/views/home')),
        meta: {
          title: '首页',
          icon: 'iconhome-filling'
        }
      }
    ]
  },
  {
    path: '/alpha-menu',
    component: Main,
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
  },
  {
    path: '/500',
    exact: true,
    component: lazy(() => import('@/views/error-page/500')),
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/404',
    exact: true,
    component: lazy(() => import('@/views/error-page/404')),
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/401',
    exact: true,
    component: lazy(() => import('@/views/error-page/401')),
    meta: {
      hideInMenu: true
    }
  }
]

export default routes
