<template>
  <div v-if="show" class="fixed top-4 right-4 z-50 animate-in slide-in-from-right fade-in duration-300">
    <div :class="type === 'error' ? 'bg-red-500' : 'bg-green-500' " 
         class="p-4 rounded-lg shadow-xl text-white max-w-sm">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: Boolean,
  message: String,
  type: {
    type: String,
    default: 'success'
  }
})
</script>

