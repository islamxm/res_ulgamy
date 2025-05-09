import { DataPerMonth, GarawulPost, GarawulType } from "./duty_models"
import { PersonFull, WithID } from "."

/**
 * GARAWUL CLUSTERS SCHEME
 */
type GarawulClusterData = {
  number: number,
  type: 'ig'
  posts: Array<GarawulPost & {personnel: Array<PersonFull>}>
  name?: string,
}

export type GarawulCluster = {
  dutyGroupId: 12,
  clusters: Array<GarawulClusterData>
}

/**
 * ROTA CLUSTERS SCHEME
 */
type RotaClusterData = {
  number: number
  name: string,
  duties: [
    {duty: 'Batareýa boýunça nobatçy', personnel: Array<PersonFull>},
    {duty: 'Batareýa boýunça gündeçi', personnel: Array<PersonFull>},
  ]
} 

export type RotaCluster = {
  dutyGroupId: 1,
  clusters: Array<RotaClusterData>
}


export type Cluster = Array<
  GarawulCluster |
  RotaCluster
>

export type ClusterStore = DataPerMonth<Cluster>



