<template>
  <div class='pt-20 z-0 min-h-screen'>
    <LeadingSection></LeadingSection>
    <DatePicker></DatePicker>
    <MapContainer />
    <PlacesSection></PlacesSection>
  </div>
  <FixedButton />
</template>

<script setup lang='ts'>
import LeadingSection from '@/models/home/loading-section.vue'
import PlacesSection from '@/models/home/places-section.vue'
import DatePicker from '@/models/home/date-picker.vue'
import FixedButton from '@/models/home/fixed-button.vue'
import MapContainer from '@/models/home/map-container.vue'
</script>