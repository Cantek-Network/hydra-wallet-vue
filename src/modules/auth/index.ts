import { ModuleInterface } from '..'
import routes from './router'
import stores from './stores'
import langs from './langs'

export default {
  name: 'auth',
  routes,
  stores,
  langs
} as ModuleInterface
