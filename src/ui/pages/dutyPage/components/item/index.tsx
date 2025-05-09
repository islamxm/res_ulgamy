import { FC, ReactNode } from 'react';
import classes from './classes.module.scss'
import { Col, Row } from 'antd';
import { setClassNames } from '@/utils/globalUtils';
import {PlusOutlined, FlagOutlined} from '@ant-design/icons'
import { Link, To } from 'react-router';

type Props = {
  title?: string,
  date?: string,
  ex?: string,
  link: To,
  isAddButton?: boolean,
  isDailyDuty?: boolean,
  onClick?: (...args:any[]) => any
}

const Item: FC<Props> = ({
  title,
  date,
  ex,
  isAddButton,
  link,
  onClick,
  isDailyDuty
}) => {
  if (isAddButton) {
    return (
      <Link to={link} onClick={onClick} className={setClassNames([classes.wrapper, classes.add, isDailyDuty && classes.dailyduty])}>
        <Row style={{height: '100%'}}>
          <Col span={24}>
            <div className={classes.icon}>
              {isDailyDuty ? <FlagOutlined/> : <PlusOutlined/>}
            </div>
          </Col>
          <Col span={24}>
            <div className={classes.date}>
              {isDailyDuty ? 'Şü günki tabşyryklary düz' : 'Goşmak'}
            </div>
          </Col>
        </Row>
      </Link>
    )
  }
  return (
    <Link to={link} className={classes.wrapper}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <div className={classes.title}>{title}</div>
        </Col>
        <Col span={24}>
          <div className={classes.date}>{date}</div>
        </Col>
        <Col span={24}>
          <div className={classes.ex}>{ex}</div>
        </Col>
      </Row>
    </Link>
  )
}

export default Item