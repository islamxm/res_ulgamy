import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataBase, DatabaseUpdateActionTypes, Settings } from "@/models";
import { DistrStore, ScheduleStore } from "@/models/duty_models";
import { MessageInstance } from "antd/es/message/interface";
import { message } from "antd";
import { ClusterStore } from "@/models/duty_cluster_models";
import dayjs from "dayjs";

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
    schedules: [],
    clusters: []
  },
  messageApi: undefined,
  settings: {
    multipleDutyPlaces: []
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

    updateCluster: (s, {payload}: PayloadAction<{action: DatabaseUpdateActionTypes, data: ClusterStore[0]}>) => {
      switch(payload.action) {
        case 'add':
          s.dataBase.clusters.push(payload.data)
          break
        case 'put':
          s.dataBase.clusters.map(cluster => {
            if(cluster.id === payload.data.id) {
              return payload.data
            } else {
              return cluster
            }
          })
          break
        case 'delete':
          s.dataBase.clusters = s.dataBase.clusters.filter(cluster => dayjs(cluster.date).format('MM.YYYY') !== dayjs(payload.data.date).format('MM.YYYY'))
          break
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
  updateCluster,
  updateMessageApi
} = actions

export default reducer