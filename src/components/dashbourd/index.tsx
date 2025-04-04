import { useStore } from '@store/useStore'
import styles from './index.module.scss'
import { StatusAndGroupSection } from './statusAndGroupSection'
import { Node } from '@shared/api'
import { useCallback, useEffect, useMemo } from 'react'
import { NodesSection } from './nodesSection'
import { statusTranslations } from './nodesSection/nodeItem'
import { DetailsSection } from './detailsSection'

export const Dashboard=()=>{

  const {
    groups, 
    selectedGroup, 
    selectedNode, 
    metrics, 
    filteredMetrics,
    setFilteredMetrics,
    setSelectedNode,
  } = useStore()

  const getWorstStatus = (nodes: Node[]) => {
    if (!nodes.length) return { color: "grey", description: "No data" }
    if (!selectedGroup) return { color: "grey", description: "Группа не выбрана" }

    const statusPriority: Record<string, number> = {
      darkred: 4,
      red: 3,
      yellow: 2,
      lightgreen: 1,
      grey: 0,
    }

    let worstStatus = { color: "green", description: "OK" }
    let highestPriority = 0

    nodes.forEach((node) => {
      const priority = statusPriority[node.node_status_color]
      if (priority > highestPriority) {
        highestPriority = priority
        worstStatus = { color: node.node_status_color, description: statusTranslations[node.node_status_description] }
      }
    })
    
    return worstStatus
  }

  const getAllNodes = useCallback(() => {
    if (selectedGroup) {
      return selectedGroup.nodes
    }
    return groups.flatMap((group) => group.nodes)
  }, [selectedGroup, groups])

  const getNodeGroups = () => {
    if (!selectedNode) return groups

    return groups.filter((group) => group.nodes.some((node) => node.node_id === selectedNode.node_id))
  }

  useEffect(() => {
    if (selectedNode) {
      setFilteredMetrics(metrics.filter((metric) => metric.id === selectedNode.node_id))
    } else {
      setFilteredMetrics([])
    }
  }, [selectedNode, metrics, setFilteredMetrics])

  useEffect(() => {
    setSelectedNode( null )
  }, [selectedGroup])

  const displayedNodes = useMemo(() => getAllNodes(), [getAllNodes])
  const serviceStatus = useMemo(() => getWorstStatus(displayedNodes),[getWorstStatus, displayedNodes])
  const displayedGroups = useMemo(() => (selectedNode ? getNodeGroups() : groups),[getNodeGroups, selectedNode, groups])
  
  return(
    <div className={styles['container']}>
      <h1 className={styles['header']}>Панель мониторинга</h1>
      <div className={styles['grid']}>
        <StatusAndGroupSection 
          serviceStatus={serviceStatus} 
          displayedGroups={displayedGroups}
          displayedNodes={displayedNodes}
        />
        <NodesSection displayedNodes={displayedNodes} />
        <DetailsSection />
      </div>
    </div>
  )
}