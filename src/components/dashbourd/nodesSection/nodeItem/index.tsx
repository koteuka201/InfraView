import { Card } from "@shared/ui"
import styles from './index.module.scss'
import { useStore } from "@store/useStore"
import { Metric, Node } from "@shared/api"
import cn from "classnames"

export const statusTranslations: Record<string, string> = {
  SHUTDOWN: "Выключен",
  UP: "Работает исправно",
  WARNING: "Перегружен",
  CRITICAL: "Критично нагружен",
  DOWN: "Недоступен",
}

export type NodeItemProps={
  readonly node: Node
  readonly nodeMetrics: Metric | undefined
}

export const NodeItem=({nodeMetrics, node}: NodeItemProps)=>{
  
  const{selectedNode, setSelectedNode}=useStore()

  return(
    <Card
      className={cn(styles['nodeContainer'], {
        [styles['selectedNode']]: selectedNode?.node_id === node.node_id,
        [styles['hoverNode']]: selectedNode?.node_id !== node.node_id,
      })}
      onClick={() => setSelectedNode(selectedNode?.node_id === node.node_id ? null : node)}
    >
      <div className={styles['nodeHeader']}>
        <div className={styles['nodeTitle']}>
          <div className={cn(styles['nodeStatus'], styles['nodeStatusColor'], styles[node.node_status_color])} />
          <span className={styles['nodeName']}>{node.node_name}</span>
        </div>
        <span className={styles['nodeDescription']}>{statusTranslations[node.node_status_description]}</span>
      </div>

      {nodeMetrics && (
        <div className={styles['metricsGrid']}>
          <div className={styles['metricItem']}>
            <div className={styles['metricLabel']}>CPU</div>
            <div
              className={cn(styles['metricValue'], {
                [styles['metricHigh']]: nodeMetrics.cpu_utilization > 95,
                [styles['metricMedium']]: nodeMetrics.cpu_utilization > 85 && nodeMetrics.cpu_utilization <= 95,
              })}
            >
              {nodeMetrics.cpu_utilization}%
            </div>
          </div>
          <div className={styles['metricItem']}>
            <div className={styles['metricLabel']}>Memory</div>
            <div
              className={cn(styles['metricValue'], {
                [styles['metricHigh']]: nodeMetrics.memory_utilization > 95,
                [styles['metricMedium']]: nodeMetrics.memory_utilization > 85 && nodeMetrics.memory_utilization <= 95,
              })}
            >
              {nodeMetrics.memory_utilization}%
            </div>
          </div>
          <div className={styles['metricItem']}>
            <div className={styles['metricLabel']}>Disk</div>
            <div
              className={cn(styles['metricValue'], {
                [styles['metricHigh']]: nodeMetrics.disk_utilization > 95,
                [styles['metricMedium']]: nodeMetrics.disk_utilization > 85 && nodeMetrics.disk_utilization <= 95,
              })}
            >
              {nodeMetrics.disk_utilization}%
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}