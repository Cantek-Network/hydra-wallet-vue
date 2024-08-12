import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@modules/home/views/Home.vue'),
        beforeEnter: (to, from, next) => {
          const { currentWallet } = useAuthV2()
          console.log('Router: walletAccount:', currentWallet)
          if (!currentWallet) {
            console.log('redirect to auth')
            next({ name: 'Auth' })
          } else {
            console.log('Next to home')
            next()
          }
        }
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
