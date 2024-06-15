<template>
  <RouterLink :to="to" class="flex items-center space-x-4">
    <img class="w-8 h-8" :src="imgSrc" />
    <transition name="fade">
      <span v-if="isOpen">{{ title }}</span>
    </transition>
  </RouterLink>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  imgSrc: String,
  title: String,
  to: String,
  isOpen: Boolean
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
