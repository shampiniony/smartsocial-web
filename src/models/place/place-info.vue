<template>
	<div class="w-[98%] lg:w-4/5 max-w-[1400px] mx-auto py-10 ">
		<div class="flex flex-col md:flex-row justify-center gap-x-4 items-center md:items-start mb-4 md:mb-0">
			<img :src="props.place.images[0].src" alt="Музей" class=" md:w-1/2 mb-5 rounded-3xl" />
			<div class="w-full md:w-1/2">
				<div>
					<p class="w-max rounded-xl px-4 py-2 border-2">Музеи</p>
				</div>
				<h1 class="pt-4 text-2xl">{{ props.place.name }}
				</h1>
				<h3 class="text-gray-500 mt-2">{{ props.place.address }}</h3>
				<div class="px-3 py-4 md:px-4 md:py-8 border-2 rounded-3xl mt-4">
					<div class="flex justify-between">
						<h6 class="text-lg">О месте</h6>
						<img :src="arrowUp" alt="Toggle Arrow" class="w-6 cursor-pointer transition-transform duration-300"
							:class="{ 'rotate-180': isTextVisible }" @click="toggleText" />
					</div>
					<p v-if="isTextVisible" class="pt-4 text-gray-500">
						{{ props.place.description }}
					</p>
				</div>
			</div>
		</div>
		<Popover>
			<PopoverTrigger as-child>
				<Button variant="outline" :class="cn(
					'w-[280px] justify-start text-left font-normal',
					!date && 'text-muted-foreground',
				)">
					<CalendarIcon class="mr-2 h-4 w-4" />
					{{ date ? df.format(date.toDate(getLocalTimeZone())) : "Выбрать дату" }}
				</Button>
			</PopoverTrigger>
			<PopoverContent class="w-auto p-0">
				<Calendar :week-starts-on='1' v-model="date" initial-focus />
			</PopoverContent>
		</Popover>
	</div>

	<TimeLine :events='events' />

	<TicketModal />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import arrowUp from '@/assets/icons/arrow-up.svg'
import { getEvents } from '@/api/places.api';
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utils'

import TicketModal from '@/models/place/ticket-modal.vue';

import {
	CalendarDate,
	type DateValue,
	DateFormatter,
	getLocalTimeZone,
} from '@internationalized/date'

import { Place } from '@/types/client/place.interface';
import { Event as IEvent } from '@/types/client/event.interface'
import TimeLine from './time-line.vue';

const isTextVisible = ref(false)
const props = defineProps<{ place: Place }>();
const today = new Date();

const date = ref<DateValue>(new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()));
const events = ref<IEvent[]>([]);

const df = new DateFormatter('en-US', {
	dateStyle: 'long',
})

const toggleText = () => {
	isTextVisible.value = !isTextVisible.value
}

watch(date, async () => {
	events.value = await getEvents(props.place.id, date.value.toDate("Etc/GMT+3")) ?? [];
}, {
	immediate: true
});

</script>