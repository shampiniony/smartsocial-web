<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TimeLine from '@/models/place/time-line.vue';
import PlaceInfo from '@/models/place/place-info.vue';
import { IPlace } from '@/models/place/place.interface';

const place = ref<IPlace | null>(null);

const fetchData = async () => {
  try {
    const placeResponse = await axios.get('http://192.168.1.99:8000/api/v1/places/1');
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
