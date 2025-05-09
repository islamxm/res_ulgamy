import { Typography } from 'antd';
import { FC, ReactNode } from 'react';
import PageComponent from '@/ui/pages/dutyPage';
type Props = {
  
}

const DutyPage:FC<Props> = () => {
  return(
    <>
    <Typography.Title level={2}>Tabşyryklar bölümi</Typography.Title>
    <PageComponent/>
    </>
  )
}

export default DutyPage