import { Node } from "@shared/api"
import { Group } from "../../shared/api/types/group"
import { Metric } from "../../shared/api/types/metric"

export type StoreState = {
  groups: Group[]
  selectedGroup: Group | null
  selectedNode: Node | null
  metrics: Metric[]
  filteredMetrics: Metric[]

  setGroups: (groups: Group[]) => void
  setSelectedGroup: (selectedGroup: Group | null) => void
  setSelectedNode: (selectedNode: Node | null) => void
  setMetrics: (metrics: Metric[]) => void
  setFilteredMetrics: (filteredMetrics: Metric[]) => void

  fetchGroups: () => Promise<void>
  fetchMetrics: () => Promise<void>
}