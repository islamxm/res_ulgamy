import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataBase, DatabaseUpdateActionTypes } from "@/models";
import { ScheduleStore } from "@/models/duty_models";

type InitialState = {
  isSidebarOpen: boolean,
  dataBase: DataBase,
}

const initialState: InitialState = {
  isSidebarOpen: true,
  dataBase: {
    personnel: [],
    fractions: [],
    positions: [],
    distributions: [],
    schedules: []
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
          break;
        case 'put':
          s.dataBase.schedules.map(schedule => {
            if (schedule.id === payload.data.id) {
              return (payload.data)
            } else {
              return schedule
            }
          })
          break;
        case 'delete':
          s.dataBase.schedules.filter(schedule => schedule.id !== payload.data.id)
      }
    },

    updateDistribution: (s, { payload }: PayloadAction<{ action: DatabaseUpdateActionTypes }>) => {
      // switch(payload.action) {
      //   case 'add':
      //   case 'put':
      //   case 'delete':
      // }
    }
  }
})

const { reducer, actions } = mainSlice

export const {
  updateSidebarState,
  updateDataBase,
  updateSchedule
} = actions

export default reducer