<template>
<div class="w-80 h-20 bg-white rounded-xl flex overflow-hidden">
    <img class="object-cover w-32" :src="place.images[0].src" alt="">
    <div class="p-2 flex flex-col justify-around">
        <p class="text-sm">
        {{ place.name }}
        </p>
        <p class="text-xs text-muted-foreground">
        {{ place.address }}
        </p>
    </div>
</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Place } from '@/types/client/place.interface';

defineProps<{ place: Place }>();
</script>
