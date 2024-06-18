"use client";

import { create } from 'zustand'

interface SidebarStore {
  sidebarStatus: boolean,
  trigger: () => void,
}

export const useSidebarStore = create<SidebarStore>()((set) => ({
  sidebarStatus: false,
  trigger: () => set((state) => ({ sidebarStatus: !state.sidebarStatus })),
}))