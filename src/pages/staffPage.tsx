import { Typography } from 'antd';
import { FC, ReactNode } from 'react';
// import classes from './classes.module.scss'
import PageComponent from '@/ui/pages/staffPage';

type Props = {
  
}

const StaffPage:FC<Props> = () => {
  return(
    <>
    <Typography.Title level={2}>Düzüm bölümi</Typography.Title>
    <PageComponent/>
    </>
  )
}

export default StaffPage