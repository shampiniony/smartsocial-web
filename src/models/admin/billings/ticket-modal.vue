<template>
  <Dialog @update:open='() => modal.open = false' :open='modal.open'>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class='pb-5'>Добавить билет</DialogTitle>
        <DialogDescription>
          <div>
            <Select>
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Выбрать место" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem @click='places.selected = place.id' v-for='place in places.all'
                    :value='place.id.toString()'>
                    {{ place.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select v-if='events.length != 0'>
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Выбрать место" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for='event in events' :value='event.id.toString()'>
                    {{ event.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class='flex flex-col gap-5'>
            <Ticket v-for='ticket in tickets' :ticket='ticket' />
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button @click='() => {
          modal.open = false;
          cart.visible = true;
        }' variant='outline'>
          перейти в корзину
        </Button>
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
import Button from '@/components/ui/button/Button.vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { modal } from '@/store/admin-modal.store'
import { cart } from '@/store/cart.store'
import { places } from '@/store/places.store';
import { onMounted, ref, watch } from 'vue';
import { TimedTicket } from '@/types/client/ticket.interface';
import { getTicketsV2 } from '@/api/tickets.api';
import { getEvents } from '@/api/places.api';
import { getPlaces } from '@/api/places.api';
import { Event as IEvent } from '@/types/client/event.interface';

import Ticket from '@/components/ticket.vue';

const events = ref<IEvent[]>([]);
const tickets = ref<TimedTicket[]>([]);

const fetchData = async () => {
  await getPlaces(new Date());
}

onMounted(() => {
  fetchData();
});

watch(places, async () => {
  console.log("hey")
  if (places.selected != null) {
    events.value = await getEvents(places.selected, new Date()) ?? [];
    // tickets.value = await getTicketsV2(places.selected, );
  }
})
</script>