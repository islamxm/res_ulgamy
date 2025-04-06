import { FC, PropsWithChildren, ReactNode } from 'react';
import classes from './classes.module.scss'

type Props = PropsWithChildren<{
  label: ReactNode
}>


const BoxWithLabel:FC<Props> = ({
  label,
  children
}) => {
  return(
    <div className={classes.wrapper}>
      <div className={classes.label}>{label}</div>
      <div className={classes.body}>{children}</div>
    </div>
  )
}

export default BoxWithLabel