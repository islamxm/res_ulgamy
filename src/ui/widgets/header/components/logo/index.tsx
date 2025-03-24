import { FC, ReactNode } from 'react';
import classes from './classes.module.scss'
import Button from '@/ui/shared/button';
import { Flex } from 'antd';
import { ReadOutlined } from '@ant-design/icons'
import { Link } from 'react-router';

type Props = {

}

const Logo: FC<Props> = () => {
  return (
    <Link to={'/'} className={classes.wrapper}>
      <Flex align={'center'}>
        <div className={classes.logo}>
          <Button
            isIcon
            isCircle
            baseSize='large'
            styleVariant={'solid'}
          //  colorVariant=''
          >
            <ReadOutlined />
          </Button>
        </div>
        <div className={classes.label}>Resminamalar</div>
      </Flex>
    </Link>
  )
}

export default Logo;