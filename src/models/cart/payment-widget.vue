<template>
  <div class='h-full flex justify-center items-center'>
    <div class='h-full flex justify-center items-center' id="payment-form" ref="paymentFormRef"> </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, nextTick } from 'vue';

const props = defineProps<{
  confirmationToken: string;
  returnUrl: string;
}>();

const paymentFormRef = ref<HTMLElement | null>(null);

const initializeWidget = () => {
  if (!paymentFormRef.value) {
    console.error('Payment form reference is null');
    return;
  }

  // @ts-ignore
  const checkout = new window.YooMoneyCheckoutWidget({
    confirmation_token: props.confirmationToken,
    return_url: props.returnUrl,
    customization: {
      colors: {
        control_primary: '#00BF96'
      }
    },
    error_callback: function (error: any) {
      console.error('YooMoney Widget Error:', error);
    }
  });

  checkout.on('complete', function (data: any) {
    console.log('Payment complete:', data);
    // You can handle the success data here, for example, by updating your application's state
  });

  checkout.render(paymentFormRef.value.id);
};


onMounted(async () => {
  await nextTick();
  // @ts-ignore
  if (window.YooMoneyCheckoutWidget) {
    initializeWidget();
  }
});

</script>