import { useEffect } from "react"
import dayjs from "dayjs"
import useIdbDataService from "@/hooks/useIdbDataService"
import { useSelector, useDispatch } from "@/store/hooks"
import { dutyDistrActions } from "./dutyDistrStoreSlice"
import dateService from "@/services/dateService"
import { DistrStore } from "@/models/duty_models"
import { updateCluster, updateDistribution } from "@/store/slices/mainSlice"
import { useNavigate } from "react-router"
import clustersPresetConfig from "@/config/clustersPresetConfig"


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

            idbDataService.addCluster({
              db: database,
              data: {
                date: monthAsDate,
                body: clustersPresetConfig
              },
              onsuccess(cvalue) {
                dispatch(updateCluster({
                  action: 'add', data: {
                    date: monthAsDate,
                    body: clustersPresetConfig,
                    id: Number(cvalue)
                  }
                }))
              },
              onerror() {
                messageApi?.error('Klasterizasiýa döredilmedi')
              }
            })

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
          
          // idbDataService.getCluster({
          //   db: database,
            
          // })

          // idbDataService.deleteCluster({
          //   db: database,
          //   data: dayjs(month).toDate(),
          //   onsuccess(value) {
          //     dispatch(updateCluster({
          //       action: 'delete', data: {
          //         date: dayjs(month).toDate(),
          //         body: clustersPresetConfig,
          //         id: 0
          //       }
          //     }))
          //     messageApi?.success('Degişli klaster ýok edildi')
          //     navigate(-1)              
          //   },
          //   onerror() {
          //     messageApi?.error('Error when deleting cluster')
          //   }
          // })
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
    dispatch(dutyDistrActions.setInitResult({ result: [] }))
    dispatch(dutyDistrActions.updateMonth({ date: undefined }))
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