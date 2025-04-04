import { Card } from "@shared/ui"
import styles from './index.module.scss'
import cn from "classnames"

export type ApplicationItemProps={
  readonly applicationId: number
  readonly applicationName: string
}

export const ApplicationItem=({applicationId, applicationName}: ApplicationItemProps)=>{

  return(
    <Card className={styles['container']}>
      <span>{applicationName}</span>
      <span>ID: {applicationId}</span>
    </Card>
  )
}