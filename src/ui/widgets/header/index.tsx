import { FC, Ref } from 'react'
import classes from './classes.module.scss'
import Logo from './components/logo'
type Props = {
  ref: Ref<HTMLDivElement>
}

const Header:FC<Props> = ({
  ref
}) => {
  return (
    <header ref={ref} className={classes.wrapper}>
      <Logo/>
    </header>
  )
}

export default Header