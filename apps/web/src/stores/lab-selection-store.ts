import { create } from 'zustand'

type Tier = 'tier1' | 'tier2' | 'tier3' | 'tier4'

interface HardwareSelection {
  [itemId: string]: boolean
}

interface LabSelectionState {
  selectedTier: Tier
  hardwareSelections: HardwareSelection
  selectedTrainerPlan: string | null
  teacherTraining: boolean
  setSelectedTier: (tier: Tier) => void
  toggleHardwareSelection: (itemId: string) => void
  clearHardwareSelections: () => void
  setSelectedTrainerPlan: (plan: string | null) => void
  setTeacherTraining: (enabled: boolean) => void
  reset: () => void
}

export const useLabSelectionStore = create<LabSelectionState>((set) => ({
  selectedTier: 'tier1',
  hardwareSelections: {},
  selectedTrainerPlan: null,
  teacherTraining: false,
  setSelectedTier: (tier) => set({ selectedTier: tier }),
  toggleHardwareSelection: (itemId) =>
    set((state) => ({
      hardwareSelections: {
        ...state.hardwareSelections,
        [itemId]: !state.hardwareSelections[itemId],
      },
    })),
  clearHardwareSelections: () => set({ hardwareSelections: {} }),
  setSelectedTrainerPlan: (plan) => set({ selectedTrainerPlan: plan }),
  setTeacherTraining: (enabled) => set({ teacherTraining: enabled }),
  reset: () =>
    set({
      selectedTier: 'tier1',
      hardwareSelections: {},
      selectedTrainerPlan: null,
      teacherTraining: false,
    }),
}))
