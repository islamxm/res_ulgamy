import { useDispatch, useSelector } from "@/store/hooks"
import { dutyClusterActions } from "./dutyClusterStoreSlice"
import dayjs from "dayjs"
import dateService from "@/services/dateService"
import { useEffect, useState } from "react"
import useIdbDataService from "@/hooks/useIdbDataService"
import ClusterRotaGroup from "./components/clusterGroups/clusterRotaGroup"
import ClusterGarawulGroup from "./components/clusterGroups/clusterGarawulGroup"
import { Cluster, ClusterStore } from "@/models/duty_cluster_models"
import dutyService, { FDistrReturnType } from "@/services/dutyService"
import { PersonFull } from "@/models"
import { updateCluster } from "@/store/slices/mainSlice"
import { useNavigate } from "react-router"

const useDutyCluster = (id?: string) => {
  const dispatch = useDispatch()
  const {database} = useSelector(s => s.db)
  const { dataBase, messageApi } = useSelector(s => s.main)
  const { month, data } = useSelector(s => s.dutyCluster)
  const navigate = useNavigate()
  const idbService = useIdbDataService()
  const [source, setSource] = useState<FDistrReturnType>([])

  //получение исходных данных
  useEffect(() => {
    if(dataBase.schedules && dataBase.distributions) {
      // const daysInCurrentMonth = new Array(dayjs().daysInMonth()).fill(0).map((_,index) => index + 1)

      //schedule of current month
      const currentMonthSchedule = dataBase.schedules.find(f => dayjs(f.date).format('MM.YYYY') === dayjs().format('MM.YYYY'))
      
      //distribution of current month
      const currentMonthDistr = dataBase.distributions.find(f => dayjs(f.date).format('MM.YYYY') === dayjs().format('MM.YYYY'))
      
      if(currentMonthSchedule && currentMonthDistr) {
        setSource(dutyService.generateDailyDuty({
          day: 1,
          schedule: currentMonthSchedule.body,
          distr: currentMonthDistr.body
        }))
      }
    }
  }, [dataBase])

  // получение данных расписания по айди
  useEffect(() => {
    if (id && database) {
      idbService.getCluster({ 
        db: database,
        data: Number(id),
        onsuccess(r) {
          dispatch(dutyClusterActions.setInitData({ data: r.body }))
          dispatch(dutyClusterActions.updateMonth({ date: dayjs(r.date) }))
        },
      })
    } else {
      dispatch(dutyClusterActions.setInitData({ data: [] }))
      dispatch(dutyClusterActions.updateMonth({ date: undefined }))
    }
  }, [id, database])

  const onMonthChange = (e: dayjs.Dayjs, ...args: any[]) => {
    if (dataBase.clusters.find(schedule => dayjs(schedule.date).format('MM.YYYY') === dayjs(e).format('MM.YYYY'))) {
      messageApi?.error(`${dateService.getMonthName(e.month())} aýynyň klasterizasiýasy düzülen`)
    } else dispatch(dutyClusterActions.updateMonth({ date: e }))
  }

  const renderClusterGroup = (props: Cluster[0] & {sourceData: FDistrReturnType}) => {
    switch(props.dutyGroupId) {
      case 1:
        return <ClusterRotaGroup {...props}/>
      case 12:
        return <ClusterGarawulGroup {...props}/>
      default:
        return null        
    }
  }

  const saveClusterization = () => {
    if(database && month && id) {
      const clusterization:ClusterStore[0] = {
        id: Number(id),
        date: dayjs(month).toDate(),
        body: data
      }
      idbService.putCluster({
        db: database,
        data: clusterization,
        onsuccess(r) {
          if (r) dispatch(updateCluster({ action: 'put', data: clusterization }))
          messageApi?.success(`${dateService.getMonthName(dayjs(clusterization.date).month())} aýynyň klasterizasiýasy üýtgedildi`)
          navigate(-1)
        }
      })
    }
  }

  return {
    month,
    data,
    source,

    onMonthChange,
    renderClusterGroup,
    saveClusterization
  }
}

export default useDutyCluster