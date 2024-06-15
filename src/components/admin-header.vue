<template>
  <div>
    <div :class="{ 'w-56': isOpen, 'w-20': !isOpen }"
      class="h-screen bg-secondary z-50 transition-all duration-200 ease-in-out flex flex-col items-center relative">
      <div class="mt-10 space-y-8">
        <SidebarItem :imgSrc="calendarIcon" title="Календарь" :isOpen="isOpen" />
        <SidebarItem :imgSrc="scheduleIcon" title="Расписание" :isOpen="isOpen" />
        <SidebarItem :imgSrc="profileIcon" title="Профиль" :isOpen="isOpen" />
        <SidebarItem :imgSrc="plusIcon" title="Добавить" :isOpen="isOpen" />

        <button @click="toggleSidebar"
          class="p-2 rounded-3xl bg-gray-200 absolute right-0 top-0 transform translate-x-1/2">
          <img class="w-6 h-6 rounded-3xl" :src="doubleArrow" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import doubleArrow from '@/assets/icons/double-arrow.svg'
import calendarIcon from '@/assets/icons/calendar.icon.svg'
import scheduleIcon from '@/assets/icons/schedule.icon.svg'
import profileIcon from '@/assets/icons/profile.icon.svg'
import plusIcon from '@/assets/icons/plus.icon.svg'
import SidebarItem from './sidebar-item.vue'

const isOpen = ref(false)

function toggleSidebar() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped></style>
