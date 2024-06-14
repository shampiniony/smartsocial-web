<script setup lang="ts">
import { ref } from 'vue'
import TimePicker from '@/models/place/time-picker.vue'

const times = ['14:00', '15:00', '16:00']

const activeTime = ref<string | null>(null)

const setActiveTime = (time: string) => {
  activeTime.value = time
}
</script>

<template>
  <div class="bg-white pt-5">
    <div class="flex flex-wrap gap-4 w-4/5 max-w-[1400px] mx-auto">
      <TimePicker 
        v-for="(time, index) in times" 
        :key="index" 
        :time="time" 
        :is-active="activeTime === time" 
        @set-active="setActiveTime" 
      />
    </div>
  </div>
</template>
