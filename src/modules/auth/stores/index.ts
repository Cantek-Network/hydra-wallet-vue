import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', () => {
  const auth = ref({
    isLogin: false,
  })

  return { auth }
})

export default useAuthStore
