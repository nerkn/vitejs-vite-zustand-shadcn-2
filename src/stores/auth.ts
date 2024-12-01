import { create } from 'zustand';
import axios from 'axios';
import { User } from './entities/user';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
export interface AuthActions {
  signIn: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    email: string
  ) => Promise<void>;
  signOut: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,

  signIn: async (username, password) => {
    try {
      const response = await axios.post('/auth/signin', { username, password });
      const { token, user } = response.data;

      set({
        isAuthenticated: true,
        user,
        token,
      });

      // Optionally save the token in localStorage
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    }
  },

  register: async (username, password, email) => {
    try {
      const response = await axios.post('/auth/register', {
        username,
        password,
        email,
      });
      const { token, user } = response.data;

      set({
        isAuthenticated: true,
        user,
        token,
      });

      // Optionally save the token in localStorage
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  signOut: () => {
    set({
      isAuthenticated: false,
      user: null,
      token: null,
    });

    // Optionally clear localStorage
    localStorage.removeItem('authToken');
  },
}));
