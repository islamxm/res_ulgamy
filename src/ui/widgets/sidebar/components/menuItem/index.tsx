import { FC, ReactNode } from 'react';
import Button from '@/ui/shared/button';

type Props = {
  id: number,
  title: string,
  path: string,
  icon: ReactNode,
  isActive: boolean
  isDisabled?: boolean
}

const MenuItem:FC<Props> = ({
  // id,
  title,
  path,
  icon,
  isActive,
  isDisabled
}) => {
  return(
    <Button
      link={{to: {pathname: path}}}
      colorVariant={'primary'}
      styleVariant={isActive ? 'solid' : 'simple'}
      justify={'flex-start'}
      beforeIcon={icon}
      children={title}
      isFill
      disabled={isDisabled}
      />
  )
}

export default MenuItem