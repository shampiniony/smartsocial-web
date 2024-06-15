<template>
  <div class="app-wrapper">
    <component :is="currentHeader" />
    <Sheet />
    <div class="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/header.vue';
import AdminHeader from '@/components/admin-header.vue';
import Sheet from '@/models/cart/cart-sheet.vue';
import Footer from '@/components/footer.vue';

const route = useRoute();

const currentHeader = computed(() => {
  return route.path.startsWith('/admin') ? AdminHeader : Header;
});
</script>
