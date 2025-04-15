import { DATABASE } from "@/data/constants";
import HARD_DB from "@/data/hard_db";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Status = 'connecting' | 'connected' | 'error'

type InitialState = {
  database: IDBDatabase | undefined
  status: Status,
  config: {
    dbName: string,
    dbVersion: number,
    objectStoreNames: string[]
  } | undefined
}

const initialState: InitialState = {
  database: undefined,
  status: 'connecting',
  config: {
    dbName: DATABASE.NAME,
    dbVersion: DATABASE.VERSION,
    objectStoreNames: Object.entries(DATABASE.OBJECT_STORE_NAMES).map(f => f[1])
  }
}

const dbSlice = createSlice({
  name: 'db',
  initialState,
  reducers: {

    setConfig(s, { payload }: PayloadAction<InitialState['config']>) {
      s.config = payload
    },

    updateDbObject(s, {payload}: PayloadAction<IDBDatabase>) {
      s.database = payload
    },

    updateStatus(s, {payload}: PayloadAction<Status>) {
      s.status = payload
    }

  }
})

const { reducer, actions } = dbSlice

export const dbActions = actions

export default reducer