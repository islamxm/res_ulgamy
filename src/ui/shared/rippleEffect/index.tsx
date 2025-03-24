import { FC, MouseEvent, PropsWithChildren, ReactNode, useState } from 'react';
import classes from './classes.module.scss'

type Props = PropsWithChildren<{

}>

const RippleEffect:FC<Props> = ({children}) => {
  const [circlePos, setCirclePos] = useState()

  

  return(
    <div className={classes.wrapper}>
      {children}
      <div className={classes.ripple}></div>
    </div>
  )
}

export default RippleEffect;