export const useAuth = () => {
  const auth = ref({
    isLogin: false,
    userData: null as Record<string, any> | null
  })
  const login = (userData: Record<string, any>, token: string) => {
    auth.value.isLogin = true
    auth.value.userData = userData
    // save token to localStorage
    sessionStorage.setItem('token', token)
  }
  const logout = () => {
    // logout logic here
    auth.value.isLogin = false
    auth.value.userData = null
    // remove token from localStorage
    sessionStorage.removeItem('token')
  }
  return { login, logout, auth }
}
