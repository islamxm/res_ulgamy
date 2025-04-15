import { createSlice } from "@reduxjs/toolkit";

type InitialState = {

}

const initialState: InitialState = {

}

const dutyDailyCompSlice = createSlice({
  name: 'dutyDaily',
  initialState,
  reducers: {
    
  } 
})

export const dutyDailyCompActions = dutyDailyCompSlice.actions 
export default dutyDailyCompSlice.reducer