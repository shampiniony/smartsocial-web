<template>
  <div ref="buttonRef" @click="handleClick" :class='{ "fixed": !drawer.visible }'
    class='px-5 sm:fixed py-2 text-white bg-primary bottom-[125px] left-1/2 transform -translate-x-1/2 rounded-full cursor-pointer z-50 user-select-none'>
    <div v-if='!drawer.visible' class='flex gap-2'>
      <p class="user-select-none">Карта</p>
      <img src='@/assets/icons/map.svg' alt=''>
    </div>
    <div v-else class='flex gap-2'>
      <p class="user-select-none">Показать список</p>
      <img src='@/assets/icons/external-link.svg' alt=''>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { drawer } from '@/store/drawer.store';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const handleClick = () => {
  drawer.visible = !drawer.visible;
  scrollToTop();
}
</script>

<style scoped>
.user-select-none {
  user-select: none;
}
</style>
