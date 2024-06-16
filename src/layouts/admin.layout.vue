<template>
  <div v-if='auth.authenticated' class='flex'>
    <AdminHeader />
    <router-view />
  </div>
  <div v-else class='flex justify-center items-center h-screen w-screen'>
    Please login
  </div>
</template>

<script setup>
import AdminHeader from '@/components/admin-header.vue';
import { auth } from '@/store/auth.store';
</script>