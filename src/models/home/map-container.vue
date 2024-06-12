<template>
  <Transition name="expand" mode="out-in">
    <div v-show="drawer.visible" class="bg-primary h-[55vh] expand-content overflow-hidden">
      <div class='h-20 w-20 bg-white fixed bottom-0'>

      </div>
      <Map></Map>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Transition } from 'vue';
import { drawer } from '@/store/drawer.store';
import Map from '@/models/home/map.vue';
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.4s ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
}

.expand-enter-to,
.expand-leave-from {
  height: 55vh;
}
</style>
