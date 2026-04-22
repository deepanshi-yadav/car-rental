import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isLoggedIn = ref(false)

  const login = (userData, authToken) => {
    user.value = userData
    token.value = authToken
    isLoggedIn.value = true
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', authToken)
    localStorage.setItem('isLoggedIn', 'true')
    
    // Set axios header
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
  }

  const logout = () => {
    user.value = null
    token.value = null
    isLoggedIn.value = false
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('isLoggedIn')
    delete axios.defaults.headers.common['Authorization']
  }

  const init = () => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    const storedLoggedIn = localStorage.getItem('isLoggedIn')
    if (storedUser && storedToken && storedLoggedIn) {
      user.value = JSON.parse(storedUser)
      token.value = storedToken
      isLoggedIn.value = true
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
    }
  }

  return { user, token, isLoggedIn, login, logout, init }
}, {
  persist: true
})

