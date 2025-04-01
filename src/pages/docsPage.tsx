import { Typography } from 'antd';
import { FC, ReactNode } from 'react';
import PageComponent from '@/ui/pages/docsPage';

type Props = {
  
}

const DocsPage:FC<Props> = () => {
  return(
    <div>
      <Typography.Title level={2}>Resminamalar</Typography.Title>
      <PageComponent/>
    </div>
  )
}

export default DocsPage