import { FC, HTMLProps, PropsWithChildren, ReactNode, useEffect } from 'react';
import classes from './classes.module.scss'
import { getClassesFromStylePresets } from '@/utils/getClassesFromStylePresets';
import setClassNames from '@/utils/setClassNames';
import { ComponentBaseProps } from '@/models/ui_models';
import { NavLink, To } from 'react-router';
import RippleEffect from '../rippleEffect';

type Props = PropsWithChildren<HTMLProps<HTMLButtonElement> & ComponentBaseProps<{
  isCircle?: boolean
  isIcon?: boolean
  type?: 'submit' | 'reset' | 'button',
  beforeIcon?: ReactNode,
  afterIcon?: ReactNode,
  isFill?: boolean,
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between',
  link?: {
    props?: HTMLProps<HTMLAnchorElement>
    to: To
  }
}>>

const Button: FC<Props> = ({
  children,
  colorVariant = 'primary',
  styleVariant = 'solid',
  baseSize = 'middle',
  isIcon = false,
  type = 'button',
  beforeIcon,
  afterIcon,
  isCircle,
  isFill,
  justify,
  link,
  ...defaultButtonProps
}) => {

  if (link) {
    return (
      <NavLink
        {...link?.props}
        to={link.to}
        className={setClassNames([
          classes.wrapper,
          isIcon && classes.iconButton,
          isCircle && classes.circle,
          isFill && classes.fill,
          'flex-centered',
          getClassesFromStylePresets([colorVariant, styleVariant, baseSize], classes),
          defaultButtonProps.disabled && classes.disabled
        ])}
        style={{
          ...defaultButtonProps.style,
          justifyContent: justify
        }}
      >
        {
          beforeIcon && <div className={setClassNames([
            classes.icon,
            classes.before,
            'flex-centered'
          ])}>
            {beforeIcon}
          </div>
        }
        {children && <span className={classes.main}>{children}</span>}

        {
          afterIcon && <div className={setClassNames([
            classes.icon,
            classes.after,
            'flex-centered'
          ])}>
            {afterIcon}
          </div>
        }
      </NavLink>
    )
  }

  return (

    <button
      {...defaultButtonProps}
      type={type}
      className={setClassNames([
        classes.wrapper,
        isIcon && classes.iconButton,
        isCircle && classes.circle,
        isFill && classes.fill,
        'flex-centered',
        getClassesFromStylePresets([colorVariant, styleVariant, baseSize], classes)
      ])}
      style={{
        ...defaultButtonProps.style,
        justifyContent: justify
      }}
    >
      {
        beforeIcon && <div className={setClassNames([
          classes.icon,
          classes.before,
          'flex-centered'
        ])}>
          {beforeIcon}
        </div>
      }
      {children && <span className={classes.main}>{children}</span>}

      {
        afterIcon && <div className={setClassNames([
          classes.icon,
          classes.after,
          'flex-centered'
        ])}>
          {afterIcon}
        </div>
      }
    </button>
  )
}

export default Button;