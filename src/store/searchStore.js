/**
 * searchStore
 * 
 * A Zustand store for managing the global search state.
 * - cityName: The currently active city for which weather is being fetched.
 * - setCityName: Action to update the active city name.
 */

import { create } from 'zustand'

export const useSearchStore = create((set) => ({
	cityName: '',
	setCityName: (cityName) => set({ cityName }),
}))
