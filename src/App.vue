<template>
  <div class="app-wrapper">
    <div :class="{'admin-container': isAdminPath}">
      <component :is="currentHeader" />
      <router-view />
    </div>
    <Sheet v-if="!isAdminPath"/>
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

const isAdminPath = computed(() => {
  return route.path.startsWith('/admin');
});

const currentHeader = computed(() => {
  return isAdminPath.value ? AdminHeader : Header;
});
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: row;
}
</style>
