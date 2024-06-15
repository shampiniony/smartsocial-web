<template>
  <div id="payment-form"></div>
</template>

<script setup lang='ts'>
import { onMounted, onBeforeUnmount, ref } from 'vue';

const props = defineProps<{
  confirmationToken: string;
  returnUrl: string;
}>();

// ct-2dff2ad1-000f-5000-9000-17a1f32c7d4d

const paymentFormRef = ref(null);

const initializeWidget = () => {
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
  checkout.render(paymentFormRef.value);
};

const loadYooMoneyWidget = () => {
  // @ts-ignore
  if (window.YooMoneyCheckoutWidget) {
    initializeWidget();
  } else {
    const script = document.createElement('script');
    script.src = 'https://yookassa.ru/checkout-widget/v1/checkout-widget.js';
    script.onload = initializeWidget;
    document.head.appendChild(script);
  }
};

onMounted(() => {
  loadYooMoneyWidget();
});

onBeforeUnmount(() => {
  // Clean up if necessary
});

</script>

<style scoped>
/* Add any styles if needed */
</style>
