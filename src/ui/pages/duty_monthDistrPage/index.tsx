import { FC, useEffect } from 'react';
import classes from './classes.module.scss'
import { Row, Col, DatePicker } from 'antd';
import Panel from '@/ui/shared/panel';
import dateLocalize from '@/utils/dateService';
import FractionPart from './components/fractionPart';
import Button from '@/ui/shared/button';
import { DownloadOutlined } from '@ant-design/icons'
import docService from '@/utils/docService';
import { useDispatch, useSelector } from '@/store/hooks';
import { dutyDistrActions } from './dutyDistrStoreSlice';
import { useParams } from 'react-router';
import useIdbDataService from '@/hooks/useIdbDataService';
import dayjs from 'dayjs';

type Props = {

}

const Duty_MonthDistrPage: FC<Props> = () => {
  const {
    getDistribution,
    putDistribution,
    addDistribution
  } = useIdbDataService()
  const { database } = useSelector(s => s.db)
  const { id } = useParams<{ id: string }>()
  const { dataBase: { fractions } } = useSelector(s => s.main)
  const { month, topLevelFractions, result } = useSelector(s => s.dutyDistr)
  const dispatch = useDispatch()

  useEffect(() => {
    if (fractions.length > 0) dispatch(dutyDistrActions.updateTopLevelFraction({ fractions }))
  }, [fractions])

  useEffect(() => {
    if (id && database) {
      getDistribution(database, Number(id)).then(res => {
        dispatch(dutyDistrActions.setInitResult({ result: res.body }))
        dispatch(dutyDistrActions.updateMonth({ date: dayjs(res.date) }))
      })
    }
  }, [id, database])

  const saveResult = () => {
    if(database) {
      if (id) {
        putDistribution(database, {id: Number(id), date: dayjs(month).toDate(), body: result}).then(res => {
          if(res) {
            dispatch()
          }
        })
      } else {
        addDistribution(database, {date: dayjs(month).toDate(), body: result}).then(res => {

        })
      }
    }
  }


  return (
    <div className={classes.wrapper}>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Panel
            label="Haýsy aý"
          >
            <Row gutter={10}>
              <Col span={24}>
                <DatePicker
                  cellRender={dateLocalize.renderMonthNames}
                  value={month}
                  onChange={e => dispatch(dutyDistrActions.updateMonth({ date: e }))}
                  picker={'month'} />
              </Col>
            </Row>
          </Panel>
        </Col>
        <Col className={classes.body} span={24}>
          <Row gutter={[10, 40]}>
            {
              topLevelFractions.map(fraction => (
                <Col key={fraction.id} span={24}>
                  <FractionPart
                    fraction={fraction}
                  />
                </Col>
              ))
            }
          </Row>
        </Col>
        {
          (result.length > 0 && month) && (
            <Col className={classes.action} span={24}>
              <Row gutter={[10, 10]}>
                <Col flex={'auto'}>
                  <Button
                    onClick={saveResult}
                    isFill
                    colorVariant={'success'}
                    styleVariant={'solid'}>
                    Ýatda sakla
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled
                    onClick={() => docService.monthDistribution({
                      date: dayjs(month).format('MM.YYYY'),
                      body: result
                    }, topLevelFractions)}
                    beforeIcon={<DownloadOutlined />}
                    styleVariant={'solid'}
                    colorVariant={'warning'}>
                    Habarnamany ýükle
                  </Button>
                </Col>
              </Row>
            </Col>
          )
        }

      </Row>
    </div>
  )
}

export default Duty_MonthDistrPage