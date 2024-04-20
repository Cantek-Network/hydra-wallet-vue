import { StoreDefinition } from 'pinia'
import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'

// import modules
import ModuleAuth from '@modules/auth'
import { LangObjectType } from '@/plugins/i18n.plugin'

export type ModuleInterface = {
  name: string
  stores?: StoreDefinition
  routes?: RouteRecordRaw[]
  components?: Array<{ name: string; component: Component }>
  langs?: LangObjectType
}

const modules: ModuleInterface[] = [ModuleAuth]

export default modules
