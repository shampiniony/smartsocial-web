<template>
  <Transition name="expand" mode="out-in">
    <div v-if="drawer.visible" class="bg-primary h-[70vh] expand-content">
      <!-- Your content here -->
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Transition } from 'vue';
import { drawer } from '@/store/drawer'
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
}

.expand-enter-to,
.expand-leave-from {
  height: 70vh;
  /* Adjust this value to match your element's height */
}
</style>
