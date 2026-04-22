<template>
  <nav class="bg-blue-600 shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">

        <!-- Logo -->
        <router-link to="/" class="text-white text-2xl font-bold">
          🚗 CarRentals
        </router-link>

        <!-- Menu -->
        <div class="flex items-center gap-4">

          <router-link
            to="/"
            class="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
          >
            Home
          </router-link>

          <router-link
            to="/vehicles"
            class="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
          >
            Vehicles
          </router-link>

          <router-link
            to="/my-vehicles"
            class="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
          >
            My Vehicle
          </router-link>

          <router-link
            to="/bookings"
            class="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
          >
            Bookings
          </router-link>

          <!-- ❌ IF NOT LOGGED IN -->
          <template v-if="!isLoggedIn">
            <router-link
              to="/login"
              class="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
            >
              Login
            </router-link>

            <router-link
              to="/signup"
              class="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
            >
              Sign Up
            </router-link>
          </template>

          <!-- ✅ IF LOGGED IN -->
          <template v-else>
            <span class="text-white font-semibold">
              {{ user?.email }} ({{ user?.role || 'user' }})
            </span>
            
            <router-link
              v-if="user?.role === 'admin'"
              to="/admin"
              class="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700"
            >
              Admin
            </router-link>

            <button
              @click="logout"
              class="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </template>


        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const user = ref(JSON.parse(localStorage.getItem("user")))
const isLoggedIn = ref(!!user.value)

const logout = () => {
  localStorage.removeItem("user")
  router.push("/login")
  location.reload() // refresh navbar
}
</script>