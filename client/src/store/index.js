"use client";

import { centerCanvas } from "@/fabric/fabric-utils";
import { create } from "zustand";

export const useEditorStore = create((set , get) => ({
    canvas: null,
    setCanvas: (canvas) => {
        set({ canvas });
        if (canvas) {
            centerCanvas(canvas);
        }
    },

    designID: null,
    setDesignID: (id) => set({ designID :id }),

    resetstore: () => set({ canvas: null, designID: null }),
}));

