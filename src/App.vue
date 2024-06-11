<template>
  <Header></Header>
  <div class='px-5 pt-20 z-0'>
    <LeadingSection></LeadingSection>
    <DatePicker></DatePicker>
    <PlacesSection></PlacesSection>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import LeadingSection from '@/components/LeadingSection.vue'
import PlacesSection from '@/components/PlacesSection.vue'
import DatePicker from '@/components/DatePicker.vue'
</script>