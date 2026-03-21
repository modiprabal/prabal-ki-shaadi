import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'COUPLE' | 'ADMIN' | 'COORDINATOR' | 'GUEST';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, role: UserRole) => set({ 
        user: { 
          id: '1', 
          email, 
          name: email.split('@')[0], 
          role 
        }, 
        isAuthenticated: true 
      }),
      logout: () => set({ user: null, isAuthenticated: false }),
      hasRole: (roles) => {
        const user = get().user;
        return user ? roles.includes(user.role) : false;
      },
    }),
    {
      name: 'wedding-auth-storage',
    }
  )
);
