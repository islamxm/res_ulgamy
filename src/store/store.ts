import { configureStore } from "@reduxjs/toolkit";
import main from './slices/mainSlice'
import dutyDistr from '@/ui/pages/duty_monthDistrPage/dutyDistrStoreSlice'
import staffPerson from '@/ui/pages/staff_PersonPage/staffPersonStoreSlice'
import dutySchedule from '@/ui/pages/duty_monthSchedulePage/dutyScheduleStoreSlice'
import dutyCluster from '@/ui/pages/duty_monthClustersPage/dutyClusterStoreSlice'
import db from '@/store/slices/dbSlice'

export default configureStore({
  reducer: {
    main,
    db,
    dutyDistr,
    dutySchedule,
    dutyCluster,
    staffPerson,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: process.env.NODE_ENV !== 'production'
})

