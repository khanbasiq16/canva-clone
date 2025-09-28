"use client";

import { centerCanvas } from "@/fabric/fabric-utils";
import { saveCanvasState } from "@/services/design-service";
import { create } from "zustand";
import { debounce } from "lodash";

export const useEditorStore = create((set, get) => ({
  canvas: null,
  setCanvas: (canvas) => {
    set({ canvas });
    if (canvas) {
      centerCanvas(canvas);
    }
  },

  designID: null,
  setDesignID: (id) => set({ designID: id }),

  IsEditing: true,
  setIsEditing: (flag) => set({ IsEditing: flag }),

  showProperties: false,
  setShowProperties: (flag) => set({ showProperties: flag }),

  name: "",
  setName: (value) => set({ name: value }),

  saveStatus: "saved",
  setSaveStatus: (status) => set({ saveStatus: status }),
  lastModified: Date.now(),
  isModified: false,

  markAsModified: () => {
    const designId = get().designID;

    if (designId) {
      set({
        lastModified: Date.now(),
        saveStatus: "Saving...",
        isModified: true,
      });

      get().debouncedSaveToServer();
    } else {
      console.error("No design ID Available");
    }
  },

  saveToServer: async () => {
    const designId = get().designID;
    const canvas = get().canvas;

    if (!canvas || !designId) {
      console.log("No design ID Available or canvas instance is not available");
      return null;
    }

    try {
      const savedDesign = await saveCanvasState(canvas, designId, get().name);

      set({
        saveStatus: "Saved",
        isModified: false,
      });

      return savedDesign;
    } catch (e) {
      set({ saveStatus: "Error" });
      return null;
    }
  },

  debouncedSaveToServer: debounce(() => {
    get().saveToServer();
  }, 500),

  resetstore: () =>
    set({
      canvas: null,
      designID: null,
      IsEditing: true,
      name: "",
      saveStatus: "Saved",
      isModified: false,
      lastModified: Date.now(),
    }),
}));
