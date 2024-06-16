import { reactive } from 'vue';

interface AuthStore {
  authenticated: boolean;
  accessToken: string | null;
}

export const auth = reactive<AuthStore>({
  authenticated: false,
  accessToken: null,
});

export const isAuthenticated = () => auth.authenticated;