import { Badge, Card } from '@shared/ui'
import styles from './index.module.scss'
import { Activity, Server, Users } from 'lucide-react'
import cn from 'classnames'
import { Group, Node } from '@shared/api'
import { useStore } from '@store/useStore'

export type StatusAndGroupSectionProps={
  readonly serviceStatus: { color: string, description: string }
  readonly displayedNodes: Node[] 
  readonly displayedGroups: Group[]
}

export const StatusAndGroupSection=({serviceStatus, displayedNodes, displayedGroups}: StatusAndGroupSectionProps)=>{
  
  const {selectedGroup, setSelectedGroup}=useStore()

  return(
    <div className={styles['container']}>
      <Card className={styles['card']}>
        <h3 className={styles['h']}>
          <Activity height={20} width={20} />
          Статус сетевой группы
        </h3>
        <div className={cn(styles['status-container'], styles[serviceStatus.color])}>
          <div className={cn(styles['status-circle'])}></div>
          <span className={styles['status-description']}>{serviceStatus.description}</span>
        </div>
      </Card>
      <Card className={styles['card']}>
        <h3 className={styles['h']}>
          <Server height={20} width={20} />
          Общая информация
        </h3>
        <div className={styles['status-info']}>
          <div className={styles['status-row']}>
            <span className={styles['label']}>Всего групп:</span>
            <span className={styles['value']}>{displayedGroups.length}</span>
          </div>
          <div className={styles['status-row']}>
            <span className={styles['label']}>Всего сетевых узлов:</span>
            <span className={styles['value']}>{displayedNodes.length}</span>
          </div>
          <div className={styles['status-row']}>
            <span className={styles['label']}>Статус:</span>
            <span className={`${styles['value']} ${styles[serviceStatus.color]}`}>
              {serviceStatus.description}
            </span>
          </div>
        </div>
      </Card>
      <Card className={styles['card']}>
        <h3 className={styles['h']}>
          <Users height={20} width={20} />
          Сетевые группы
        </h3>
        <div className={styles['scroll-area']}>
          <div className={styles['groups-list']}>
            {displayedGroups.map((group) => (
              <div
                key={group.group_id}
                className={`${styles['group-item']} ${selectedGroup?.group_id === group.group_id ? styles['selected'] : ''}`}
                onClick={() => setSelectedGroup(selectedGroup?.group_id === group.group_id ? null : group)}
              >
                <div className={styles['group-header']}>
                  <span className={styles['group-name']}>{group.group_name}</span>
                  <Badge variant="outline">{group.nodes.length}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}