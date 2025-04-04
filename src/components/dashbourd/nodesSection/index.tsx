import { Card } from "@shared/ui"
import styles from './index.module.scss'
import { Server } from "lucide-react"
import cn from "classnames"
import { useStore } from "@store/useStore"
import { Node } from "@shared/api"
import { NodeItem } from "./nodeItem"

export type NodesSectionProps={
  readonly displayedNodes: Node[] 
}

export const NodesSection=({displayedNodes}: NodesSectionProps)=>{
  
  const {metrics}=useStore()

  return(
    <div>
      <Card className={styles['container']}>
      <h3 className={styles['h']}>
        <Server height={20} width={20} />
        Сетевые узлы
      </h3>
      <div className={cn(styles['scroll-area'])}>
        <div className={styles['content']}>
        {displayedNodes.map((node) => {
          const nodeMetrics = metrics
            .filter((m) => m.id === node.node_id)
            .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())[0]
          
          return (
            <NodeItem key={node.node_id} node={node} nodeMetrics={nodeMetrics} />
          )
        })}
        </div>
      </div>
      </Card>
    </div>
  )
}