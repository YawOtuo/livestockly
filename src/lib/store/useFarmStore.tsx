import { create } from 'zustand';
import { Farm } from '@/lib/types/farm';

// Define the Zustand store type
interface FarmState {
  farm: Farm | null;
  setFarmDetails: (farm: Farm) => void;
}

// Create the Zustand store
export const useFarmStore = create<FarmState>((set) => ({
  farm: null, // Initially, the farm is null
  setFarmDetails: (farm: Farm) => set({ farm }), // Update the farm object
}));
