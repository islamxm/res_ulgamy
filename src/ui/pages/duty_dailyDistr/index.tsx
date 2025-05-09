import { FC, ReactNode, useEffect } from 'react';
import dutyService from '@/services/dutyService';
import { useSelector } from '@/store/hooks';
import dayjs from 'dayjs';

type Props = {
  
}

const Duty_dailyDistr:FC<Props> = () => {
  const {dataBase} = useSelector(s => s.main)
  const {schedules, distributions} = dataBase
  
  useEffect(() => {
    if(schedules && distributions) {
      
      // const daysInCurrentMonth = new Array(dayjs().daysInMonth()).fill(0).map((_,index) => index + 1)

      //schedule of current month
      const currentMonthSchedule = schedules.find(f => dayjs(f.date).format('MM.YYYY') === dayjs().format('MM.YYYY'))
      
      //distribution of current month
      const currentMonthDistr = distributions.find(f => dayjs(f.date).format('MM.YYYY') === dayjs().format('MM.YYYY'))
      
      if(currentMonthSchedule && currentMonthDistr) {
        dutyService.generateDailyDuty({
          day: 1,
          schedule: currentMonthSchedule.body,
          distr: currentMonthDistr.body
        })
      }
    }
  },[schedules, distributions])

  return(
    <div></div>
  )
}

export default Duty_dailyDistr