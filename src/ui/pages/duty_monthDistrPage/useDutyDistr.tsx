import { useEffect } from "react"
import dayjs from "dayjs"
import useIdbDataService from "@/hooks/useIdbDataService"
import { useSelector, useDispatch } from "@/store/hooks"
import { dutyDistrActions } from "./dutyDistrStoreSlice"
import dateService from "@/utils/dateService"
import { DistrStore } from "@/models/duty_models"
import { updateDistribution } from "@/store/slices/mainSlice"
import { useNavigate } from "react-router"

const useDutyDistr = (id?: string) => {
  const dispatch = useDispatch()
  const { database } = useSelector(s => s.db)
  const { dataBase, messageApi } = useSelector(s => s.main)
  const { month, topLevelFractions, result } = useSelector(s => s.dutyDistr)
  const idbDataService = useIdbDataService()
  const navigate = useNavigate()
  const { fractions } = dataBase


  useEffect(() => {
    if (fractions.length > 0) dispatch(dutyDistrActions.updateTopLevelFraction({ fractions }))
  }, [fractions])



  useEffect(() => {
    if (id && database) {
      idbDataService.getDistribution({
        db: database,
        data: Number(id),
        onsuccess(value) {
          dispatch(dutyDistrActions.setInitResult({ result: value.body }))
          dispatch(dutyDistrActions.updateMonth({ date: dayjs(value.date) }))
        },
      })
    }
  }, [id, database])

  const saveDistribution = () => {
    const monthAsDate = dayjs(month).toDate()
    if (database) {
      if (id) {
        const modDistr: DistrStore[0] = {
          id: Number(id),
          date: monthAsDate,
          body: result
        }
        idbDataService.putDistribution({
          db: database,
          data: modDistr,
          onsuccess(value) {
            dispatch(updateDistribution({ action: 'put', data: modDistr }))
            messageApi?.success(`${dateService.getMonthName(dayjs(month).month())} aýynyň bölümçeler boýunça tabşyryklary üýtgedildi`)
            navigate(-1)
          },
        })
      } else {
        const newDistr: Pick<DistrStore[0], 'body' | 'date'> = {
          date: monthAsDate,
          body: result
        }
        idbDataService.addDistribution({
          db: database,
          data: newDistr,
          onsuccess(value) {
            dispatch(updateDistribution({ action: 'add', data: { ...newDistr, id: Number(value) } }))
            messageApi?.success(`${dateService.getMonthName(dayjs(month).month())} aýynyň bölümçeler boýunça tabşyrygy girizildi`)
            navigate(-1)
          },
        })
      }
    }
  }

  const deleteDistribution = () => {
    if (database && id) {
      idbDataService.deleteDistribution({
        db: database,
        data: Number(id),
        onsuccess(value) {
          dispatch(updateDistribution({ action: 'delete', data: { id: Number(id), date: dayjs(month).toDate(), body: result } }))
          messageApi?.success(`${dateService.getMonthName(dayjs(month).month())} aýynyň bölümçeler boýunça tabşyryklary pozuldy`)
          navigate(-1)
        }
      })
    }
  }

  const onMonthChange = (date: dayjs.Dayjs) => {
    if (dataBase.distributions.find(distr => dayjs(distr.date).format('MM.YYYY') === dayjs(date).format('MM.YYYY'))) {
      messageApi?.error(`${dateService.getMonthName(date.month())} aýynyň tabşyryklary girizilen`)
    } else dispatch(dutyDistrActions.updateMonth({ date }))
  }

  const clear = () => {
    dispatch(dutyDistrActions.setInitResult({result: []}))
    dispatch(dutyDistrActions.updateMonth({date: undefined}))
  }

  useEffect(() => () => clear(), [])

  return {
    month,
    result,
    topLevelFractions,

    saveDistribution,
    deleteDistribution,
    onMonthChange,
    clear
  }
}

export default useDutyDistr