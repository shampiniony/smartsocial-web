<template>
  <div class="flex justify-center items-center h-screen bg-white">
    <div class="bg-white p-8 rounded w-full max-w-sm ml-[200px]">
      <h2 class="text-2xl font-bold mb-6 text-center">СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ</h2>
      <form>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="surname">ФАМИЛИЯ</label>
          <input v-model="surname" type="text" id="surname" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-2" for="name">ИМЯ</label>
          <input v-model="name" type="text" id="name" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-8">
          <label class="block text-gray-700 mb-2" for="patronymic">ОТЧЕСТВО</label>
          <input v-model="patronymic" type="text" id="patronymic" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-10">
          <label class="block text-gray-700 mb-2" for="location">МЕСТО</label>
          <input v-model="password" type="password" id="location" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-12">
          <label class="block text-gray-700 mb-2" for="password">ID</label>
          <input v-model="password" type="password" id="password" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-14">
          <label class="block text-gray-700 mb-2" for="password">ТЕЛЕФОН</label>
          <input v-model="password" type="password" id="password" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-16">
          <label class="block text-gray-700 mb-2" for="password">EMAIL</label>
          <input v-model="password" type="password" id="password" class="w-full px-3 py-2 border rounded" required>
        </div>
        <button type="submit" class="w-full bg-logo-blue text-white py-2 rounded">ДОБАВИТЬ</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
</script>

<style scoped>
.bg-logo-blue {
  background-color: #6193b1;
}
</style>