import { FC, useEffect, useState } from 'react';
import classes from './classes.module.scss'
import { Row, Col, DatePicker } from 'antd'
import Button from '@/ui/shared/button';
import { PlusOutlined } from '@ant-design/icons'
import SelectDutyModal from './modals/selectDutyModal';
import useSwitcher from '@/hooks/useModal';
import { Duties } from '@/models/duty_models';
import { useDispatch, useSelector } from '@/store/hooks';
import { Fraction } from '@/models';
import Group from './components/group';
import { dutyScheduleActions } from './dutyScheduleStoreSlice';
import dateService from '@/utils/dateService';
import Panel from '@/ui/shared/panel';

type Props = {

}

export type MonthScheduleDataType = {
  title: string,
  duties: Duties[],
  body: {
    fraction: Fraction,
    days: number[]
  }[]
}

const Duty_monthSchedulePage: FC<Props> = () => {
  const dispatch = useDispatch()
  const { dataBase } = useSelector(s => s.main)
  const { data, month, daysInMonth } = useSelector(s => s.dutySchedule)
  const { fractions } = dataBase
  const { isOpen, close, open } = useSwitcher(false)
  const [topLevelFractions, setTopLevelFractions] = useState<Fraction[]>([])

  // получение основных подразделений
  useEffect(() => {
    setTopLevelFractions(fractions.filter(fraction => fraction.isMainFrac))
  }, [fractions])

  //генерация дней в зависимости от выбранного месяца
  useEffect(() => {
    if(month) {
      dispatch(dutyScheduleActions.setDaysInMonth(new Array(month.daysInMonth()).fill(1).map((_, index) => index + 1)))
    }
  }, [month])

  // получение адаптированного результата
  const getResult = () => {
    //удаление пустых групп и дней
    const modified = data.map(d => ({
      ...d,
      body: d.body.filter(f => f.days.length > 0)
    })).filter(s => s.body.length > 0)

    console.log(modified)

    // адаптация данных под схему базы данных
    let result = daysInMonth.map((day, dayIndex) => {
      let fractions:Set<number> = new Set()
      let duties:Set<Duties> = new Set()
      modified.forEach(group => {
        for(let f of group.body) {
          if(f.days.find(d => d === day)) {
            fractions.add(f.fraction.id)
            group.duties.forEach(duty => duties.add(duty))
          } 
        }
      })
      return ({
        day,
        fractions: Array.from(fractions),
        duties: Array.from(duties)
      })
    })

    console.log(result)
  }

  return (
    <div className={classes.wrapper}>
      <SelectDutyModal
        modalProps={{ open: isOpen, onCancel: close }}
        onSave={duties => dispatch(dutyScheduleActions.addGroup({ duties, topLevelFractions }))}
      />
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <div className={classes.date}>
            <Panel label='Haýsy aý'>
              <DatePicker.MonthPicker
                value={month}
                placeholder='Aýyny saýla'
                cellRender={dateService.renderMonthNames}
                onChange={e => dispatch(dutyScheduleActions.selectMonth(e))}
              />
            </Panel>
          </div>
        </Col>
        <Col span={24}>
          <div className={classes.main}>
            <Row gutter={[20, 20]}>
              {
                data.map((d, dIndex) => (
                  <Col span={24}>
                    <Group
                      index={dIndex}
                      data={d}
                    />
                  </Col>
                ))
              }
            </Row>
          </div>
        </Col>
        <Col span={24}>
          <div className={classes.action}>
            <Row justify={'center'} gutter={[10, 10]}>
              <Col>
                <Button
                  onClick={open}
                  beforeIcon={<PlusOutlined />}
                  colorVariant={'success'}>
                  Tabşyrygy goş
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={getResult}
                  colorVariant={'info'}>
                  Netije
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Duty_monthSchedulePage;