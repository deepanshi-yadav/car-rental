<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 class="text-3xl font-bold text-center mb-6">Book Your Vehicle</h1>
      <div v-if="!vehicleId" class="text-center">
        <h2 class="text-xl font-bold mb-4">No Vehicle Selected</h2>
        <button @click="goToVehicles" class="bg-black text-white px-5 py-2 rounded">Browse Vehicles</button>
      </div>
      <div v-else>
        <img :src="carImage" class="w-full h-60 object-cover mb-4 rounded" alt="Vehicle" />
        <h2 class="text-2xl font-bold mb-2">{{ carName }}</h2>
        <p class="mb-4">₹{{ carPrice }}/day</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input v-model="pickupDate" type="date" class="border p-3 rounded-lg w-full" />
          <input v-model="returnDate" type="date" class="border p-3 rounded-lg w-full" />
        </div>
        <input v-model="location" placeholder="Pickup Location" class="w-full border p-3 rounded-lg mb-6" />
        <div class="bg-blue-50 p-4 rounded-lg mb-6">
          <p class="font-bold">Rental Days: {{ days }}</p>
          <p class="text-2xl font-bold text-blue-600">Total: ₹{{ totalPrice }}</p>
        </div>
        <button @click="confirmBooking" class="bg-black text-white w-full py-3 rounded-xl font-bold text-lg">
          Confirm & Proceed to Payment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useAuthStore } from '@/stores/auth.js'
import { useToastStore } from '@/stores/toast.js'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()

const vehicleId = route.query.vehicleId
const carName = route.query.name || ""
const carPrice = Number(route.query.price) || 0
const carImage = route.query.image || "https://via.placeholder.com/400x300"

const pickupDate = ref("")
const returnDate = ref("")
const location = ref("")

const days = computed(() => {
  if (!pickupDate.value || !returnDate.value) return 0
  const start = new Date(pickupDate.value)
  const end = new Date(returnDate.value)
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
})

const totalPrice = computed(() => carPrice * days.value)

const goToVehicles = () => router.push("/vehicles")

const confirmBooking = async () => {
  if (!authStore.isLoggedIn) {
toastStore.showToast('Please login first', 'error')
    router.push('/login')
    return
  }
  if (!pickupDate.value || !returnDate.value || !location.value || days.value <= 0) {
toastStore.showToast('Fill valid dates/location', 'error')
    return
  }
  try {
    const res = await axios.post('http://localhost:5000/api/bookings', {
      vehicleId,
      carImage: carImage,
      carName: carName,
      pricePerDay: carPrice,
      days: days.value,
      pickupDate: pickupDate.value,
      pickupTime: '10:00 AM',
      returnDate: returnDate.value,
      returnTime: '6:00 PM',
      location: location.value,
      totalPrice: totalPrice.value
    })
toastStore.showToast('Booking confirmed!', 'success')
    router.push({
      path: "/payment",
      query: {
        bookingId: res.data._id,
        carName,
        days: days.value,
        totalPrice: totalPrice.value
      }
    })
  } catch (error) {
toastStore.showToast(error.response?.data?.message || 'Booking failed', 'error')
  }
}
</script>

