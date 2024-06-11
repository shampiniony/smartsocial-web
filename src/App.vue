<template>
  <Header></Header>
  <div class='pt-20 z-0'>
    <LeadingSection></LeadingSection>
    <DatePicker></DatePicker>
    <Map></Map>
    <PlacesSection></PlacesSection>
  </div>
  <FixedButton />
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import LeadingSection from '@/components/LeadingSection.vue'
import PlacesSection from '@/components/PlacesSection.vue'
import DatePicker from '@/components/DatePicker.vue'
import FixedButton from '@/components/FixedButton.vue'
import Map from '@/components/Map.vue'

</script>