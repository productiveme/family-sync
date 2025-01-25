import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useStore = create(devtools((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set({ user: null, isLoading: false, error: null })
})))
