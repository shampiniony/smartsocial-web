<template>
  <div class="h-screen w-screen pt-20">
    <div v-for="booking in data" :key="booking.id" class="p-5 cursor-pointer" @click="handleToggleBooking(booking.id)">
      {{ booking.event }} {{ booking.visited }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBookings, toggleBooking } from '@/api/bookings.api';
import { Booking } from '@/types/client/booking.interface';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const data = ref<Booking[]>([]);

const fetchData = async () => {
  try {
    const bookings = await getBookings(route.params.id.toString());
    if (bookings) {
      data.value = bookings;
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};

const handleToggleBooking = async (bookingId: number) => {
  try {
    await toggleBooking(bookingId);
    await fetchData();
  } catch (error) {
    console.error("Error toggling booking:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>
