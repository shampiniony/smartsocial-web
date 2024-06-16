<template>
  <div class="z-50 left-0">
    <div :class="{ 'w-64 pl-[24px] pr-[24px]': isOpen, 'w-20 items-center': !isOpen }"
      class="min-h-screen h-full bg-secondary z-50 transition-all duration-200 ease-in-out flex flex-col relative">
      <div class="mt-2 space-y-8">
        <div @click='router.push("/admin")' class="p-2 flex items-center space-x-4 h-14 mb-10">
          <img class="w-8" :src="logoIcon" />
          <div v-if="isOpen">
            <h3 class="font-semibold">kolomnago</h3>
            <p class="whitespace-nowrap">Афиша Коломны</p>
          </div>
        </div>

        <!-- <div class="flex p-2 space-x-2">
          <img class="w-8" :src="searchIcon" />
          <input v-if="isOpen" v-model="searchQuery" class="border-b-2 w-4/5 bg-secondary no-focus" type="text" />
        </div> -->
        <SidebarItem :imgSrc="calendarIcon" to="/admin/calendar" title="Календарь" :isOpen="isOpen"
          :isActive="isActive('/admin/calendar')" />
        <SidebarItem :imgSrc="scheduleIcon" to="/admin/billing" title="Транзакции" :isOpen="isOpen" :isActive="isActive('/admin/billing')"/>
        <SidebarItem :imgSrc="profileIcon" to="/admin/profile" title="Профиль" :isOpen="isOpen" />
        <SidebarItem :imgSrc="plusIcon" to="/admin/add-event" title="Добавить" :isOpen="isOpen" />

        <button @click="toggleSidebar"
          class="p-2 rounded-3xl bg-gray-200 absolute right-0 top-6 transform translate-x-1/2">
          <img class="w-6 h-6 rounded-3xl" :class="{ 'rotate-180': isOpen }" @click="toggleText" :src="doubleArrow" />
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
import searchIcon from '@/assets/icons/search.icon.svg'
import logoIcon from '@/assets/logo.svg'
import { useRoute, useRouter } from 'vue-router'

const isOpen = ref(false)
const searchQuery = ref('')
const route = useRoute()
const router = useRouter()

function toggleSidebar() {
  isOpen.value = !isOpen.value
}

function isActive(path) {
  return route.path === path
}

</script>

<style scoped>
.no-focus {
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.no-focus:focus {
  outline: none;
  box-shadow: none;
}
</style>
