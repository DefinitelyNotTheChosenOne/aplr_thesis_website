import { create } from "zustand";

export interface StageStore {
  currentStep: 0 | 1 | 2; // 0: User App, 1: Admin Side, 2: YOLOv11 AI
  morphProgress: number; // 0..1 progression of active morph
  overallProgress: number; // 0..1 scrollytelling pin progress
  pageProgress: number; // 0..1 progression across the entire document
  travelY: number; // -1..1 signed vertical displacement factor peaking mid-morph
  activeColor: string; // Lerped color (#5B5BF0 -> #22C55E -> #F5A623)
  peakMorph: number; // 0..1 factor peaking mid-morph (expands background ring)
  showRealScreenshot: boolean;
  setStageState: (updates: Partial<Omit<StageStore, "setStageState" | "setShowRealScreenshot">>) => void;
  setShowRealScreenshot: (show: boolean) => void;
}

export const useStageStore = create<StageStore>((set) => ({
  currentStep: 0,
  morphProgress: 0,
  overallProgress: 0,
  pageProgress: 0,
  travelY: 0,
  activeColor: "#5B5BF0",
  peakMorph: 0,
  showRealScreenshot: false,
  setStageState: (updates) => set((state) => ({ ...state, ...updates })),
  setShowRealScreenshot: (show) => set({ showRealScreenshot: show }),
}));
