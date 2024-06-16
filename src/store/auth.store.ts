import { reactive } from 'vue';

interface AuthStore {
  authenticated: boolean;
  token: string;
}

export const auth = reactive<AuthStore>({
  authenticated: true,
  token: '',
});
