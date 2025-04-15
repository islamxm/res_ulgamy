import { FC } from 'react';
import { Col, Row } from 'antd';
import Part from './components/part';
import { useSelector } from '@/store/hooks';
import Item from './components/item';
import dayjs from 'dayjs';
import dateService from '@/utils/dateService';


type Props = {

}

const DutyPage: FC<Props> = () => {
  const { dataBase } = useSelector(s => s.main)
  

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col
          span={24}>
          <Part
            title='Bölümçeler boýunça reje'
          >
            {
              dataBase.schedules.map(schedule => (
                <Item
                  link={`/duty/month_schedule/${schedule.id}`}
                  date={`${dayjs(schedule.date).format('YYYY')} ýyl`}
                  title={`${dateService.getMonthName(dayjs(schedule.date).month())}`}
                />
              ))
            }
            <Item
              link={'/duty/month_schedule'}
              isAddButton
            />
          </Part>
        </Col>
        <Col
          span={24}>
          <Part
            title='Aýlyk tabşyryga goýbermek'
          >
            {
              dataBase.distributions.map(distribution => (
                <Item
                  link={`/duty/month_distr/${distribution.id}`}
                  date={`${dayjs(distribution.date).format('YYYY')} ýyl`}
                  title={`${dateService.getMonthName(dayjs(distribution.date).month())}`}
                />
              ))
            }
            <Item
              link={'/duty/month_distr'}
              isAddButton
            />
          </Part>
        </Col>
        {/* <Col
          span={24}>
          <Part
            title='Gündelik tabşyryga goýbermek'
          >
            {

            }
            <Item
              isAddButton
            />
          </Part>
        </Col> */}
      </Row>
    </div>
  )
}

export default DutyPage;