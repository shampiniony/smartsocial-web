<template>
  <div class="h-screen flex justify-center items-center px-3 pt-20">
    <div v-if='route.query.key == null' class="flex flex-col items-center gap-y-4">
      <div v-if='status && status.payment_status == "succeeded"'>
        <h3 class="font-semibold text-xl text-center">Оплата прошла успешно!</h3>
        <p class="text-lg text-center">Билеты отправлены на вашу электронную почту</p>
      </div>
      <div class="p-2 md:py-6 md:px-8 border-2 w-[98%] rounded-3xl">
        <div class="flex gap-x-2 md:gap-x-6">
          <div class="flex flex-col gap-y-4">
            <Paragraph class="md:w-max">Номер платежа</Paragraph>
            <Paragraph>Статус</Paragraph>
            <Paragraph>Сумма</Paragraph>
          </div>

          <div class="flex flex-col gap-y-4">
            <Paragraph class="md:w-max">{{ $route.params.id }}</Paragraph>
            <Status v-if='status != null' :status='status?.payment_status'></Status>
            <Paragraph v-if='status != null'>{{ status.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} ₽
            </Paragraph>
          </div>
        </div>
      </div>

      <a v-if='status != null && isSuccessful(status)' :href='status.ticket_url'>
        <Button class="mt-8 bg-primary px-6 py-2 rounded-3xl text-white">Скачать билет</Button>
      </a>
    </div>
    <PaymentWidget v-if='route.query.key != null' :confirmation-token='route.query.key'
      :return-url='`${appUrl}${route.path}`' />
  </div>
</template>

<script setup lang='ts'>
import Button from '@/components/ui/button/Button.vue';
import Paragraph from '@/models/ticket/paragraph.vue';
import Status from '@/models/ticket/status.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
import PaymentWidget from '@/models/cart/payment-widget.vue';

import { getPaymentStatus } from '@/api/payment.api';
import { PaymentStatus, SucessfulPayment } from '@/types/client/payment-status.interface';

const route = useRoute();
const status = ref<PaymentStatus | null>(null);

const appUrl = import.meta.env.VITE_APP_URL;

let pollInterval: NodeJS.Timeout | null = null;

const fetchData = async () => {
  status.value = await getPaymentStatus(route.params.id.toString());
  if (status.value?.payment_status === 'succeeded' && pollInterval) {
    clearInterval(pollInterval);
    pollInterval = null;
  }
};

onMounted(() => {
  fetchData();
  pollInterval = setInterval(fetchData, 5000); // Poll every 5 seconds
});

onUnmounted(() => {
  if (pollInterval) {
    clearInterval(pollInterval);
  }
});

const isSuccessful = (status: PaymentStatus | SucessfulPayment): status is SucessfulPayment => {
  return (status as SucessfulPayment).ticket_url !== undefined;
}
</script>
