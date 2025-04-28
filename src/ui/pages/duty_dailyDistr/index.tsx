import { FC, ReactNode, useEffect } from 'react';
// import classes from './classes.module.scss'
import dutyBuilder from '@/utils/dutyBuilder';
import { useSelector } from '@/store/hooks';
import dayjs from 'dayjs';

type Props = {
  
}

const Duty_dailyDistr:FC<Props> = () => {
  const {dataBase} = useSelector(s => s.main)
  const {schedules} = dataBase
  
  useEffect(() => {
    if(schedules) {
      //schedule of current month
      const sc = schedules.find(f => dayjs(f.date).format('MM.YYYY') === dayjs().format('MM.YYYY'))
      console.log(sc)
      const daysInCurrentMonth = new Array(dayjs().daysInMonth()).fill(0).map((_,index) => index + 1)

      if(sc) {

        const test = dutyBuilder.filterSchedule(sc.body, daysInCurrentMonth)
        console.log(test)
      }

    }
  },[schedules])

  return(
    <div></div>
  )
}

export default Duty_dailyDistr