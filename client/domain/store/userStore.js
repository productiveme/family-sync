import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      currentUser: null,
      users: [],

      login: (user) => {
        set({ currentUser: user });
      },

      logout: () => {
        set({ currentUser: null });
      },

      addUser: (user) => {
        set((state) => ({
          users: [...state.users, { ...user, id: Date.now() }]
        }));
      },

      updateUser: (id, updates) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updates } : user
          ),
          currentUser:
            state.currentUser?.id === id
              ? { ...state.currentUser, ...updates }
              : state.currentUser
        }));
      }
    }),
    {
      name: 'family-calendar-user-storage'
    }
  )
);

export default useUserStore;
