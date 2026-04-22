<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="max-w-5xl mx-auto">

      <h1 class="text-4xl font-bold text-center mb-8">
        My Vehicles
      </h1>

      <!-- NO BOOKING -->
      <div v-if="bookings.length === 0" class="text-center mt-20">
        <h2 class="text-2xl font-bold text-gray-700">
          No Booking Yet
        </h2>
      </div>

      <!-- BOOKINGS LIST -->
      <div v-else class="grid md:grid-cols-2 gap-6">

        <div 
          v-for="booking in bookings" 
          :key="booking._id"
          class="bg-white p-6 rounded-xl shadow"
        >

          <img
            :src="booking.vehicleImage || 'https://via.placeholder.com/400'"
            class="w-full h-48 object-cover rounded mb-4"
          />

          <h2 class="text-xl font-bold">{{ booking.vehicleName }}</h2>

          <p>Days: {{ booking.days }}</p>
          <p>Pickup: {{ booking.pickupDate }}</p>
          <p>Return: {{ booking.returnDate }}</p>
          <p>Location: {{ booking.location }}</p>

          <p class="text-green-600 font-bold mt-2">
            ₹{{ booking.totalPrice }}
          </p>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const bookings = ref([])

onMounted(async () => {
  try {
    const token = localStorage.getItem("token")

    if (!token) {
      console.log("No token found")
      return
    }

    const res = await fetch("http://localhost:5000/api/bookings", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()
    console.log("BOOKINGS:", data)

    bookings.value = data

  } catch (err) {
    console.log("Error fetching bookings", err)
  }
})
</script>