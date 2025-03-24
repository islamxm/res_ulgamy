import { FC, PropsWithChildren } from 'react';
import classes from './classes.module.scss'

type Props = PropsWithChildren<{
  
}>

const Container:FC<Props> = ({children}) => {
  return(
    <div className={classes.wrapper}>{children}</div>
  )
}

export default Container;