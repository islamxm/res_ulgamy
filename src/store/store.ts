import { configureStore } from "@reduxjs/toolkit";
import main from './slices/mainSlice'
import dutyDistr from '@/ui/pages/duty_monthDistrPage/dutyDistrStoreSlice'
import staffPerson from '@/ui/pages/staff_PersonPage/staffPersonStoreSlice'

export default configureStore({
  reducer: {
    main,
    dutyDistr,
    staffPerson
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: process.env.NODE_ENV !== 'production'
})

