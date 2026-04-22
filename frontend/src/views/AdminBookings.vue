<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900">Manage Bookings</h1>
          <p class="text-gray-600 mt-2">View and update all customer bookings</p>
        </div>
      </div>

      <!-- Bookings Table -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="booking in bookings" :key="booking._id">
                <td class="px-6 py-4">
                  <div>{{ booking.userId?.name || 'N/A' }}</div>
                  <div class="text-sm text-gray-500">{{ booking.userId?.email }}</div>
                </td>
                <td class="px-6 py-4 font-medium">
                  {{ booking.vehicleName }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div>{{ booking.pickupDate }} - {{ booking.returnDate }}</div>
                  <div class="text-gray-500">{{ booking.days }} days</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                  ₹{{ booking.totalPrice }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <select v-model="booking.status" @change="updateStatus(booking._id, booking.status)" class="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="paid">Paid</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <span class="text-gray-500">{{ new Date(booking.createdAt).toLocaleDateString() }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="!bookings.length" class="p-12 text-center text-gray-500">
          No bookings found
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bookings = ref([])

const fetchBookings = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/admin/bookings', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    const data = await res.json()
    bookings.value = data
  } catch (err) {
    console.error('Bookings fetch failed:', err)
  }
}

const updateStatus = async (id, status) => {
  try {
    await fetch(`http://localhost:5000/api/admin/bookings/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ status })
    })
    // Refresh list
    fetchBookings()
  } catch (err) {
    alert('Status update failed')
  }
}

onMounted(fetchBookings)
</script>

