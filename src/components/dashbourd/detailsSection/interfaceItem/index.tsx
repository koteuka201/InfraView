import { Badge, Card } from "@shared/ui"
import styles from './index.module.scss'
import cn from "classnames"

export type InterfaceItemProps={
  readonly interfaceStatus: string
  readonly interfaceName: string
}

export const InterfaceItem=({interfaceStatus, interfaceName}: InterfaceItemProps)=>{
  
  if(interfaceName==undefined){
    return(
      <div className={cn(styles['container'], styles['justifyCenter'])}>
        Интерфейс отсутствует
      </div>
    )
  }

  return(
    <Card className={styles['container']}>
      <span>{interfaceName}</span>
      <Badge variant="outline">статус: {interfaceStatus || 0}</Badge>
    </Card>
  )
}