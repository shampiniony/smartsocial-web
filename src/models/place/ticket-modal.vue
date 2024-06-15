<template>
  <Dialog @update:open='() => modal.selected = null' :open='modal.selected != null'>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class='pb-5'>{{ modal.selected?.name }}</DialogTitle>
        <DialogDescription>
          <div class='flex flex-col gap-5'>
            <Ticket v-for='ticket in tickets' :ticket='ticket' />
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <CustomButton @click='() => {
          modal.selected = null;
          cart.visible = true;
        }' text='перейти в корзину' />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang='ts'>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import CustomButton from '@/components/ui/button/CustomButton.vue';

import { modal } from '@/store/modal.store'
import { cart } from '@/store/cart.store'
import { ref, watch } from 'vue';
import { Ticket as ITicket } from '@/types/client/ticket.interface';
import { getTicketsV2 } from '@/api/tickets.api';

import Ticket from '@/components/ticket.vue';

const tickets = ref<ITicket[]>([]);

watch(modal, async () => {
  if (modal.selected) {
    tickets.value = await getTicketsV2(modal.selected?.id, modal.selected?.start_datetime, modal.selected?.end_datetime);
  }
})
</script>