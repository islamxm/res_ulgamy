import { FC, ReactNode } from 'react';
import PageComponent from '@/ui/pages/duty_monthDistrPage';
import { Typography } from 'antd';
type Props = {

}

const Duty_monthDistrPage: FC<Props> = () => {
  return (
    <>
      <Typography.Title level={2}>Aýlyk tabşyryklar</Typography.Title>
      <PageComponent />
    </>
  )
}

export default Duty_monthDistrPage