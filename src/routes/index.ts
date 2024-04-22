import { RouteRecordRaw } from 'vue-router'

const auth = useAuth()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        beforeEnter: (to, from, next) => {
          if (!auth.walletAccount.value) {
            next({ name: 'Auth' })
          } else {
            next()
          }
        },
        component: () => import(/* webpackChunkName: "home" */ '@modules/home/views/Home.vue')
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "home" */ '@modules/home/views/Setting.vue')
      },
      {
        path: '/*',
        name: 'NotFound',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@components/base/PageStatus/404.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'NotFound',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@components/base/PageStatus/404.vue')
      }
    ]
  }
]

export default routes
