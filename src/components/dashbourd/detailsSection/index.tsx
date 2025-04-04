import { Card } from "@shared/ui"
import { useStore } from "@store/useStore"
import styles from './index.module.scss'
import { Activity, Layers, Network, Server, User } from "lucide-react"
import cn from "classnames"
import { NodeMetricsChart } from "./nodeMetricChart"
import { InterfaceItem } from "./interfaceItem"
import { AdministratorItem } from "./administratorItem"
import { ApplicationItem } from "./applicationItem"

export type DetailsSectionProps={

}

export const DetailsSection=({}: DetailsSectionProps)=>{
  
  const {selectedNode, filteredMetrics}=useStore()
  console.log(selectedNode)
  return(
    <div>
      {selectedNode ?(
        <Card className={styles['container']}>
          <h3 className={styles['h']}>
            <Server height={20} width={20} />
            Детали сетевого узла - {selectedNode.node_name}
          </h3>
          <div className={cn(styles['scroll-area'])}>
            <div className={styles['content']}>
              <h4 className={styles['h']}>
                <Activity height={20} width={20} />
                Метрики
              </h4>
              <NodeMetricsChart metrics={filteredMetrics} />
            </div>
            <div className={styles['content']}>
              <h4 className={styles['hSmall']}>
                <Network height={20} width={20} />
                Интерфейс
              </h4>
              <div>
                <InterfaceItem 
                  interfaceName={selectedNode.interfaces.interface_name} 
                  interfaceStatus={selectedNode.interfaces.interface_status} 
                />
              </div>
            </div>
            <div className={styles['content']}>
              <h4 className={styles['hSmall']}>
                <User height={20} width={20} />
                Администратор
              </h4>
              <div>
                <AdministratorItem 
                  adminName={selectedNode.admin.admin_name}
                  adminId={selectedNode.admin.admin_id}
                />
              </div>
            </div>
            <div className={styles['content']}>
              <h4 className={styles['hSmall']}>
                <Layers height={20} width={20} />
                Приложения
              </h4>
              <div>
                {selectedNode.applications.length ? (selectedNode.applications.map((app)=>(
                  <ApplicationItem 
                    applicationId={app.app_id} 
                    applicationName={app.app_name} 
                  />
                ))): (
                  <div style={{textAlign: 'center'}}>Нет приложений выполняющихся на этом сетевом узле</div>
                )}
              </div>
            </div>
          </div>
        </Card>
      ):(
        <Card className={styles['emptyContainer']}>
          <div>
            <Server height={40} width={40} />
            <div>
              Ни один сетевой узел не выбран
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}