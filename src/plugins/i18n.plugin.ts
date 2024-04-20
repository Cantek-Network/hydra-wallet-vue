import { createI18n } from 'vue-i18n'
import enLocale from '@/utils/langs/en.json'
import viLocale from '@/utils/langs/vi.json'

export const availableLangs = ['vi', 'en'] as const

export type LangType = (typeof availableLangs)[number]
export type LangObjectType = Record<LangType, Record<string, any>>

const messages: LangObjectType = {
  en: enLocale,
  vi: viLocale
}

const i18n = createI18n({
  legacy: false,
  locale: 'vi', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages
})

export default i18n
