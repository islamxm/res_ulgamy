import { DATABASE } from "@/data/constants"
import { Fraction, PersonFull, Position } from "@/models"
import { Distr, DistrStore, Schedule, ScheduleStore } from "@/models/duty_models"
import idbUtils from "@/utils/idbUtils"

type Resolve<T> = (value: T) => any
// type StandartAction<T, K> = (db: IDBDatabase, data?:T) => Promise<K> 

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

  const getDistribution = (db: IDBDatabase, id: number) => new Promise((resolve: Resolve<DistrStore[0]>, reject) => {
    const store = idbUtils.getTransaction('distributions', 'readonly', db) 
    let req = store.get(id)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject('error')
  })

  const addDistribution = (db: IDBDatabase, data: Pick<DistrStore[0], 'body' | 'date'>) => new Promise((resolve, reject) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.distributions, 'readwrite', db)
    let req = store.add(data)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject('error')
  })

  const putDistribution = (db: IDBDatabase, data: DistrStore[0]) => new Promise((resolve, reject) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.distributions, 'readwrite', db)
    let req = store.put(data)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject('error')
  })

  const getSchedule = (db: IDBDatabase, id: number) => new Promise((resolve:Resolve<ScheduleStore[0]>, reject) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.schedules, 'readonly', db)
    let req = store.get(id)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject('error')
  })

  const addSchedule = (db: IDBDatabase, data: Pick<ScheduleStore[0], 'body' | 'date'>) => new Promise((resolve:Resolve<IDBValidKey>, reject) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.schedules, 'readwrite', db)
    let req = store.add(data)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject('error')
  })

  const putSchedule = (db: IDBDatabase, data: ScheduleStore[0]) => new Promise((resolve:Resolve<IDBValidKey>, reject) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.schedules, 'readwrite', db)
    let req = store.put(data)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject('error')
  })

  const deleteSchedule = (db: IDBDatabase, id: number) => new Promise((resolve:Resolve<boolean>, reject) => {
    const store = idbUtils.getTransaction(DATABASE.OBJECT_STORE_NAMES.schedules, 'readwrite', db)
    let req = store.delete(id)
    req.onsuccess = () => resolve(true)
    req.onerror = () => reject(false)
  })


  return {
    getAllPersonnel,
    getAllFractions,
    getAllPositions,
    getAllDistributions,
    getAllSchedules,

    newProfile,
    updateProfile,
    deleteProfile,
    getProfile,
    getDistribution,
    addDistribution,
    putDistribution,
    getSchedule,
    addSchedule,
    putSchedule,
    deleteSchedule
  }
}

export default useIdbDataService;