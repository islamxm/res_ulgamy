import { ChangeEventHandler, FC, ReactEventHandler, ReactNode } from 'react';
import classes from './classes.module.scss'
import { Input } from 'antd';
import {SearchOutlined} from '@ant-design/icons'

type Props = {
  onChange?: ChangeEventHandler<HTMLInputElement>,
  value: string
}

const StaffSearch:FC<Props> = ({
  onChange,
  value 
}) => {
  return(
    <div className={classes.wrapper}>
      <Input
        size='large'
        value={value}
        onChange={onChange} 
        prefix={<SearchOutlined/>} 
        placeholder='Harby gullukçyny gözle'/>
    </div>
  )
}

export default StaffSearch;