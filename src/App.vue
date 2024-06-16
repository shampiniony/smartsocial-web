<template>
  <div class="app-wrapper">
    <router-view />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '@/components/footer.vue';
</script>