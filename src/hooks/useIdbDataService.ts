import { DATABASE } from "@/data/constants"
import { Fraction, PersonFull, Position } from "@/models"
import { ClusterStore } from "@/models/duty_cluster_models"
import { Distr, DistrStore, Schedule, ScheduleStore } from "@/models/duty_models"
import idbUtils from "@/utils/idbUtils"
import dayjs from "dayjs"

type Resolve<T> = (value: T) => any

type Options<DataType, SuccessType, ErrorType> = {
  db: IDBDatabase,
  data: DataType,
  onsuccess: (value: SuccessType) => void,
  onerror?: (value: ErrorType) => void
}

type DefaultError = '[idb]: transaction error'

type StandartAction<DataType, SuccessType, ErrorType = DefaultError> = (options: Options<DataType, SuccessType, ErrorType>) => void

const useIdbDataService = () => {

  const getAllPersonnel = (db: IDBDatabase) => {
    return new Promise((resolve: (value: PersonFull[]) => void, reject) => {
      let store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.personnel, 'readonly', db)
      let req = store.getAll()
      req.onsuccess = () => {
        resolve(req.result)
      }
      req.onerror = () => {
        reject(`[idb]: func:${getAllPersonnel.name} error`)
      }
    })
  }

  const getAllFractions = (db: IDBDatabase) => {
    return new Promise((resolve: (value: Fraction[]) => void, reject) => {
      let store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.fractions, 'readonly', db)
      let req = store.getAll()
      req.onsuccess = () => {
        resolve(req.result)
      }
      req.onerror = () => {
        reject(`[idb]: func:${getAllFractions.name} error`)
      }
    })
  }

  const getAllPositions = (db: IDBDatabase) => {
    return new Promise((resolve: (value: Position[]) => void, reject) => {
      let store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.positions, 'readonly', db)
      let req = store.getAll()
      req.onsuccess = () => {
        resolve(req.result)
      }
      req.onerror = () => {
        reject(`[idb]: func:${getAllPositions.name} error`)
      }
    })
  }

  const getAllDistributions = (db: IDBDatabase) => new Promise((resolve: Resolve<DistrStore>, reject) => {
    let store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.distributions, 'readonly', db)
    let req = store.getAll()
    req.onsuccess = () => {
      resolve(req.result)
    }
    req.onerror = () => reject('error')
  })

  const getAllSchedules = (db: IDBDatabase) => new Promise((resolve: Resolve<ScheduleStore>, reject) => {
    let store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.schedules, 'readonly', db)
    let req = store.getAll()
    req.onsuccess = () => {
      resolve(req.result)
    }
    req.onerror = () => reject('error')
  })

  const getAllClusters = (db: IDBDatabase) => new Promise((resolve: Resolve<ClusterStore>, reject) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.clusters, 'readonly', db)
    let req = store.getAll()
    req.onsuccess = () => {
      resolve(req.result)
    }
    req.onerror = () => reject('error')
  })

  const newProfile = (db: IDBDatabase, data: PersonFull) => new Promise((resolve, reject) => {
    const store = idbUtils.getTransaction('personnel', 'readwrite', db)
    let req = store.add(data)
    req.onsuccess = () => {
      resolve(req.result)
    }
    req.onerror = () => {
      reject('error')
    }
  })

  const updateProfile = (db: IDBDatabase, data: PersonFull) => new Promise((resolve, reject) => {
    const store = idbUtils.getTransaction('personnel', 'readwrite', db)
    let req = store.put(data)
    req.onsuccess = () => {
      resolve(req.result)
    }
    req.onerror = () => {
      reject('error')
    }
  })

  const deleteProfile = (db: IDBDatabase, id: number) => new Promise((resolve, reject) => {
    const store = idbUtils.getTransaction('personnel', 'readwrite', db)
    let req = store.delete(id)
    req.onsuccess = () => {
      resolve(req.result)
    }
    req.onerror = () => {
      reject('error')
    }
  })


  const getProfile = (db: IDBDatabase, id: number) => new Promise((resolve: Resolve<PersonFull>, reject) => {
    const store = idbUtils.getTransaction('personnel', 'readonly', db)
    let req = store.get(id)
    req.onsuccess = () => {
      resolve(req.result)
    }
    req.onerror = () => {
      reject('error')
    }
  })

  const getSchedule: StandartAction<
    number,
    ScheduleStore[0]
  > = ({ db, data, onsuccess, onerror }) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.schedules, 'readonly', db)
    let r = store.get(data)
    r.onsuccess = () => onsuccess(r.result)
    r.onerror = () => onerror && onerror('[idb]: transaction error')
  }

  const addSchedule: StandartAction<
    Pick<ScheduleStore[0], 'body' | 'date'>,
    IDBValidKey
  > = ({ db, data, onerror, onsuccess }) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.schedules, 'readwrite', db)
    let r = store.add(data)
    r.onsuccess = () => onsuccess(r.result)
    r.onerror = () => onerror && onerror('[idb]: transaction error')
  }

  const putSchedule: StandartAction<
    ScheduleStore[0],
    IDBValidKey
  > = ({ db, data, onsuccess, onerror }) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.schedules, 'readwrite', db)
    let r = store.put(data)
    r.onsuccess = () => onsuccess(r.result)
    r.onerror = () => onerror && onerror('[idb]: transaction error')
  }

  const deleteSchedule: StandartAction<
    number,
    boolean,
    false
  > = ({ db, data, onsuccess, onerror }) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.schedules, 'readwrite', db)
    let r = store.delete(data)
    r.onsuccess = () => onsuccess(true)
    r.onerror = () => onerror && onerror(false)
  }

  const getDistribution: StandartAction<
    number,
    DistrStore[0]
  > = ({ db, data, onsuccess, onerror }) => {
    const store = idbUtils.getTransaction('distributions', 'readonly', db)
    let r = store.get(data)
    r.onsuccess = () => onsuccess(r.result)
    r.onerror = () => onerror && onerror('[idb]: transaction error')
  }

  const addDistribution: StandartAction<
    Pick<DistrStore[0], 'body' | 'date'>,
    IDBValidKey
  > = ({ db, data, onsuccess, onerror }) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.distributions, 'readwrite', db)
    let r = store.add(data)
    r.onsuccess = () => onsuccess(r.result)
    r.onerror = () => onerror && onerror('[idb]: transaction error')
  }

  const putDistribution: StandartAction<
    DistrStore[0],
    IDBValidKey
  > = ({ db, data, onsuccess, onerror }) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.distributions, 'readwrite', db)
    let r = store.put(data)
    r.onsuccess = () => onsuccess(r.result)
    r.onerror = () => onerror && onerror('[idb]: transaction error')
  }

  const deleteDistribution: StandartAction<
    number,
    boolean,
    false
  > = ({ db, data, onsuccess, onerror }) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.distributions, 'readwrite', db)
    let r = store.delete(data)
    r.onsuccess = () => onsuccess(true)
    r.onerror = () => onerror && onerror(false)
  }

  const getCluster: StandartAction<
    number,
    ClusterStore[0]
  > = ({ db, data, onsuccess, onerror }) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.clusters, 'readonly', db)
    let r = store.get(data)
    r.onsuccess = () => onsuccess(r.result)
    r.onerror = () => onerror && onerror('[idb]: transaction error')
  }

  const addCluster: StandartAction<
    Pick<ClusterStore[0], 'body' | 'date'>,
    IDBValidKey
  > = ({ db, data, onsuccess, onerror }) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.clusters, 'readwrite', db)
    let r = store.add(data)
    r.onsuccess = () => onsuccess(r.result)
    r.onerror = () => onerror && onerror('[idb]: transaction error')
  }

  const putCluster: StandartAction<
    ClusterStore[0],
    IDBValidKey
  > = ({ db, data, onsuccess, onerror }) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.clusters, 'readwrite', db)
    let r = store.put(data)
    r.onsuccess = () => onsuccess(r.result)
    r.onerror = () => onerror && onerror('[idb]: transaction error')
  }

  const deleteCluster: StandartAction<
  // number,
  Date,
  boolean,
  false
> = ({ db, data, onsuccess, onerror }) => {
  const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.clusters, 'readwrite', db)
  let r = store.delete(data)
  r.onsuccess = () => onsuccess(true)
  r.onerror = () => onerror && onerror(false)
}

  return {
    getAllPersonnel,
    getAllFractions,
    getAllPositions,
    getAllDistributions,
    getAllSchedules,
    getAllClusters,

    newProfile,
    updateProfile,
    deleteProfile,
    getProfile,

    getSchedule,
    addSchedule,
    putSchedule,
    deleteSchedule,

    getDistribution,
    addDistribution,
    putDistribution,
    deleteDistribution,

    getCluster,
    addCluster,
    putCluster,
    deleteCluster
  }
}

export default useIdbDataService;