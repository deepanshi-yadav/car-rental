import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', () => {
  const show = ref(false)
  const message = ref('')
  const type = ref('success')

  const showToast = (msg, toastType = 'success') => {
    message.value = msg
    type.value = toastType
    show.value = true
    setTimeout(() => {
      show.value = false
    }, 4000)
  }

  const showError = (msg) => showToast(msg, 'error')

  return { show, message, type, showToast, showError }
})

