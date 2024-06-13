<template>
  <Header/>
  <Sheet/>
  <router-view />
</template>

<script setup lang="ts">
import Header from '@/components/header.vue';
import Sheet from '@/components/cart-sheet.vue';
</script>
