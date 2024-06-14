<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{ time: string, isActive: boolean }>()
const emit = defineEmits(['set-active'])

const toggleButton = () => {
  emit('set-active', props.time)
}

watch(() => props.isActive, (newVal) => {
  if (!newVal) {
    isActive.value = false
  }
})

const isActive = ref(props.isActive)

watch(() => props.isActive, (newVal) => {
  isActive.value = newVal
})
</script>

<template>
  <button 
    class="time-picker px-6 py-4 w-28 h-16 border-2 rounded-lg transition-colors"
    :class="{ 'bg-primary/20 border-primary': isActive, 'bg-opacity-0': !isActive }" 
    @click="toggleButton"
  >
    <p class="text-xl">{{ props.time }}</p>
  </button>
</template>
