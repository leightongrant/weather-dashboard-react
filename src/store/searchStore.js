import { create } from 'zustand'

export const useSearchStore = create((set) => ({
	cityName: '',
	setCityName: (cityName) => set({ cityName }),
}))
