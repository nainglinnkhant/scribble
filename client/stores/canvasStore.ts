import { create } from 'zustand'

interface CanvasState {
  strokeColor: string
  strokeWidth: number[]
  dashGap: number[]
  setStrokeColor: (strokeColor: string) => void
  setStrokeWidth: (strokeWidth: number[]) => void
  setDashGap: (dashGap: number[]) => void
}

export const useCanvasStore = create<CanvasState>(set => ({
  strokeColor: '#000',
  strokeWidth: [3],
  dashGap: [0],
  setStrokeColor: strokeColor => set({ strokeColor }),
  setStrokeWidth: strokeWidth => set({ strokeWidth }),
  setDashGap: dashGap => set({ dashGap }),
}))
