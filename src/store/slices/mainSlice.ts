import { Fraction, PersonBB, PersonCB, Position } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DataBase = {
  personnel: (PersonCB | PersonBB)[],
  fractions: Fraction[],
  positions: Position[]
}

type InitialState = {
  isSidebarOpen: boolean,
  dataBase: DataBase
}

const initialState: InitialState = {
  isSidebarOpen: true,
  dataBase: {
    personnel: [],
    fractions: [],
    positions: []
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