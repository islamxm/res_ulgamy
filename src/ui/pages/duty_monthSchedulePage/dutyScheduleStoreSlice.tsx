import { Duties } from "@/models/duty_models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Schedule } from "@/models/duty_models";
import { Fraction } from "@/models";
import dayjs from "dayjs";
import { schedule } from "@/data/schedule";

type InitialState = {
  avilableDutyGroups: Duties[]
  data: Schedule
  month: dayjs.Dayjs | undefined
  copiedDays: Schedule[0]['body'][0]['days'] | undefined,
  daysInMonth: number[]
}

const dataMock: InitialState['data'] = [
  {
    title: 'Batareýa boýunça nobatçy we gündeçi',
    duties: ['Batareýa boýunça gündeçi', 'Batareýa boýunça nobatçy'],
    body: [
      {
        fraction: {
          id: 16,
          isMainFrac: 1,
          level: 'rota',
          name: {
            number: 1,
            shortName: '1-nji ReAB',
            staffName: '1-nji reaktiw artilleriýa batareýasy'
          },
          parentFractionId: 14
        },
        days: [1, 3, 5, 7]
      },
      {
        fraction: {
          id: 60,
          isMainFrac: 1,
          level: 'wzwod',
          name: {
            shortName: 'Üpjünçilik wzwody',
            staffName: 'Üpjünçilik wzwody'
          },
          parentFractionId: 14
        },
        days: [20, 21, 22, 23, 24, 25, 26]
      }
    ]
  },
  {
    title: 'Içerki patrul',
    duties: ['Içerki patrul', 'Içerki patrul serkerdesi'],
    body: [
      {
        fraction: {
          id: 29,
          isMainFrac: 1,
          level: 'rota',
          name: {
            number: 2,
            shortName: '2-nji ReAB',
            staffName: '2-nji reaktiw artilleriýa batareýasy'
          },
          parentFractionId: 14
        },
        days: [1,10,20,30]
      },
    ]
  }
]

const initialState: InitialState = {
  avilableDutyGroups: [],
  data: [],
  month: undefined,
  copiedDays: undefined,
  daysInMonth: []
}

const dutyScheduleStoreSlice = createSlice({
  name: 'dutySchedule',
  initialState,
  reducers: {

    updateMonth(s, {payload}: PayloadAction<{date: dayjs.Dayjs | undefined}>) {
      s.month = payload.date
    },

    setInitData(s, {payload}: PayloadAction<{data: Schedule}>) {
      s.data = payload.data
    },

    updateTitle(s, { payload }: PayloadAction<{ value: string, index: number }>) {
      s.data[payload.index].title = payload.value
    },

    addGroup(s, { payload }: PayloadAction<{ duties: Duties[], topLevelFractions: Fraction[] }>) {
      s.data.push({
        title: '',
        duties: payload.duties,
        body: payload.topLevelFractions.map(frac => ({
          fraction: frac,
          days: []
        }))
      })
    },

    deleteGroup(s, { payload }: PayloadAction<{ index: number }>) {
      s.data = s.data.filter((_, fIndex) => fIndex !== payload.index)
    },

    selectAllDate(s, { payload }: PayloadAction<{ index: number, fractionId: number, days: number[] }>) {
      s.data[payload.index] = {
        ...s.data[payload.index],
        body: s.data[payload.index].body.map(b => {
          if (b.fraction.id === payload.fractionId) {
            return ({
              ...b,
              days: payload.days
            })
          } else return b
        })
      }
    },

    selectDate(s, { payload }: PayloadAction<{
      index: number,
      fractionId: number,
      date: number
    }>) {
      s.data[payload.index] = {
        ...s.data[payload.index],
        body: s.data[payload.index].body.map(b => {
          if (b.fraction.id === payload.fractionId) {
            return ({
              ...b,
              days: b.days.find(f => f === payload.date) ? b.days.filter(f => f !== payload.date) : [...[...b.days, payload.date].sort()]
            })
          } else return b
        })
      }
    },

    copyDateScheme(s, { payload }: PayloadAction<{ days: Schedule[0]['body'][0]['days'] }>) {
      s.copiedDays = payload.days
    },

    pasteDataScheme(s, { payload }: PayloadAction<{ index: number, fractionId: number }>) {
      s.data[payload.index] = {
        ...s.data[payload.index],
        body: s.data[payload.index].body.map(b => {
          if (b.fraction.id === payload.fractionId) {
            return ({
              ...b,
              days: s.copiedDays || []
            })
          } else return b
        })
      }
    },

    clearDateScheme(s, {payload}: PayloadAction<{index: number, fractionId: number}>) {
      s.data[payload.index] = {
        ...s.data[payload.index],
        body: s.data[payload.index].body.map(b => {
          if (b.fraction.id === payload.fractionId) {
            return ({
              ...b,
              days: []
            })
          } else return b
        })
      }  
    },

    setDaysInMonth(s, {payload}: PayloadAction<number[]>) {
      s.daysInMonth = payload
    }
  }
})

export const dutyScheduleActions = dutyScheduleStoreSlice.actions
export default dutyScheduleStoreSlice.reducer 