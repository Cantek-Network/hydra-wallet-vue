import { RouteLocationRaw } from 'vue-router'

export type BreadscrumbMeta = {
  type: 'i18n' | 'params' | 'query' | 'string'
  value: string
  to?: RouteLocationRaw
}
