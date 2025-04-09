import { FC, useEffect, useState } from 'react';
import classes from './classes.module.scss'
import { Col, Input, message, Row, Tag } from 'antd';
import { MonthScheduleDataType } from '../..';
import dayjs from 'dayjs';
import setClassNames from '@/utils/setClassNames';
import Button from '@/ui/shared/button';
import { CopyOutlined, DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from '@/store/hooks';
import { dutyScheduleActions } from '../../dutyScheduleStoreSlice';

type Props = {
  index: number
  data: MonthScheduleDataType
}

const Group: FC<Props> = ({
  data,
  index
}) => {
  const dispatch = useDispatch()
  const dutySchedule = useSelector(s => s.dutySchedule)



  const selectAll = (fractionId: number) => {
    dispatch(dutyScheduleActions.selectAllDate({ index, fractionId, days: dutySchedule.daysInMonth }))
  }

  const copy = (fractionId: number) => {
    dispatch(dutyScheduleActions.copyDateScheme({
      days: dutySchedule.data[index].body.find(t => t.fraction.id === fractionId)?.days || []
    }))
    // message.open({
    //   content: 'Günler kopiýalandy',
    //   icon: <CopyOutlined/>
    // })
  }

  const paste = () => {

  }

  return (
    <div className={classes.wrapper}>
      <Row gutter={[5, 5]}>
        <Col span={24}>
          <Row gutter={[5, 5]}>
            <Col flex={'auto'}>
              <Input
                value={data.title}
                placeholder='Tabşyryk toparynyň ady'
                size={'large'}
                onChange={e => dispatch(dutyScheduleActions.updateTitle({ value: e.target.value, index }))}
              />
            </Col>
            <Col>
              <Row gutter={[5, 5]}>
                <Col><Button onClick={() => dispatch(dutyScheduleActions.deleteGroup({ index }))} colorVariant={'danger'} beforeIcon={<DeleteOutlined />}>Poz</Button></Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col className={classes.duties} span={24}>
          {
            data.duties.map(duty => (
              <Tag className={classes.duty_tag} color={'cyan'}>{duty}</Tag>
            ))
          }
        </Col>
        <Col className={classes.fractions} span={24}>
          <Row gutter={[5, 5]}>
            {
              data.body.map(f => (
                <Col span={4}>
                  <div className={classes.fraction}>
                    <Row gutter={[5, 5]}>
                      <Col span={24} className={classes.label}>{f.fraction.name.shortName}</Col>
                      <Col span={24} className={classes.days}>
                        {
                          dutySchedule.daysInMonth.map(day => (
                            <div onClick={() => dispatch(dutyScheduleActions.selectDate({ index, fractionId: f.fraction.id, date: day }))} className={setClassNames([classes.day, f.days.find(d => d === day) && classes.active])}>{day}</div>
                          ))
                        }
                        <div onClick={() => selectAll(f.fraction.id)} className={setClassNames([classes.day, classes.allDays])}>
                          her gün
                        </div>
                      </Col>
                      <Col span={24} className={classes.action}>
                        <Row gutter={[5, 5]}>
                          <Col span={24}>
                            <Button
                              onClick={() => copy(f.fraction.id)}
                              isFill
                              beforeIcon={<CopyOutlined />}
                              baseSize={'small'}>
                              Günlerini kopiýa et
                            </Button>
                          </Col>
                          <Col span={24}>
                            <Button
                              onClick={paste}
                              isFill
                              beforeIcon={<DownloadOutlined />}
                              baseSize={'small'}>
                              Kopiýany giriz
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>

                </Col>
              ))
            }
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Group