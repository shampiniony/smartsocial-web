import axios from 'axios';
import { auth } from '@/store/auth.store';
import { apiUrl } from '@/router/router';

interface LoginResponse {
  access: string;
  refresh: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${apiUrl}/api/v1/users/token/`, {
      email,
      password,
    });

    const { access, refresh } = response.data;
    auth.authenticated = true;
    auth.accessToken = access;
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.accessToken}`;
    
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Invalid username or password');
  }
};
