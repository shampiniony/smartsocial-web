<template>
  <Transition name="expand" mode="out-in">
    <div v-if="drawer.visible" class="bg-primary h-[70vh] expand-content overflow-hidden">
      <Map></Map>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Transition } from 'vue';
import { drawer } from '@/store/drawer.ts';
import Map from '@/components/Map.vue';
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
