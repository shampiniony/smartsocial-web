<template>
  <div class="h-screen flex justify-center items-center">
    <div class="flex flex-col items-center gap-y-4">
      <h3 class="font-semibold text-xl text-center">Оплата прошла успешно!</h3>
      <p class="text-lg text-center">Билеты отправлены на вашу электронную почту</p>
      <div class="p-2 md:py-6 md:px-8 border-2 w-[98%] rounded-3xl">
        <div class="flex gap-x-2 md:gap-x-6">
          <div class="flex flex-col gap-y-4">
            <Paragraph class="md:w-max">Номер платежа</Paragraph>
            <Paragraph>Статус</Paragraph>
            <Paragraph>Сумма</Paragraph>
          </div>

          <div class="flex flex-col gap-y-4">
            <Paragraph class="md:w-max">2dfd28ac-000f-5000-a000-1a776437c021</Paragraph>
            <Status status="succeed"></Status>
            <Paragraph>1 500 ₽</Paragraph>
          </div>
        </div>
      </div>

      <Button class="mt-8 bg-primary px-6 py-2 rounded-3xl text-white">Скачать билет</Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/ui/button/Button.vue';
import Paragraph from '@/models/ticket/paragraph.vue';
import Status from '@/models/ticket/status.vue';

export default {
  components: {
    Paragraph,
    Status
  }
};
</script>

<style scoped>
</style>
