<template>
  <div class='flex'>
    <AdminHeader />
    <router-view />
  </div>
</template>

<script setup>
import AdminHeader from '@/components/admin-header.vue';
</script>