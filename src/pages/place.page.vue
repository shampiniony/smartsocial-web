<template>
  <div class="pt-20 z-0 bg-secondary">
    <PlaceInfo v-if="place" :place='place' />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import PlaceInfo from '@/models/place/place-info.vue';
import { Place } from '@/types/client/place.interface';
import { useRoute } from 'vue-router';

const route = useRoute();

const place = ref<Place | null>(null);
import { apiUrl } from '@/router/router';

const fetchData = async () => {
  try {
    const placeResponse = await axios.get(`${apiUrl}/api/v1/places/${route.params.id}/`);
    place.value = placeResponse.data;
    console.log(placeResponse.data)
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>
