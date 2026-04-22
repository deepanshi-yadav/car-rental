<template>
<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-20">
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Complete Your Booking
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Secure payment for {{ carName }}
        </p>
      </div>
      
      <div class="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 class="text-2xl font-bold text-center mb-8">
          Payment Details
        </h2>

        <!-- BOOKING SUMMARY -->
        <div class="mb-8 p-6 bg-gray-50 rounded-xl">
          <div class="flex items-center mb-4">
            <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <span class="text-2xl">🚗</span>
            </div>
            <div>
              <h3 class="font-bold text-lg">{{ carName }}</h3>
              <p class="text-gray-600">{{ days }} days</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold text-blue-600">
              ₹{{ totalPrice }}
            </p>
          </div>
        </div>

        <!-- CARD FORM -->
        <div class="space-y-4">
          <input 
            v-model="name" 
            placeholder="Card Holder Name" 
            class="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
          <input 
            v-model="cardNumber" 
            placeholder="Card Number" 
            maxlength="19" 
            class="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            @input="formatCardNumber"
          />
          <div class="grid grid-cols-2 gap-4">
            <input 
              v-model="expiry" 
              placeholder="MM/YY" 
              class="border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
            <input 
              v-model="cvv" 
              type="password" 
              placeholder="CVV" 
              class="border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
        </div>

        <button 
          @click="payNow"
          :disabled="loading"
          class="bg-green-600 text-white w-full py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Processing...' : 'Pay Now' }}
        </button>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { ref, computed } from "vue"
import { useToastStore } from '@/stores/toast.js'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const toastStore = useToastStore()
const loading = ref(false)

// Booking data from query params
const carName = ref(route.query.carName || "")
const days = ref(Number(route.query.days) || 1)
const totalPrice = ref(Number(route.query.totalPrice) || 0)
const bookingId = ref(route.query.bookingId || '')

// Card form - consistent vars
const name = ref("")
const cardNumber = ref("")
const expiry = ref("")
const cvv = ref("")

const formatCardNumber = (e) => {
  let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '')
  const formatted = value.match(/.{1,4}/g)?.join(' ') || value
  e.target.value = formatted
  cardNumber.value = formatted
}

const payNow = async () => {
  // Validation
  if (!name.value.trim() || !cardNumber.value.trim() || !expiry.value.trim() || !cvv.value.trim()) {
    toastStore.showToast('Please fill all card details', 'error')
    return
  }
  if (!bookingId.value) {
    toastStore.showToast('No booking ID found. Cannot process payment.', 'error')
    return
  }

  loading.value = true
  try {
    await axios.post('http://localhost:5000/api/payments', {
      bookingId: bookingId.value,
      amount: totalPrice.value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    toastStore.showToast('Payment successful! Booking confirmed.', 'success')
    router.push('/myvehicle')
  } catch (error) {
    console.error('Payment error:', error)
    const msg = error.response?.data?.message || 'Payment failed. Please try again.'
    toastStore.showToast(msg, 'error')
  } finally {
    loading.value = false
  }
}
</script>

