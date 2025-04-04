import React from "react"
import styles from './index.module.scss'

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
}

const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
  return (
    <div
      className={`${styles.badge} ${styles[variant]} ${className}`}
      {...props}
    />
  )
}

export { Badge }
