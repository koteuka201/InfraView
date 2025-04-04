import React from "react";
import cn from "classnames";

import styles from './index.module.scss'

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      styles['card'],
      className
    )}
    {...props}
  />
))