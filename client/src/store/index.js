"use client";

import { centerCanvas } from "@/fabric/fabric-utils";
import { create } from "zustand";

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

 
  resetstore: () =>
    set({ canvas: null, designID: null, IsEditing: true, name: ""}),
}));
