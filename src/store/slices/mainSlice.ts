import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import HARD_DB from "@/data/hard_db";
import { DataBase } from "@/models";


type InitialState = {
  isSidebarOpen: boolean,
  dataBase: DataBase,

    
}

const initialState: InitialState = {
  isSidebarOpen: true,
  dataBase: {
    personnel: HARD_DB.personnel,
    fractions: HARD_DB.fractions,
    positions: HARD_DB.positions,
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
    }
  }
})

const { reducer, actions } = mainSlice

export const {
  updateSidebarState,
  updateDataBase
} = actions

export default reducer