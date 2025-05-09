import { useDispatch, useSelector } from "@/store/hooks"
import { dbActions } from "@/store/slices/dbSlice"
import { useEffect, useState } from "react"
import HARD_DB from "@/data/hard_db"
import { DATABASE } from "@/data/constants"
import idbUtils from "@/utils/idbUtils"
import useIdbDataService from "./useIdbDataService"
import { updateDataBase } from "@/store/slices/mainSlice"

const useIdb = () => {
  const idbDataService = useIdbDataService()
  const { config, database } = useSelector(s => s.db)
  const dispatch = useDispatch()
  const [actionAfterOpening, setActionAfterOpening] = useState<'init_data' | 'none' | 'get_data'>('none')
  const [isFilledWithData, setIsFilledWithData] = useState(false)


  //open database if config is setted and database not created yet
  useEffect(() => {
    if (config && !database) {
      open()
    }
  }, [database, config])

  useEffect(() => {
    if (database && isFilledWithData) {
      
      Promise.all([
        idbDataService.getAllFractions(database),
        idbDataService.getAllPersonnel(database),
        idbDataService.getAllPositions(database),
        idbDataService.getAllSchedules(database),
        idbDataService.getAllDistributions(database),
        idbDataService.getAllClusters(database)
      ])
        .then(res => {
          dispatch(updateDataBase({
            fractions: res[0],
            personnel: res[1],
            positions: res[2],
            schedules: res[3],
            distributions: res[4],
            clusters: res[5]
          }))
        })
    }
  }, [database, isFilledWithData])

  //open database
  const open = () => {
    dispatch(dbActions.updateStatus('connecting'))
    if (config) {
      let request = indexedDB.open(config.dbName, config.dbVersion)
      let upg = false
      request.onupgradeneeded = (e) => {
        upg = true
        let db = request.result
        if (e.oldVersion === 0) {
          initDB(db)
          setActionAfterOpening('init_data')
        }
        if (e.oldVersion < config.dbVersion) {
          updateDB()
        }
        if (e.oldVersion > config.dbVersion) {
          // db is deprecated
        }
      }
      request.onsuccess = () => {
        if (upg) {
          setActionAfterOpening('init_data')
        } else {
          setActionAfterOpening('get_data')
        }
        dispatch(dbActions.updateStatus('connected'))
        dispatch(dbActions.updateDbObject(request.result))
        console.log('[idb]:opened')

      }
      request.onerror = () => {
        dispatch(dbActions.updateStatus('error'))
        console.log('[idb]:open error')
      }
    }
  }

  //initialize database
  const initDB = (dbObject: IDBDatabase) => {
    if (config) {
      Object.entries(DATABASE.OBJECT_STORE_NAMES).map(os => os[1]).forEach(os => {
        if (!dbObject.objectStoreNames.contains(os)) {
          if (os === 'fractions') {
            let store = dbObject.createObjectStore(os, {
              keyPath: 'id',
              autoIncrement: true
            })
            store.createIndex('isMainFrac', 'isMainFrac')
          }
          if (os === 'personnel') {
            let store = dbObject.createObjectStore(os, {
              keyPath: 'id',
              autoIncrement: true
            })
            store.createIndex('status', 'status')
            store.createIndex('fraction', 'fractionId')
            store.createIndex('position', 'positionId')
            store.createIndex('rank', 'rank.rank')
          }
          if (os === 'positions') {
            let store = dbObject.createObjectStore(os, {
              keyPath: 'id',
              autoIncrement: true
            })
            store.createIndex('isHeadOfFraction', 'isHeadOfFraction')
            store.createIndex('fraction', 'fractionId')
          }
          if (os === 'distributions') {
            let store = dbObject.createObjectStore(os, {
              keyPath: 'id',
              autoIncrement: true
            })
            store.createIndex('date', 'date', {
              unique: true,
            })
          }
          if (os === 'schedules') {
            let store = dbObject.createObjectStore(os, {
              keyPath: 'id',
              autoIncrement: true
            })
            store.createIndex('date', 'date', {
              unique: true,
            })
          }
          if (os === 'clusters') {
            let store = dbObject.createObjectStore(os, {
              keyPath: 'id',
              autoIncrement: true
            })
            store.createIndex('date', 'date')
          }
        }
      })
    }
  }

  //update database
  const updateDB = () => {
    if (config) {

    }
  }

  //fill database
  useEffect(() => {
    if (actionAfterOpening === 'init_data' && database) {
      _fillDataBaseWithInitData().then(r => r && setIsFilledWithData(true)).catch(_ => setIsFilledWithData(false))
    }
    if(actionAfterOpening === 'get_data' && database) {
      setIsFilledWithData(true)
    }
  }, [actionAfterOpening, database])

  const _fillDataBaseWithInitData = () => new Promise((resolve, reject) => {
    const p1 = new Promise((res, rej) => {
      let personnelStore = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.personnel, 'readwrite', database)
      HARD_DB.personnel.forEach((person, index) => {
        let putReq = personnelStore.put(person)
        putReq.onerror = () => rej('error filling')
        if (index === HARD_DB.personnel.length - 1) {
          putReq.onsuccess = () => res(putReq.result)
        }
      })
    })
    const p2 = new Promise((res, rej) => {
      let fractionsStore = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.fractions, 'readwrite', database)
      HARD_DB.fractions.forEach((fraction, index) => {
        let putReq = fractionsStore.put(fraction)
        putReq.onerror = () => rej('error filling')
        if (index === HARD_DB.fractions.length - 1) {
          putReq.onsuccess = () => res(putReq.result)
        }
      })
    })
    const p3 = new Promise((res, rej) => {
      let positionsStore = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.positions, 'readwrite', database)
      HARD_DB.positions.forEach((position, index) => {
        let putReq = positionsStore.put(position)
        putReq.onerror = () => rej('error filling')
        if (index === HARD_DB.positions.length - 1) {
          putReq.onsuccess = () => res(putReq.result)
        }
      })
    })
    const p4 = new Promise((res, rej) => {
      let distrStore = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.distributions, 'readwrite', database)
      HARD_DB.distributions.forEach((distr, index) => {
        let putReq = distrStore.put(distr)
        putReq.onerror = () => rej('error filling')
        if (index === HARD_DB.distributions.length - 1) {
          putReq.onsuccess = () => res(putReq.result)
        }
      })
    })

    const p5 = new Promise((res, rej) => {
      let clusterStore = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.schedules, 'readwrite', database)
      HARD_DB.schedules.forEach((schedule, index) => {
        let putReq = clusterStore.put(schedule)
        putReq.onerror = () => rej('error filling')
        if (index === HARD_DB.schedules.length - 1) {
          putReq.onsuccess = () => res(putReq.result)
        }
      })
    })

    const p6 = new Promise((res, rej) => {
      let clusterStore = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.clusters, 'readwrite', database)
      HARD_DB.clusters.forEach((cluster, index) => {
        let putReq = clusterStore.put(cluster)
        putReq.onerror = () => rej('error filling')
        if (index === HARD_DB.clusters.length - 1) {
          putReq.onsuccess = () => res(putReq.result)
        }
      })
    })


    Promise.all([p1, p2, p3, p4, p5, p6]).then(r => {
      if (r.every(f => f)) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  })

  return {
    database
  }


}

export default useIdb