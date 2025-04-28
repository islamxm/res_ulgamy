import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataBase, DatabaseUpdateActionTypes, Settings } from "@/models";
import { DistrStore, ScheduleStore } from "@/models/duty_models";
import { MessageInstance } from "antd/es/message/interface";
import { message } from "antd";

type InitialState = {
  isSidebarOpen: boolean,
  dataBase: DataBase,
  messageApi: MessageInstance | undefined
  settings: Settings | undefined
}

const initialState: InitialState = {
  isSidebarOpen: true,
  dataBase: {
    personnel: [],
    fractions: [],
    positions: [],
    distributions: [],
    schedules: []
  },
  messageApi: undefined,
  settings: {
    multipleDutyPlaces: {
      'rota': {
        duties: ['Batareýa boýunça gündeçi', 'Batareýa boýunça nobatçy'],
        sources: [
          {name: '1-nji gat', fractions: []},
          {name: '2-nji gat', fractions: []},
        ]
      }
    }
  }
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {

    updateSidebarState: (state, { payload }: PayloadAction<boolean>) => {
      state.isSidebarOpen = payload
    },

    updateDataBase: (state, { payload }: PayloadAction<DataBase>) => {
      state.dataBase = payload
    },

    updateSchedule: (s, { payload }: PayloadAction<{ action: DatabaseUpdateActionTypes, data: ScheduleStore[0] }>) => {
      switch (payload.action) {
        case 'add':
          s.dataBase.schedules.push(payload.data)
          break
        case 'put':
          s.dataBase.schedules.map(schedule => {
            if (schedule.id === payload.data.id) {
              return (payload.data)
            } else {
              return schedule
            }
          })
          break
        case 'delete':
          s.dataBase.schedules = s.dataBase.schedules.filter(schedule => schedule.id !== payload.data.id)
          break
      }
    },

    updateDistribution: (s, { payload }: PayloadAction<{ action: DatabaseUpdateActionTypes, data: DistrStore[0] }>) => {
      switch(payload.action) {
        case 'add':
          s.dataBase.distributions.push(payload.data)
          break
        case 'put':
          s.dataBase.distributions.map(distr => {
            if(distr.id === payload.data.id) {
              return payload.data 
            } else {
              return distr
            }
          })
          break
        case 'delete':
          s.dataBase.distributions = s.dataBase.distributions.filter(distr => distr.id !== payload.data.id)
      }
    },

    updateMessageApi: (s, {payload}: PayloadAction<MessageInstance>) => {
      s.messageApi = payload
    },

    updateSettings: (s, {payload}: PayloadAction<Partial<Settings>>) => {
      s.settings = s.settings ? {...s.settings, ...payload} : undefined
    },
    
  }
})

const { reducer, actions } = mainSlice

export const {
  updateSidebarState,
  updateDataBase,
  updateSchedule,
  updateDistribution,
  updateMessageApi
} = actions

export default reducer