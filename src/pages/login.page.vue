<template>
  <div class="flex justify-center items-center h-screen bg-white">
    <div class="bg-white p-8 rounded w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">ЗАХОДИМ</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="username">ЛОГИН</label>
          <input v-model="username" type="text" id="username" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-2" for="password">ПАРОЛЬ</label>
          <input v-model="password" type="password" id="password" class="w-full px-3 py-2 border rounded" required>
        </div>
        <button type="submit" class="w-full bg-logo-blue text-white py-2 rounded">КНОПКА</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = () => {
  router.push('/admin');
};
</script>

<style scoped>
.bg-logo-blue {
  background-color: #6193b1; /* вроде тот цвет im not sure */
}
</style>
