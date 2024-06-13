<template>
  <Transition name="height" mode='out-in'>
    <div v-show='!drawer.visible' class='px-5 py-0 gap-2 overflow-hidden h-16'>
      <h1 class='text-2xl font-medium'>Исследуйте город</h1>
      <p class='font-extralight text-xl'>Выбирайте даты и время для посещения!</p>
    </div>
  </Transition>
</template>

<script setup lang='ts'>
import { Transition } from 'vue';
import { drawer } from '@/store/drawer.store';

</script>

<style scoped>
.height-enter-active,
.height-leave-active {
  transition: height 0.4s ease;
}

.height-enter-from,
.height-leave-to {
  height: 0;
}
</style>
