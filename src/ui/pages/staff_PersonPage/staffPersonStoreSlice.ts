import { PersonFull } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  userData?: PersonFull
}

const initialState: InitialState = {
  userData: undefined
}

const staffPersonStoreSlice = createSlice({
  name: 'staffPerson',
  initialState,
  reducers: {

    getUserData: (s, { payload }: PayloadAction<{ id: number, personnel: PersonFull[] }>) => {
      s.userData = payload.personnel.find(person => person.id === payload.id)
    },

  }
})

export const staffPersonActions = staffPersonStoreSlice.actions
export default staffPersonStoreSlice.reducer