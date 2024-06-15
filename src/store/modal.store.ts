import { reactive } from 'vue';
import { Event } from '@/types/client/event.interface';

interface ModalProps {
  selected: Event | null;
}

export const modal = reactive<ModalProps>({
  selected: null,
});
