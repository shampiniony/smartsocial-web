<template>
  <div class='p-5 w-full rounded-md border flex flex-col gap-2'>
    <h1 class='text-xl'>Создать Оплату</h1>
    <div class='grid h-full w-full gap-5 grid-cols-2'>
      <div class='border rounded-sm'>
        <div class='flex border-b w-full items-center justify-between h-12 p-2'>
          <p>Клиент</p>
        </div>
        <div class='p-2 flex flex-col gap-2'>
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
      </div>
      <div class='border rounded-sm'>
        <div class='flex border-b w-full items-center justify-between p-2 h-12'>
          <p>Корзина</p>
          <Button @click='modal.open = true' size='xs' variant="outline">
            Добавить в корзину
          </Button>
        </div>
        <div class='p-2'>
          hello
        </div>
      </div>
    </div>
    <TicketModal />
  </div>
</template>

<script setup lang='ts'>
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';
import TicketModal from './ticket-modal.vue';
import { modal } from '@/store/admin-modal.store';
</script>