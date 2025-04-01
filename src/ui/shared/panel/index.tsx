import { FC, PropsWithChildren, ReactNode } from 'react';
import classes from './classes.module.scss'
import { Col, Row, Typography } from 'antd';

type Props = PropsWithChildren<{
  label?: string,
  padding?: number,
  spacingBetweenElements?: number
}>

const Panel: FC<Props> = ({
  children,
  label,
  padding,
  spacingBetweenElements = 10
}) => {
  return (
    <div style={{ padding }} className={classes.wrapper}>
      <Row gutter={[spacingBetweenElements ?? 10,spacingBetweenElements ?? 10]}>
        {
          label &&
          <Col span={24} className={classes.label}>
            {label}
          </Col>
        }
        {children && (
          <Col span={24}>
            {children}
          </Col>
        )}
      </Row>
    </div>
  )
}

export default Panel