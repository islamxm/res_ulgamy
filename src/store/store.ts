import { configureStore } from "@reduxjs/toolkit";
import main from './slices/mainSlice'
export default configureStore({
  reducer: {
    main
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: process.env.NODE_ENV !== 'production'
})

