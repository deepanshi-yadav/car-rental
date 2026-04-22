<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

      <h1 class="text-3xl font-bold text-center mb-6">Login</h1>

      <form @submit.prevent="handleLogin">

        <!-- EMAIL -->
        <div class="mb-4">
          <label class="block mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full border p-2 rounded"
            required
          />
        </div>

        <!-- PASSWORD -->
        <div class="mb-4">
          <label class="block mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-black text-white py-2 rounded"
        >
          Login
        </button>

      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from '@/stores/auth.js'
import { useToastStore } from '@/stores/toast.js'
import axios from "axios"

const email = ref("")
const password = ref("")
const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()

const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/users/login", {
      email: email.value,
      password: password.value
    })

    authStore.login(res.data.user, res.data.token)

    toastStore.showToast("Login successful", "success")

    router.push("/vehicles")
  } catch (err) {
    toastStore.showToast(err.response?.data?.message || "Login failed", "error")
    console.log(err)
  }
}
</script>