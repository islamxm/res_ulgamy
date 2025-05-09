import { FC } from 'react';
import { Col, Row } from 'antd';
import Part from './components/part';
import { useSelector } from '@/store/hooks';
import Item from './components/item';
import dayjs from 'dayjs';
import dateService from '@/services/dateService';

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
                  key={schedule.id}
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
                  key={distribution.id}
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
        <Col span={24}>
          <Part
            title='Klasterizasiýa'
            >
            {
              dataBase.clusters.map(cluster => (
                <Item
                  key={cluster.id}
                  link={`/duty/month_clusters/${cluster.id}`}
                  date={`${dayjs(cluster.date).format('YYYY')} ýyl`}
                  title={`${dateService.getMonthName(dayjs(cluster.date).month())}`}
                  />
              ))
            }
          </Part>
        </Col>
        <Col
          span={24}>
          <Part
            title='Gündelik tabşyryklar'
          >
            <Item
              isDailyDuty={true}
              link={''}
              isAddButton
            />
          </Part>
        </Col>
      </Row>
    </div>
  )
}

export default DutyPage;