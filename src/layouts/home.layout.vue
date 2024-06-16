<template>
  <Header />
  <router-view />
  <Sheet />
</template>

<script setup lang="ts">
import Header from '@/components/header.vue'
import Sheet from '@/models/cart/cart-sheet.vue'
</script>