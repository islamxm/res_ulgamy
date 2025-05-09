import { useState, useEffect } from "react"
import dayjs from "dayjs"
import { message } from "antd"
import { Fraction } from "@/models"
import { Duties, ScheduleStore } from "@/models/duty_models"
import { useDispatch, useSelector } from "@/store/hooks"
import { dutyScheduleActions } from "./dutyScheduleStoreSlice"
import useIdbDataService from "@/hooks/useIdbDataService"
import { updateSchedule } from '@/store/slices/mainSlice';
import dateService from "@/services/dateService"
import { useNavigate } from "react-router"

const useDutySchedule = (id?: string) => {
  const dispatch = useDispatch()
  const { database } = useSelector(s => s.db)
  const { dataBase, messageApi } = useSelector(s => s.main)
  const { data, month } = useSelector(s => s.dutySchedule)
  const idbService = useIdbDataService()
  const navigate = useNavigate()
  const [topLevelFractions, setTopLevelFractions] = useState<Fraction[]>([])
  const { fractions } = dataBase

  // получение основных подразделений
  useEffect(() => {
    setTopLevelFractions(fractions.filter(fraction => fraction.isMainFrac))
  }, [fractions])

  // получение данных расписания по айди
  useEffect(() => {
    if (id && database) {
      idbService.getSchedule({
        db: database,
        data: Number(id),
        onsuccess(r) {
          dispatch(dutyScheduleActions.setInitData({ data: r.body }))
          dispatch(dutyScheduleActions.updateMonth({ date: dayjs(r.date) }))
        },
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

  // сохранение расписания
  const saveSchedule = () => {
    if (database && month) {
      if (id) {
        const modSchedule: ScheduleStore[0] = {
          id: Number(id),
          date: dayjs(month).toDate(),
          body: data
        }
        idbService.putSchedule({
          db: database,
          data: modSchedule,
          onsuccess(r) {
            if (r) dispatch(updateSchedule({ action: 'put', data: modSchedule }))
            messageApi?.success(`${dateService.getMonthName(dayjs(modSchedule.date).month())} aýynyň rejesi üýtgedildi`)
            navigate(-1)
          }
        })
      } else {
        const newSchedule: Pick<ScheduleStore[0], 'date' | 'body'> = {
          date: dayjs(month).toDate(),
          body: data
        }
        idbService.addSchedule({
          db: database,
          data: newSchedule,
          onsuccess(r) {
            if (r) {
              dispatch(updateSchedule({ action: 'add', data: { ...newSchedule, id: Number(r) } }))
              messageApi?.success(`${dateService.getMonthName(dayjs(newSchedule.date).month())} aýynyň rejesi goşuldy`)
              navigate(-1)
            }
          },
        })
      }
    }
  }

  // удаление расписания
  const deleteSchedule = () => {
    let monthName = dateService.getMonthName(dayjs(month).month())
    if (database && id) {
      idbService.deleteSchedule({
        db: database,
        data: Number(id),
        onsuccess(value) {
          if (value) {
            dispatch(updateSchedule({
              action: 'delete',
              data: {
                id: Number(id),
                body: data,
                date: dayjs(month).toDate()
              }
            }))
            messageApi?.success(`${monthName} aýynyň rejesi pozuldy`)
            navigate(-1)
          }
        },
      })
    }
  }

  // изменение месяца
  const onMonthChange = (e: dayjs.Dayjs, ...args: any[]) => {
    if (dataBase.schedules.find(schedule => dayjs(schedule.date).format('MM.YYYY') === dayjs(e).format('MM.YYYY'))) {
      messageApi?.error(`${dateService.getMonthName(e.month())} aýynyň rejesi girizilen`)
    } else dispatch(dutyScheduleActions.updateMonth({ date: e }))
  }

  // сохранение выбранных нарядов
  const saveSelectedDuties = (duties: Duties[]) => dispatch(dutyScheduleActions.addGroup({ duties, topLevelFractions }))


  const clear = () => {
    dispatch(dutyScheduleActions.setInitData({data: []}))
    dispatch(dutyScheduleActions.updateMonth({date: undefined}))
  }

  useEffect(() => () => clear(), [])

  return {
    data,
    month,
    topLevelFractions,

    saveSelectedDuties,
    onMonthChange,
    saveSchedule,
    deleteSchedule,
  }
}

export default useDutySchedule