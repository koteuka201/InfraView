import React, { PropsWithChildren } from "react"
import styles from './index.module.scss'
import classNames from "classnames"

type ChartContainerProps={
  children: React.ReactNode
  className?: string
  config: any
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children, className, config }) => {
  return (
    <div className={classNames(styles['chartContainer'] ,className)} style={{ position: "relative", height: "100%" }}>
      {children}
    </div>
  )
}

type ChartTooltipProps = {
  tooltipModel: any
}

export const ChartTooltip = ({ tooltipModel, children }:PropsWithChildren<ChartTooltipProps>) => {
  if (!tooltipModel.body) return null

  const { title, body } = tooltipModel
  return (
    <div className={styles['chartTooltip']}>
      <div className={styles['tooltipTitle']}>{title}</div>
      <div className={styles['tooltipBody']}>
        {body.map((item: any, index: number) => (
          <div key={index} className={styles['tooltipItem']}>
            <span className={styles['tooltipLabel']} style={{ color: item.borderColor }}>
              {item.dataset.label}:
            </span>
            <span className={styles['tooltipValue']}>{item.value}%</span>
          </div>
        ))}
      </div>
      {children}
    </div>
  )
}

type ChartTooltipContentProps={
  tooltipModel: any
}

export const ChartTooltipContent = ({ tooltipModel }: ChartTooltipContentProps) => {
  if (!tooltipModel.body) return null

  const { title, body } = tooltipModel
  return (
    <div className={styles['chartTooltipContent']}>
      <div className={styles['tooltipTitle']}>{title}</div>
      {body.map((item: any, index: number) => (
        <div key={index} className={styles['tooltipItem']}>
          <strong>{item.dataset.label}</strong>: {item.value}%
        </div>
      ))}
    </div>
  )
}
