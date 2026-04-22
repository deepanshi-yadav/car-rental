<template>
  <div class="py-12 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4">

      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Our Fleet</h1>
        <p class="text-xl text-gray-600">
          Choose from our premium selection of vehicles
        </p>
      </div>

      <!-- Search -->
      <div class="mb-8">
        <div class="max-w-md mx-auto">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search vehicles..."
            class="w-full px-6 py-4 border rounded-xl"
          />
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-20">
        <p>Loading vehicles...</p>
      </div>

      <!-- No Vehicles -->
      <div v-else-if="filteredVehicles.length === 0" class="text-center py-20">
        <p class="text-xl font-bold">No vehicles found</p>
      </div>

      <!-- Vehicles List -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <div 
          v-for="vehicle in filteredVehicles" 
          :key="vehicle._id"
          class="bg-white rounded-2xl shadow-md overflow-hidden"
        >

          <!-- Image -->
          <img 
            :src="vehicle.images?.[0] || 'https://via.placeholder.com/400x300'"
            class="w-full h-48 object-cover"
          />

          <!-- Details -->
          <div class="p-6">
            <h3 class="text-xl font-bold">{{ vehicle.name }}</h3>
            <p class="text-gray-500 mb-2">{{ vehicle.type }}</p>

            <p class="text-2xl font-bold text-blue-600 mb-4">
              ₹{{ vehicle.price }}/day
            </p>

            <button 
              @click="bookVehicle(vehicle)"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Book Now
            </button>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { useAuthStore } from "@/stores/auth.js"
import { useToastStore } from "@/stores/toast.js"

const vehicles = ref([])
const loading = ref(true)
const searchQuery = ref("")

const authStore = useAuthStore()
const toastStore = useToastStore()
const router = useRouter()

// Fetch vehicles
const fetchVehicles = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/vehicles")
    console.log("VEHICLES:", res.data)
    vehicles.value = res.data
  } catch (err) {
    toastStore.showToast("Error loading vehicles", "error")
    console.log(err)
  } finally {
    loading.value = false
  }
}

// Search filter
const filteredVehicles = computed(() => {
  //if (!searchQuery.value) return vehicles.value
  return vehicles.value.filter(v =>
    v.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Booking navigation
const bookVehicle = (vehicle) => {
  if (!authStore.isLoggedIn) {
    toastStore.showToast("Please login first", "error")
    router.push("/login")
    return
  }

  router.push({
    path: "/bookings",
    query: {
      vehicleId: vehicle._id,
      name: vehicle.name,
      price: vehicle.price,
      image: vehicle.images?.[0] || ""
    }
  })
}

// Load on mount
onMounted(fetchVehicles)
</script>