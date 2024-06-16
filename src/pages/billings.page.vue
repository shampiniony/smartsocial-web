<template>
  <div class='w-full flex flex-col p-5'>
    <div>
      <h1 class='text-3xl'>Транзакции</h1>
    </div>
    <div class="py-10 mx-auto w-full">
      <DataTable :columns="columns" :data="data" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Payment, columns } from '@/models/admin/billings/columns'
import DataTable from '@/models/admin/billings/data-table.vue'

const data = ref<Payment[]>([])

async function getData(): Promise<Payment[]> {
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>