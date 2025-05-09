import { FC, ReactNode, useEffect } from 'react';
import classes from './classes.module.scss'

import { useParams } from 'react-router';
import { Row, Col, DatePicker } from 'antd'
import Panel from '@/ui/shared/panel';
import dateService from '@/services/dateService';
import Button from '@/ui/shared/button';
import useDutyCluster  from './useDutyCluster';
import { PlusOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons'
import dutyService from '@/services/dutyService';
import { useSelector } from '@/store/hooks';
import dayjs from 'dayjs';

const Duty_monthClustersPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const {
    data,
    month,
    source,

    renderClusterGroup,
    onMonthChange,
    saveClusterization
  } = useDutyCluster(id)

  useEffect(() => console.log(source), [source])

  return (
    <div className={classes.wrapper}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <div className={classes.date}>
            <Panel label='Haýsy aý'>
              <Row gutter={[10, 10]}>
                {
                  !id && (
                    <Col span={24}>
                      <DatePicker.MonthPicker
                        value={month}
                        placeholder='Aýyny saýla'
                        cellRender={dateService.renderMonthNames}
                        onChange={onMonthChange}
                      />
                    </Col>
                  )
                }
                {
                  month && (
                    <Col span={24}>
                      <Button baseSize='large' colorVariant={'info'} styleVariant={'simple'}>
                        <strong>{dateService.getMonthName(month.month())} aýy</strong>
                      </Button>
                    </Col>
                  )
                }
              </Row>
            </Panel>
          </div>
        </Col>
        {
          data.length > 0 && (
            <Col span={24}>
              <div className={classes.main}>
                <Row gutter={[20, 20]}>
                  {
                    data.map((d, dIndex) => (
                      <Col key={dIndex} span={24}>
                        {renderClusterGroup({...d, sourceData: source})}
                      </Col>
                    ))
                  }
                </Row>
              </div>
            </Col>
          )
        }
        <Col span={24}>
          <div className={classes.action}>
            <Row justify={'center'} gutter={[10, 10]}>
              <Col>
                <Button
                  onClick={saveClusterization}
                  beforeIcon={<SaveOutlined />}
                  colorVariant={'info'}>
                  Ýatda sakla
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Duty_monthClustersPage