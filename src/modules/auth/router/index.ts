// Composables
import { BreadscrumbMeta } from '@/interface/breadscrumb.type'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('@/layouts/Auth.vue'),
    children: [
      {
        path: '',
        name: 'Auth',
        component: () => import(/* webpackChunkName: "home" */ '@modules/auth/views/Auth.vue'),
        meta: {}
      },
      {
        path: 'import',
        name: 'AuthImport',
        component: () => import(/* webpackChunkName: "home" */ '@modules/auth/views/Import.vue'),
        meta: {}
      },
      {
        path: 'create',
        name: 'AuthCreate',
        component: () => import(/* webpackChunkName: "home" */ '@modules/auth/views/Create.vue'),
        meta: {}
      }
    ]
  }
]

export default routes
