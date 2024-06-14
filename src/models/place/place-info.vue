<script setup lang="ts">
import { ref } from 'vue'
import DatePicker from '@/components/ui/date-picker/date-picker.vue'
import placeImage from '@/assets/place.jpg'
import arrowUp from '@/assets/icons/arrow-up.svg'
import { defineProps } from 'vue';

const isTextVisible = ref(false)
const props = defineProps<{ title: string, info: string }>();

console.log(props)

const toggleText = () => {
  isTextVisible.value = !isTextVisible.value
}
</script>

<template>
	<div class="w-[98%] lg:w-4/5 max-w-[1400px] mx-auto py-10 ">
		<div class="flex flex-col md:flex-row justify-center gap-x-4 items-center md:items-start mb-4 md:mb-0">
			<img :src="placeImage" alt="Музей" class="md:max-w-[500px] md:w-1/2 mb-5 rounded-3xl" />
			<div class="w-full">
				<div>
					<p class="w-max rounded-xl px-4 py-2 border-2">Музеи</p>
				</div>
				<h1 class="pt-4 text-2xl">{{ props.title }}
					<!-- Музей истории со вкусом «Коломенская пастила» -->
				</h1>
				<h3 class="text-gray-500 mt-2">Посадская ул., 13А</h3>
				<div class="px-3 py-4 md:px-4 md:py-8 border-2 rounded-3xl mt-4">
					<div class="flex justify-between">
						<h6 class="text-lg">О месте</h6>
						<img :src="arrowUp" alt="Toggle Arrow" class="w-6 cursor-pointer transition-transform duration-300"
							:class="{ 'rotate-180': isTextVisible }" @click="toggleText" />
					</div>
					<p v-if="isTextVisible" class="pt-4 text-gray-500">
						{{ props.info }}
						<!-- Музей истории со вкусом представляет собой новый тип музея — сохраняющего и предъявляющего нематериальное
						наследие, нечто эфемерное и ускользающее: вкусы, запахи, культуру бытования, манеру говорить... -->
					</p>
				</div>
			</div>
		</div>

		<DatePicker />
	</div>
</template>