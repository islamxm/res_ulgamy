import { FC, ReactNode, useEffect } from 'react';
import classes from './classes.module.scss'
import { Row, Col } from 'antd'
import { useParams } from 'react-router';
import { useDispatch, useSelector } from '@/store/hooks';
import { staffPersonActions } from './staffPersonStoreSlice';
import MainCard from './components/mainCard';
import Calendar from './components/calendar';

type Props = {

}

const StaffPersonPage: FC<Props> = () => {
  const { dataBase: { personnel } } = useSelector(s => s.main)
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(staffPersonActions.getUserData({ id: Number(id), personnel }))
  }, [id])

  return (
    <div className={classes.wrapper}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <MainCard />
        </Col>
        <Col span={24}>
          <Calendar />
        </Col>
      </Row>

    </div>
  )
}

export default StaffPersonPage