import axios from 'axios';
import { apiUrl } from '@/router/router';

interface User {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  place: number;
  phone_number: string;
  email: string;
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${apiUrl}/api/v1/users/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};
