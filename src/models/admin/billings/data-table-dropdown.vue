<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Действия</DropdownMenuLabel>
      <DropdownMenuItem @click="handleCopy(payment.payment_id)">
        Скопировать TX-ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleReturn(payment.payment_id)">Оформить возврат</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { AdminPaymentStatus } from '@/types/admin/admin-payment-status.interface'

import { cancelPayment } from '@/api/payment.api'

const emit = defineEmits(['actionPerformed'])
defineProps<{
  payment: AdminPaymentStatus
}>()



function handleReturn(id: string) {
  cancelPayment(id)
  emit('actionPerformed')
}

function handleCopy(id: string) {
  navigator.clipboard.writeText(id)
  emit('actionPerformed')
}
</script>