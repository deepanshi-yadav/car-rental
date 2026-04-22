<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900">Manage Vehicles</h1>
          <p class="text-gray-600 mt-2">Add, edit and track vehicle inventory</p>
        </div>
        <button @click="showForm = true" class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">
          + Add New Vehicle
        </button>
      </div>

      <!-- Add/Edit Form Modal -->
      <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">{{ editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle' }}</h2>
            <button @click="cancelForm" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          </div>
          <form @submit.prevent="saveVehicle">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Vehicle Name</label>
                <input v-model="form.name" required class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select v-model="form.type" required class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Type</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="SUV">SUV</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Price per Day (₹)</label>
                <input v-model="form.price" type="number" required min="0" class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea v-model="form.description" rows="3" class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <input v-model="form.stock" type="number" min="1" class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Available</label>
                <input v-model="form.available" type="checkbox" class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
              </div>
            </div>
            <div class="flex gap-3 mt-8">
              <button type="submit" class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700">
                {{ editingVehicle ? 'Update' : 'Add' }} Vehicle
              </button>
              <button @click="cancelForm" type="button" class="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Vehicles Table -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Day</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="vehicle in vehicles" :key="vehicle._id" :class="{'bg-yellow-50': !vehicle.available}">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ vehicle.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ vehicle.type }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">₹{{ vehicle.price }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium text-gray-900">{{ vehicle.stock }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span v-if="vehicle.available" class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Available
                  </span>
                  <span v-else class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Unavailable
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button @click="editVehicle(vehicle)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button @click="deleteVehicle(vehicle._id)" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const vehicles = ref([])
const showForm = ref(false)
const editingVehicle = ref(null)
const form = ref({
  name: '',
  type: '',
  price: 0,
  description: '',
  stock: 1,
  available: true
})

const fetchVehicles = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/admin/vehicles', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    const data = await res.json()
    vehicles.value = data
  } catch (err) {
    console.error('Vehicles fetch failed:', err)
  }
}

const saveVehicle = async () => {
  try {
    const url = editingVehicle.value 
      ? `http://localhost:5000/api/admin/vehicles/${editingVehicle.value._id}`
      : 'http://localhost:5000/api/admin/vehicles'
    
    const method = editingVehicle.value ? 'PUT' : 'POST'
    
    await fetch(url, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(form.value)
    })
    
    showForm.value = false
    editingVehicle.value = null
    form.value = { name: '', type: '', price: 0, description: '', stock: 1, available: true }
    fetchVehicles()
  } catch (err) {
    alert('Save failed: ' + err.message)
  }
}

const editVehicle = (vehicle) => {
  editingVehicle.value = vehicle
  form.value = { ...vehicle }
  showForm.value = true
}

const cancelForm = () => {
  showForm.value = false
  editingVehicle.value = null
  form.value = { name: '', type: '', price: 0, description: '', stock: 1, available: true }
}

const deleteVehicle = async (id) => {
  if (confirm('Delete this vehicle?')) {
    try {
      await fetch(`http://localhost:5000/api/admin/vehicles/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      fetchVehicles()
    } catch (err) {
      alert('Delete failed')
    }
  }
}

onMounted(() => {
  fetchVehicles()
})
</script>

