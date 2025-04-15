import { FC, useEffect, useState } from 'react';
import classes from './classes.module.scss'
import { Row, Col, DatePicker, message } from 'antd'
import { PlusOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons'
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import Button from '@/ui/shared/button';
import Panel from '@/ui/shared/panel';
import { ScheduleStore } from '@/models/duty_models';
import { Fraction } from '@/models';
import useSwitcher from '@/hooks/useModal';
import useIdbDataService from '@/hooks/useIdbDataService';
import { useDispatch, useSelector } from '@/store/hooks';
import { updateSchedule } from '@/store/slices/mainSlice';
import dateService from '@/utils/dateService';
import SelectDutyModal from './modals/selectDutyModal';
import Group from './components/group';
import { dutyScheduleActions } from './dutyScheduleStoreSlice';

const Duty_monthSchedulePage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const { database } = useSelector(s => s.db)
  const { dataBase } = useSelector(s => s.main)
  const { data, month } = useSelector(s => s.dutySchedule)
  const [messageApi, messageHolder] = message.useMessage()
  const idbService = useIdbDataService()
  const { isOpen, close, open } = useSwitcher(false)
  const [topLevelFractions, setTopLevelFractions] = useState<Fraction[]>([])
  const { fractions } = dataBase

  // получение основных подразделений
  useEffect(() => {
    setTopLevelFractions(fractions.filter(fraction => fraction.isMainFrac))
  }, [fractions])

  // получение данных расписания по айди
  useEffect(() => {
    if (id && database) {
      idbService.getSchedule(database, Number(id)).then(res => {
        dispatch(dutyScheduleActions.setInitData({ data: res.body }))
        dispatch(dutyScheduleActions.updateMonth({ date: dayjs(res.date) }))
      })
    } else {
      dispatch(dutyScheduleActions.setInitData({ data: [] }))
      dispatch(dutyScheduleActions.updateMonth({ date: undefined }))
    }
  }, [id, database])

  //генерация дней в зависимости от выбранного месяца
  useEffect(() => {
    if (month) {
      dispatch(dutyScheduleActions.setDaysInMonth(new Array(month.daysInMonth()).fill(1).map((_, index) => index + 1)))
    }
  }, [month])

  // сохранение результата
  const saveResult = () => {
    if (database && month) {
      if (id) {
        const modSchedule: ScheduleStore[0] = {
          id: Number(id),
          date: dayjs(month).toDate(),
          body: data
        }
        idbService.putSchedule(database, modSchedule).then(res => {
          console.log(res) 
          if(res) dispatch(updateSchedule({ action: 'put', data: modSchedule }))
        })
      } else {
        const newSchedule: Pick<ScheduleStore[0], 'date' | 'body'> = {
          date: dayjs(month).toDate(),
          body: data
        }
        idbService.addSchedule(database, newSchedule).then(res => {
          if (res) {
            dispatch(updateSchedule({ action: 'add', data: { ...newSchedule, id: Number(res) } }))
          }
        })
      }
    }
  }

  // изменение месяца
  const onMonthChange = (e: dayjs.Dayjs, ...args: any[]) => {
    if (dataBase.schedules.find(schedule => dayjs(schedule.date).format('MM.YYYY') === dayjs(e).format('MM.YYYY'))) {
      messageApi.error(`${dateService.getMonthName(e.month())} aýynyň rejesi girizilen`)
    } else dispatch(dutyScheduleActions.updateMonth({ date: e }))
  }

  // удаление расписания по айди
  const deleteSchedule = () => {
    if (database && id) {
      idbService.deleteSchedule(database, Number(id)).then(res => {
        if(res) {
          dispatch(updateSchedule({
            action: 'delete',
            data: {
              id: Number(id),
              body: data,
              date: dayjs(month).toDate()
            }
          }))
        }
      })
    }
  }


  return (
    <div className={classes.wrapper}>
      {messageHolder}
      <SelectDutyModal
        modalProps={{ open: isOpen, onCancel: close }}
        onSave={duties => dispatch(dutyScheduleActions.addGroup({ duties, topLevelFractions }))}
      />
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
          )
        }

        <Col span={24}>
          <div className={classes.action}>
            <Row justify={'center'} gutter={[10, 10]}>
              <Col>
                <Button
                  disabled={!month}
                  onClick={open}
                  beforeIcon={<PlusOutlined />}
                  colorVariant={'success'}>
                  Tabşyrygy goş
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={saveResult}
                  beforeIcon={<SaveOutlined />}
                  colorVariant={'info'}>
                  Ýatda sakla
                </Button>
              </Col>
              {
                id && (
                  <Col>
                    <Button
                      onClick={deleteSchedule}
                      colorVariant={'danger'}
                      beforeIcon={<DeleteOutlined />}
                    // styleVariant={'outlined'}
                    >
                      Rejäni poz
                    </Button>
                  </Col>
                )
              }
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Duty_monthSchedulePage;