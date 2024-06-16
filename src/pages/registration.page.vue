<template>
  <div class="flex justify-center items-center min-h-screen bg-white w-[100%]">
    <div class="bg-white p-8 rounded w-full max-w-lg mx-auto">
      <h2 class="text-2xl font-bold mb-6 text-center">СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="last_name">ФАМИЛИЯ</label>
          <input v-model="last_name" type="text" id="last_name" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="first_name">ИМЯ</label>
          <input v-model="first_name" type="text" id="first_name" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="middle_name">ОТЧЕСТВО</label>
          <input v-model="middle_name" type="text" id="middle_name" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="place">МЕСТО</label>
          <select v-model="place" id="place" class="w-full px-3 py-2 border rounded" required>
            <option v-for="place in placesList" :key="place.id" :value="place.id">{{ place.name }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="phone_number">ТЕЛЕФОН</label>
          <input v-model="phone_number" type="text" id="phone_number" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="email">EMAIL</label>
          <input v-model="email" type="email" id="email" class="w-full px-3 py-2 border rounded" required>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-2" for="password">ПАРОЛЬ</label>
          <input v-model="password" type="password" id="password" class="w-full px-3 py-2 border rounded" required>
        </div>
        <button type="submit" class="w-full bg-logo-blue text-white py-2 rounded">ДОБАВИТЬ</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '@/api/register.api';
import getPlaces from '@/api/places.api';
import { places } from '@/store/places.store';

const last_name = ref('');
const first_name = ref('');
const middle_name = ref('');
const place = ref(null);
const phone_number = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const placesList = ref([]);

onMounted(async () => {
  try {
    await getPlaces(new Date());
    if (places.all) {
      placesList.value = places.all;
      console.log('Fetched places:', placesList.value);
    } else {
      console.error('Failed to fetch places');
    }
  } catch (error) {
    console.error('Error fetching places:', error);
  }
});

const submitForm = async () => {
  console.log('Form submitted');
  if (validateForm()) {
    const userData = {
      last_name: last_name.value,
      first_name: first_name.value,
      middle_name: middle_name.value,
      place: place.value,
      phone_number: phone_number.value,
      email: email.value,
      password: password.value,
    };

    console.log('Submitting user data:', userData);

    try {
      const response = await registerUser(userData);
      console.log('User registered:', response);
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
    }
  }
};

const validateForm = () => {
  if (!last_name.value || !first_name.value || !middle_name.value || !place.value || !phone_number.value || !email.value || !password.value) {
    alert('Пожалуйста, заполните все поля');
    return false;
  }
  if (!validateEmail(email.value)) {
    alert('Пожалуйста, введите действительный email');
    return false;
  }
  return true;
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
</script>

<style scoped>
.bg-logo-blue {
  background-color: #6193b1;
}
</style>
