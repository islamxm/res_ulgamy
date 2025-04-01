import dayjs from "dayjs"
import { createContext, FC, PropsWithChildren, useContext, useState } from "react"
import { Duties } from "@/models/duty_models"
import { Fraction, PersonFull } from "@/models"
import { useSelector } from "@/store/hooks"
import { useEffect } from "react"
import { message } from "antd"

export type ResultDataItem = {
  id: number
  targets: Duties[],
  data: PersonFull[]
}

export type Result = {
  fractionId: number,
  data: ResultDataItem[]
}

type ContextType = ReturnType<typeof useMonthDistr>
type ContextStateType = {
  month: dayjs.Dayjs
  result: Result[],
  topLevelFractions: Fraction[]
}



const defaultValue: ContextType = {
  state: {
    month: dayjs(),
    result: [],
    topLevelFractions: []
  },
  actions: {
    updateMonth: () => { },
    addDutyGroupToFraction: () => { },
    deleteDutyGroupFromFraction: () => { },
    updateDutyGroup: () => { },
    getResult: () => { }
  }
}

export const useMonthDistr = () => {
  const { dataBase } = useSelector(s => s.main)
  const { fractions } = dataBase
  const [state, setState] = useState<ContextStateType>({
    month: dayjs(),
    result: [],
    topLevelFractions: []
  })

  const getTopLevelFractions = () => {
    if (fractions.length > 0) {
      setState(s => ({ ...s, topLevelFractions: fractions.filter(fraction => fraction.isMainFrac) }))
    }
  }

  useEffect(() => {
    getTopLevelFractions()
  }, [fractions])


  const updateMonth = (month: dayjs.Dayjs) => setState(s => ({ ...s, month }))

  const addDutyGroupToFraction = (fractionId: number) => {
    setState(s => ({
      ...s,
      result: s.result.find(f => f.fractionId === fractionId) ?
        // добавление новой группы наряда к подразделению
        s.result.map(f => {
          if (f.fractionId === fractionId) {
            return ({
              fractionId,
              data: [
                ...f.data, {
                  id: f.data[f.data.length - 1]?.id ? f.data[f.data.length - 1]?.id + 1 : 1,
                  targets: ['Batareýa boýunça gündeçi'],
                  data: []
                }
              ]
            })
          } else return f
        }) :
        // добавление подразделения если его нет с дефолтной группой нарядов
        [...s.result, {
          fractionId,
          data: [{
            id: 1,
            targets: ['Batareýa boýunça gündeçi'],
            data: []
          }]
        }]
    }))
  }

  const deleteDutyGroupFromFraction = (fractionId: number, groupId: number) => {
    const frac = state.result.find(f => f.fractionId === fractionId)
    if (frac) {
      setState(s => ({
        ...s,
        result: s.result.map(fraction => {
          if (fraction.fractionId === frac.fractionId) {
            return ({
              fractionId: fraction.fractionId,
              data: fraction.data.filter(d => d.id !== groupId)
            })
          } else {
            return fraction
          }
        })
      }))
    }

  }

  const updateDutyGroup = (fractionId: number, data: ResultDataItem) => {
    const fraction = state.result.find(f => f.fractionId === fractionId)
    if (fraction) {
      let newData: Result = {
        fractionId,
        data: fraction.data.find(d => d.id === data.id) ?
          fraction.data.map(d => {
            if (d.id === data.id) {
              return ({ ...d, ...data })
            } else {
              return d
            }
          }) :
          [data]
      }

      setState(s => ({
        ...s,
        result: state.result.map(r => {
          if (r.fractionId === fractionId) {
            return newData
          } else {
            return r
          }
        })
      }))
    }



    if (fraction) {
      const group = fraction.data.find(f => f.id === data.id)
      if (group) {

      }
    }

  }

  const getResult = () => {
    const result = state.result.map(f => ({
      ...f,
      data: f.data.filter(d => d.data.length > 0)
    })).filter(s => s.data.length > 0)
    
    console.log(result)
  }

  const onDownload = () => { }

  return {
    state,
    actions: {
      updateMonth,
      addDutyGroupToFraction,
      deleteDutyGroupFromFraction,
      updateDutyGroup,
      getResult
    }
  }
}

export const MonthDistrContext = createContext<ContextType>(defaultValue)

export const MonthDistrProvider: FC<PropsWithChildren<{ value: ContextType }>> = ({
  children,
  value
}) => {
  // const [contextValue, setContextValue] = useState<ReturnType<typeof useMonthDistr>>()

  return <MonthDistrContext.Provider value={value}>
    {children}
  </MonthDistrContext.Provider>
}

export const useMonthDistrContext = () => {
  const contextData = useContext(MonthDistrContext)
  return contextData
}



