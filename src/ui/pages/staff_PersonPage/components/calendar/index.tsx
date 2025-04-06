import { FC } from 'react';
import classes from './classes.module.scss'
import Panel from '@/ui/shared/panel';
import { Calendar as AntCalendar } from 'antd';
import { useSelector } from '@/store/hooks';

const Calendar: FC = () => {
  const {userData} = useSelector(s => s.staffPerson)
  
  return (
    <Panel>
      <div className={classes.wrapper}>
        <AntCalendar
          />
      </div>
    </Panel>
  )
}

export default Calendar