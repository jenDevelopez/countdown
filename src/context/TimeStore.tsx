import {create} from 'zustand'
import { devtools,persist } from 'zustand/middleware'

interface StoreTypes {
  timeLeft:number
  setTimeLeft:(value:number) => void
}


export const useTimeStore = create<StoreTypes>()(
  devtools(
    persist(
      (set) => ({
        timeLeft: 0,
        setTimeLeft: (value) => set({timeLeft:value})
      }),
      { name: 'timeStore' },
    ),
  ),
)

