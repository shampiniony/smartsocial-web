<template>
  <div class="flex justify-center items-center min-h-screen bg-white w-[100%]">
    <div class="bg-white mt-5 p-8 rounded w-full max-w-lg mx-auto">
      <h2 class="text-2xl font-bold mb-6 text-center">СПИСОК ПОЛЬЗОВАТЕЛЕЙ</h2>
      <ul v-if="users.length > 0" class="list-disc pl-5">
        <li v-for="user in users" :key="user.id" class="mb-2">
          {{ user.last_name }} {{ user.first_name }} {{ user.middle_name }} - {{ user.email }} - {{ user.phone_number }}
        </li>
      </ul>
      <p v-else>Пользователи не найдены</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUsers } from '@/api/userslist.api';

const users = ref([]);

onMounted(async () => {
  try {
    const fetchedUsers = await getUsers();
    users.value = fetchedUsers;
    console.log('Fetched users:', users.value);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});
</script>

<style scoped>
.bg-logo-blue {
  background-color: #6193b1;
}
</style>
