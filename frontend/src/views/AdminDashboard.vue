<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p class="text-gray-600 mt-2">Manage your rental platform</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
          <p class="text-3xl font-bold text-blue-600">{{ stats.totalUsers || 0 }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Vehicles</h3>
          <p class="text-3xl font-bold text-green-600">{{ stats.totalVehicles || 0 }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Bookings</h3>
          <p class="text-3xl font-bold text-indigo-600">{{ stats.totalBookings || 0 }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Available Vehicles</h3>
          <p class="text-3xl font-bold text-yellow-600">{{ stats.availableVehicles || 0 }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Pending Bookings</h3>
          <p class="text-3xl font-bold text-orange-600">{{ stats.pendingBookings || 0 }}</p>
        </div>
      </div>

      <!-- Quick Actions & Recent -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Quick Actions -->
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <router-link to="/admin/vehicles" class="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition">
              <h3 class="font-semibold text-xl mb-2">Manage Vehicles</h3>
              <p>Add, edit or delete vehicles</p>
            </router-link>
            <router-link to="/admin/bookings" class="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition">
              <h3 class="font-semibold text-xl mb-2">Manage Bookings</h3>
              <p>Update status, view all bookings</p>
            </router-link>
            <router-link to="/admin/users" class="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition">
              <h3 class="font-semibold text-xl mb-2">Manage Users</h3>
              <p>View and manage user accounts</p>
            </router-link>
          </div>
        </div>

        <!-- Recent Bookings -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
          <div v-if="recentBookings.length" class="bg-white rounded-xl shadow-md p-6">
            <div v-for="booking in recentBookings.slice(0,3)" :key="booking._id" class="mb-4 p-4 bg-gray-50 rounded-lg">
              <div class="font-semibold">{{ booking.vehicleName }}</div>
              <div class="text-sm text-gray-600">{{ booking.status }}</div>
              <div class="text-sm font-bold text-green-600">₹{{ booking.totalPrice }}</div>
            </div>
          </div>
          <div v-else class="bg-white rounded-xl shadow-md p-6 text-center text-gray-500">
            No recent bookings
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()
const stats = ref({})
const recentBookings = ref([])

const fetchDashboard = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await res.json()
    stats.value = data.stats || {}
    recentBookings.value = data.recentBookings || []
  } catch (err) {
    console.error('Dashboard fetch failed:', err)
  }
}

onMounted(() => {
  if (authStore.user?.role !== 'admin') {
    // Redirect if not admin
    window.location.href = '/'
  }
  fetchDashboard()
})
</script>

