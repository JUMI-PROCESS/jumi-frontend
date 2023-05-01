import create from 'zustand'

export const useCounter = create((set) => ({
  counterNotification: 0,
  setCounter: (newValue) => set({ counterNotification: newValue }),
}))

