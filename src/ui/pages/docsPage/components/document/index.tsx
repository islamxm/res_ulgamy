import { FC, ReactNode } from 'react';
import classes from './classes.module.scss'
import { DocTemplate } from '@/models';
import { Flex, Tooltip } from 'antd';


type Props = DocTemplate & {
  
}


const Bg = () => {
  return (
    <div className={classes.bg}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

const Document:FC<Props> = ({
  id,
  name,
}) => {
  return(
    <Tooltip title={name} placement={'bottom'}>
    <Flex vertical className={classes.wrapper}>
      <Flex justify='center' align='center' className={classes.main}>
        <Bg/>
        <div className={classes.placeholder}>{name[0].toUpperCase()}</div>
      </Flex>
      <div className={classes.info}>
        <div className={classes.title}>{name}</div>
      </div>
    </Flex>
    </Tooltip>
  )
}

export default Document;