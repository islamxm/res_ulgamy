import { FC, PropsWithChildren, ReactNode } from 'react';
import classes from './classes.module.scss'
import useCollapse from '@/hooks/useCollapse';
import { Col, Flex, Row } from 'antd';
import Button from '@/ui/shared/button';
import { DownOutlined } from '@ant-design/icons'

type Props = PropsWithChildren<{
  title: string
}>

const Part: FC<Props> = ({
  children,
  title
}) => {
  const {
    ref,
    bodyStyle,
    arrowStyle,
    isOpen,
    toggle
  } = useCollapse(true)

  return (

    <div className={classes.wrapper}>
      <div className={classes.head}>
        <Row gutter={[5, 5]}>
          <Col flex={"auto"}>
            <Button
              onClick={toggle}
              afterIcon={<DownOutlined style={arrowStyle}/>}
              justify={'space-between'}
              colorVariant={isOpen ? 'info' : 'info'}
              styleVariant={isOpen ? 'solid' : 'outlined'}
              isFill>{title}</Button>
          </Col>
        </Row>
      </div>
      <div className={classes.body} ref={ref} style={bodyStyle}>
        <Flex gap={5} wrap className={classes.in}>
          {children}
        </Flex>
      </div>
    </div>
  )
}

export default Part