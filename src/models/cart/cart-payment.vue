<template>
  <form @submit="onSubmit" class='flex flex-col justify-between h-full'>
    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl">Оплата</h1>
        <p class="text-xl cursor-pointer" @click="cart.status = 'contents'">X</p>
      </div>
    </div>
    <div>
      <div class="flex gap-5">
        <FormField name="firstName" v-slot="{ field, errorMessage }">
          <FormItem class="w-full">
            <FormLabel>Имя</FormLabel>
            <FormControl>
              <Input placeholder="Иван" v-bind="field" />
            </FormControl>
            <FormDescription />
            <FormMessage>{{ errorMessage }}</FormMessage>
          </FormItem>
        </FormField>
        <FormField name="lastName" v-slot="{ field, errorMessage }">
          <FormItem class="w-full">
            <FormLabel>Фамилия</FormLabel>
            <FormControl>
              <Input placeholder="Иванов" v-bind="field" />
            </FormControl>
            <FormDescription />
            <FormMessage>{{ errorMessage }}</FormMessage>
          </FormItem>
        </FormField>
      </div>
      <FormField name="email" v-slot="{ field, errorMessage }">
        <FormItem>
          <FormLabel>Электронная Почта</FormLabel>
          <FormControl>
            <Input placeholder="ivanivanov@example.com" v-bind="field" />
          </FormControl>
          <FormDescription />
          <FormMessage>{{ errorMessage }}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="phone" v-slot="{ field, errorMessage }">
        <FormItem>
          <FormLabel>Тел.</FormLabel>
          <FormControl>
            <Input placeholder="+7 800 200 23 16" v-bind="field" />
          </FormControl>
          <FormDescription />
          <FormMessage>{{ errorMessage }}</FormMessage>
        </FormItem>
      </FormField>
    </div>
    <div class="flex flex-col gap-5">
      <div class="flex justify-between items-center">
        <p class="text-lg">Сумма единого билета</p>
        <p class="text-2xl">{{ total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} ₽</p>
      </div>
      <div class="flex justify-end">
        <Button text="Оплатить" type="submit" />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { computed } from 'vue'
import { createPayment } from '@/api/payment.api'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cart } from '@/store/cart.store'
import Button from '@/components/ui/button/CustomButton.vue'

const total = computed(() => cart.tickets.reduce((total, ticket) => {
  return total + (ticket.quantity * ticket.price);
}, 0))

const formSchema = toTypedSchema(z.object({
  firstName: z.string().min(1, 'Имя обязательно'),
  lastName: z.string().min(1, 'Фамилия обязательна'),
  email: z.string().email('Некорректный адрес электронной почты'),
  phone: z.string().regex(/^\+7\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/, 'Некорректный номер телефона')
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  console.log('Form submitted!', values)
  if (cart.id != null) {
    const data = await createPayment(cart.id, {
      email: values.email,
      phone: values.phone,
      first_name: values.firstName,
      last_name: values.lastName
    })  
  }
})
</script>
