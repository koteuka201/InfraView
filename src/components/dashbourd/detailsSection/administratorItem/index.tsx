import { Card } from "@shared/ui"
import styles from './index.module.scss'
import cn from "classnames"

export type AdministratorItemProps={
  readonly adminId: number | undefined
  readonly adminName: string | undefined
}

export const AdministratorItem=({adminId, adminName}: AdministratorItemProps)=>{
  
  if(adminId==undefined || adminName==undefined){
    return(
      <div className={cn(styles['container'], styles['justifyCenter'])}>
        Администратор не назначен
      </div>
    )
  }

  return(
    <Card className={styles['container']}>
      <span>{adminName}</span>
      <span>ID: {adminId}</span>
    </Card>
  )
}