// import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { filter, forEach, union } from 'lodash-es'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMainStore = defineStore('main', {
  // a function that returns a fresh state
  state: () => ({
    lang: 'en',
    locales: {
      en: {},
      vi: {}
    },
    popup: []
  }),
  // optional getters
  getters: {
    //
  },
  // optional actions
  actions: {
    setLanguage(lang: string): void {
      // Cookies.set('lang', lang)
      this.lang = lang
    },
    async initialLanguagePack(): Promise<void> {
      //
    },
    setPopupState(isOpen: boolean, popupName: string) {
      if (isOpen) {
        this.popup = union(this.popup, [popupName])
      } else {
        this.popup = filter(this.popup, value => {
          return value !== popupName
        })
      }
    }
  }
})
