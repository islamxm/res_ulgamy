import { Typography } from 'antd';
import { FC, ReactNode } from 'react';
// import classes from './classes.module.scss'
import PageComponent from '@/ui/pages/settingsPage';
type Props = {
  
}

const SettingsPage:FC<Props> = () => {
  return(
    <div>
      <Typography.Title level={2}>Sazlamalar</Typography.Title>
      <PageComponent/>
    </div>
  )
}

export default SettingsPage