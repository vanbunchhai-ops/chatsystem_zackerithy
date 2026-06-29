import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import * as api from '../services/api'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(TOKEN_KEY) || '')
  const user = ref(JSON.parse(localStorage.getItem(USER_KEY) || 'null'))
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => Boolean(token.value))

  function setSession(nextToken, nextUser) {
    token.value = nextToken
    user.value = nextUser
    localStorage.setItem(TOKEN_KEY, nextToken)
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
  }

  function clearSession() {
    token.value = ''
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  async function signup(form) {
    loading.value = true
    error.value = ''
    try {
      const data = await api.signup(form)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function signin(form) {
    loading.value = true
    error.value = ''
    try {
      const data = await api.signin(form)
      setSession(data.token, data.user)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function signout() {
    if (!token.value) {
      clearSession()
      return
    }

    loading.value = true
    error.value = ''
    try {
      await api.signout(token.value)
    } catch (err) {
      error.value = err.message
    } finally {
      clearSession()
      loading.value = false
    }
  }

  async function verifySession() {
    if (!token.value) {
      return false
    }

    try {
      const data = await api.verify(token.value)
      user.value = data.user
      localStorage.setItem(USER_KEY, JSON.stringify(data.user))
      return true
    } catch {
      clearSession()
      return false
    }
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    signup,
    signin,
    signout,
    verifySession,
  }
})