import axios from 'axios';
import { apiUrl } from '@/router/router';

interface RegisterResponse {
  id: number;
}

interface RegisterData {
  last_name: string;
  first_name: string;
  middle_name: string;
  place: number;
  phone_number: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(`${apiUrl}/api/v1/users/register/`, data);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw new Error('Registration failed');
  }
};
