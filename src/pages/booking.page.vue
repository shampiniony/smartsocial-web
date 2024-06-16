<template>
  <div class="h-screen w-screen pt-24">
    <div v-for='section in data'>
      <p class='px-5 text-xl'>{{ section.event.name }}</p>
      <div v-for="booking in section.bookings.sort((a, b) => a.id - b.id)" :key="booking.id" class="p-5 cursor-pointer">
        <div class='h-26 w-full border rounded-3xl flex py-5 px-8 gap-2 justify-between items-center'>
          <div class='flex flex-col justify-between'>
            <p>{{ booking.ticket.name }}</p>
            <p class='text-2xl'>
              {{ formatDate(booking.time) }}
            </p>
          </div>
          <Switch :checked='booking.visited' @update:checked='handleToggleBooking(booking.id)' />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBookings, toggleBooking } from '@/api/bookings.api';
import { Booking } from '@/types/client/booking.interface';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Switch from '@/components/ui/switch/Switch.vue';
import { AdminEvent, getEventById } from '@/api/event.api';

const route = useRoute();
const data = ref<{ event: AdminEvent; bookings: Booking[] }[]>([]);

const groupBookingsByEvent = async (bookings: Booking[]): Promise<{ event: AdminEvent; bookings: Booking[] }[]> => {
  const eventMap: Record<number, Booking[]> = bookings.reduce((acc, booking) => {
    if (!acc[booking.event]) {
      acc[booking.event] = [];
    }
    acc[booking.event].push(booking);
    return acc;
  }, {} as Record<number, Booking[]>);

  const groupedBookings = await Promise.all(
    Object.entries(eventMap).map(async ([eventId, bookings]) => {
      const event = await getEventById(Number(eventId));
      return {
        event,
        bookings,
      };
    })
  );

  return groupedBookings.filter(x => x.event != null) as { event: AdminEvent; bookings: Booking[] }[];
}

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const fetchData = async () => {
  try {
    const bookings = await getBookings(route.params.id.toString());
    if (bookings) {
      data.value = await groupBookingsByEvent(bookings);
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
