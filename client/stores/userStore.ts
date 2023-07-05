import { create } from 'zustand'

interface User {
  id: string
  name: string
}

interface UserState {
  user: User
  setUser: (user: User) => void
}

export const useUserStore = create<UserState>(set => ({
  user: {
    id: '',
    name: '',
  },
  setUser: user => set({ user }),
}))
