import { aprelMock } from "@/data/distributions";
import { Distribution, DistributionFrac, Fraction } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

type InitialState = {
  month: dayjs.Dayjs,
  result: Distribution['body'],
  topLevelFractions: Fraction[]
}

const initialState: InitialState = {
  month: dayjs(),
  result: aprelMock.body,
  topLevelFractions: []
}

const dutyDistrSlice = createSlice({
  name: 'dutyDistr',
  initialState,
  reducers: {

    updateMonth: (s, { payload }: PayloadAction<{ date: dayjs.Dayjs }>) => { s.month = payload.date },

    addDutyGroupToFraction: (s, { payload: { fractionId } }: PayloadAction<{ fractionId: number }>) => {
      s.result = s.result.find(f => f.fractionId === fractionId) ?
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
    },

    deleteDutyGroupFromFraction: (s, { payload: { fractionId, groupId } }: PayloadAction<{ fractionId: number, groupId: number }>) => {
      const frac = s.result.find(f => f.fractionId === fractionId)
      if (frac) {
        s.result = s.result.map(fraction => {
          if (fraction.fractionId === fractionId) {
            return ({
              fractionId: fraction.fractionId,
              data: fraction.data.filter(d => d.id !== groupId)
            })
          } else {
            return fraction
          }
        })
      }
    },

    updateDutyGroup: (s, { payload: { fractionId, data } }: PayloadAction<{ fractionId: number, data: DistributionFrac['data'][0] }>) => {
      const fraction = s.result.find(f => f.fractionId === fractionId)
      if (fraction) {
        let newData: DistributionFrac = {
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
        s.result = s.result.map(r => {
          if (r.fractionId === fractionId) {
            return newData
          } else {
            return r
          }
        })
      }
    },

    updateTopLevelFraction: (s, { payload: { fractions } }: PayloadAction<{ fractions: Fraction[] }>) => {
      s.topLevelFractions = fractions.filter(fraction => fraction.isMainFrac)
    }
  }
})

export const dutyDistrActions = dutyDistrSlice.actions
export default dutyDistrSlice.reducer
