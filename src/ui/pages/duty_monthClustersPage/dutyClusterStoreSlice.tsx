import { Cluster, GarawulCluster, RotaCluster } from "@/models/duty_cluster_models"
import { createSlice } from "@reduxjs/toolkit"
import dayjs from "dayjs"
import { PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  data: Cluster,
  month: dayjs.Dayjs | undefined
}

const initialState: InitialState = {
  data: [],
  month: undefined
}

const dutyClusterStoreSlice = createSlice({
  name: 'dutyCluster',
  initialState,
  reducers: {

    updateMonth(s, { payload }: PayloadAction<{ date: dayjs.Dayjs | undefined }>) {
      s.month = payload.date
    },

    setInitData(s, { payload }: PayloadAction<{ data: Cluster }>) {
      s.data = payload.data
    },

    updateClusterPersonnel(s, { payload }: PayloadAction<{dutyGroupId: number, cluster: any}>) {  
      switch(payload.dutyGroupId) {
        case 12:
          s.data = s.data.map(k => {
            if(k.dutyGroupId === 12) {
              return payload.cluster
            } else return k
          })
          break
        case 1:
          console.log('rota changed')
          s.data = s.data.map(k => {
            if(k.dutyGroupId === 1) {
              return payload.cluster
            } else return k
          })
          break
      }
    }


  }
})

export const dutyClusterActions = dutyClusterStoreSlice.actions
export default dutyClusterStoreSlice.reducer