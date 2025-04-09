import { configureStore } from "@reduxjs/toolkit";
import main from './slices/mainSlice'
import dutyDistr from '@/ui/pages/duty_monthDistrPage/dutyDistrStoreSlice'
import staffPerson from '@/ui/pages/staff_PersonPage/staffPersonStoreSlice'
import dutySchedule from '@/ui/pages/duty_monthSchedulePage/dutyScheduleStoreSlice'

export default configureStore({
  reducer: {
    main,
    dutyDistr,
    dutySchedule,
    staffPerson
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: process.env.NODE_ENV !== 'production'
})

