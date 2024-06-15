<template>
  <div class='h-screen w-full flex justify-center items-center'>
    <Button @click='() => {
      getBookings();
      message = "Готово ✅";
    }'>{{ message }}</Button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { getBookings } from '@/api/admin.api';

const message = ref("Выгрузить данные в amo CRM")

</script>
  <div>Admin Page</div>
</template>

<script>
export default {
  name: 'AdminPage',
};
</script>