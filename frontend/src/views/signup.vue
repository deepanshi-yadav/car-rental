<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-8 w-96">
      <h2 class="text-2xl font-bold text-center mb-6">Signup</h2>

      <form @submit.prevent="handleSignup">
        <!-- Name -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="Enter Name"
            class="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter Email"
            class="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        <!-- Phone -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Phone</label>
          <input
            v-model="phone"
            type="tel"
            placeholder="Enter Phone"
            class="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter Password"
            class="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-md transition duration-300"
        >
          Signup
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import { useToastStore } from '@/stores/toast.js'

const authStore = useAuthStore()
const router = useRouter()
const toastStore = useToastStore()

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')

const handleSignup = async () => {
  if (!name.value || !email.value || !password.value) {
toastStore.showToast('Please fill required details', 'error')
    return
  }

  try {
    const res = await axios.post('http://localhost:5000/api/users', {
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value
    })

    authStore.login(res.data.user, res.data.token)
toastStore.showToast('Signup successful', 'success')
    router.push('/')
  } catch (error) {
    toastStore.show(error.response?.data?.message || 'Signup failed', 'error')
  }
}
</script>

