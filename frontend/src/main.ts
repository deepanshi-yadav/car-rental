import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.ts'
import { useAuthStore } from './stores/auth.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Init auth store after Pinia ready
setTimeout(() => {
  const authStore = useAuthStore()
  authStore.init()
}, 0)
