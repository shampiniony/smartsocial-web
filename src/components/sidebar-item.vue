<template>
  <div class="flex items-center space-x-2">
    <img class="w-8 h-8" :src="imgSrc" />
    <transition name="fade">
      <span v-if="isOpen">{{ title }}</span>
    </transition>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  imgSrc: String,
  title: String,
  isOpen: Boolean
})
</script>
