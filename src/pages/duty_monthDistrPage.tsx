import { FC, ReactNode } from 'react';
import PageComponent from '@/ui/pages/duty_monthDistrPage';
import { Typography } from 'antd';
import { MonthDistrProvider, useMonthDistr } from '@/ui/pages/duty_monthDistrPage/useContext';
type Props = {

}

const Duty_monthDistrPage: FC<Props> = () => {
  const contextValue = useMonthDistr() 
  return (
    <MonthDistrProvider value={contextValue}>
      <Typography.Title level={2}>Aýlyk tabşyryklar</Typography.Title>
      <PageComponent />
    </MonthDistrProvider>
  )
}

export default Duty_monthDistrPage