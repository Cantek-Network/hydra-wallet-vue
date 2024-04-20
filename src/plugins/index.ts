/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue'

// Plugins
// import { loadFonts } from './webfontloader'
import i18n, { availableLangs } from './i18n.plugin'

// Router
// Pinia
import pinia from '../stores'
import routes from '../routes'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

// Modules
// register modules
import modules from '@modules/index'

export function registerPlugins(app: App) {
  let moduleRoutes: RouteRecordRaw[] = []
  modules.forEach(module => {
    module.components?.forEach(el => app.component(el.name, el.component))
    moduleRoutes = [...moduleRoutes, ...(module.routes ? module.routes : [])]

    availableLangs.forEach(lang => {
      const moduleLangObj = module?.langs
      i18n.global.messages.value[lang] = { ...i18n.global.messages.value[lang], ...(moduleLangObj ? { [module.name]: moduleLangObj[lang] } : {}) }
    })
  })

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [...routes, ...moduleRoutes]
  })
  if (import.meta.env.NODE_ENV !== 'production') {
    console.log(modules)
    console.log(i18n.global.messages.value)
  }
  app.use(i18n)
  app.use(router)
  app.use(pinia)
}
