<template>
  <div class='w-full flex flex-col p-5'>
    <div>
      <h1 class='text-3xl'>Транзакции</h1>
    </div>
    <div class="py-10 mx-auto w-full flex flex-col gap-5">
      <AddPayment />
      <DataTable :columns="columns" :data="data" @actionPerformed="handleActionPerformed" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { columns } from '@/models/admin/billings/columns'
import DataTable from '@/models/admin/billings/data-table.vue'
import { AdminPaymentStatus } from '@/types/admin/admin-payment-status.interface';
import { getPayments } from '@/api/payment.api';
import AddPayment from '@/models/admin/billings/add-payment.vue'

const data = ref<AdminPaymentStatus[]>([])

const fetchData = async () => {
  data.value = await getPayments()
}

const handleActionPerformed = () => {
  fetchData()
}

onMounted(async () => {
  await fetchData();
})
</script>