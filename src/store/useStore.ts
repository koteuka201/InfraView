import { create } from "zustand"
import { Group, Metric,Node,fetchGroups } from "@shared/api"
import { StoreState } from "./types"

export const useStore = create<StoreState>((set) => ({
  groups: [],
  selectedGroup: null,
  selectedNode: null,
  metrics: [],
  filteredMetrics: [],

  setGroups: (groups: Group[]) => set({ groups }),
  setSelectedGroup: (selectedGroup: Group | null) => set({ selectedGroup, selectedNode: null }),
  setSelectedNode: (selectedNode: Node | null) => set({ selectedNode }),
  setMetrics: (metrics: Metric[]) => set({ metrics }),
  setFilteredMetrics: (filteredMetrics: Metric[]) => set({ filteredMetrics }),

  fetchGroups: async () => {
    try {
      const data = await fetchGroups()
      set({ groups: data })
    } catch (error) {
      console.error('Не удалось получить группы:', error)
    }
  },

  fetchMetrics: async () => {
    try {
      const res = await fetch('http://127.0.0.1:23456/api/metrics')
      const data: Metric[] = await res.json()
      set({ metrics: data })
    } catch (error) {
      console.error('Не удалось получить метрики:', error)
    }
  },
}))
