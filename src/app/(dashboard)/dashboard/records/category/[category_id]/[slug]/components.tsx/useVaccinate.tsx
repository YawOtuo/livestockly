import { Vaccine } from '@/lib/types/vaccines';
import { create } from 'zustand';

type VaccinateStore = {
  selectedRecords: number[]; // Array of record IDs
  readyToVaccinate: boolean;
  selectedVaccine: Vaccine | null; // Store the selected vaccine

  addRecord: (recordId: number) => void;
  removeRecord: (recordId: number) => void;
  clearSelection: () => void;
  setReadyToVaccinate: (ready: boolean) => void;
  setSelectedVaccine: (vaccine: Vaccine) => void; // Function to set the selected vaccine
};

export const useVaccinateStore = create<VaccinateStore>((set) => ({
  selectedRecords: [],
  readyToVaccinate: false,
  selectedVaccine: null, // Initially no vaccine is selected

  addRecord: (recordId) => set((state) => ({
    selectedRecords: [...state.selectedRecords, recordId],
    readyToVaccinate: true, // Set ready if at least one record is selected
  })),
  
  removeRecord: (recordId) => set((state) => {
    const updatedRecords = state.selectedRecords.filter(
      (selectedRecord) => selectedRecord !== recordId
    );
    return {
      selectedRecords: updatedRecords,
      readyToVaccinate: updatedRecords.length > 0,  // Set ready only if there are remaining records
    };
  }),

  clearSelection: () => set({ selectedRecords: [], readyToVaccinate: false }),

  setReadyToVaccinate: (ready: boolean) => set({ readyToVaccinate: ready }),

  setSelectedVaccine: (vaccine: Vaccine) => set({ selectedVaccine: vaccine }), // Update the selected vaccine
}));
