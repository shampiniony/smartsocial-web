<script setup lang="ts">
import { ref } from 'vue'

const isActive = ref(false)

const toggleButton = () => {
  isActive.value = !isActive.value
}
</script>

<template>
  <button 
    class="time-picker px-6 py-4 border-2 border-black rounded-lg transition-colors"
    :class="{ 'bg-primary text-white': isActive }" 
    @click="toggleButton"
  >
    <p>14:00</p>
  </button>
</template>

<style scoped>
.time-picker {
}
</style>
