import { FC, HTMLProps, ReactNode } from 'react';
import classes from './classes.module.scss'

type Props = HTMLProps<HTMLInputElement> & {

}

const Checkbox: FC<Props> = ({
  ...props
}) => {
  return (
    <div className={classes.wrapper}>
      <input
        {...props}
        className={classes.input}
        type="checkbox" />
      <label className={classes.body} htmlFor={props.id}>
        <div className={classes.checkbox}></div>
        {props.label &&
          <div className={classes.label}>{props.label}</div>
        }
      </label>
    </div>
  )
}

export default Checkbox