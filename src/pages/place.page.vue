<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TimeLine from '@/models/place/time-line.vue';
import PlaceInfo from '@/models/place/place-info.vue';
import { IPlace } from '@/models/place/place.interface';

const place = ref<IPlace | null>(null);
const apiUrl = import.meta.env.VITE_API_URL;

const fetchData = async () => {
  try {
    const placeResponse = await axios.get(`${apiUrl}/api/v1/places/`);
    place.value = placeResponse.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="pt-20 z-0 bg-secondary">
    <PlaceInfo v-if="place" 
      :title="place.name" 
      :info="place.description" 
    />
    <TimeLine/>
  </div>
</template>
