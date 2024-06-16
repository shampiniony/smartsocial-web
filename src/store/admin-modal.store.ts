import { reactive } from 'vue';

interface ModalProps {
  open: boolean;
}

export const modal = reactive<ModalProps>({
  open: false,
});
