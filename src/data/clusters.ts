import { ClusterStore } from "@/models/duty_cluster_models";
import dayjs from "dayjs";

const clusters: ClusterStore = [
  {
    id: 1,
    date: dayjs('2025-05').toDate(),
    body: [
      {
        dutyGroupId: 1,
        clusters: [
          {
            number: 1, name: '1-nji gat', duties: [
              { duty: 'Batareýa boýunça nobatçy', personnel: [] },
              { duty: 'Batareýa boýunça gündeçi', personnel: [] },
            ]
          },
          {
            number: 2, name: '2-nji gat', duties: [
              { duty: 'Batareýa boýunça nobatçy', personnel: [] },
              { duty: 'Batareýa boýunça gündeçi', personnel: [] },
            ]
          },
        ]
      },
      {
        dutyGroupId: 12,
        clusters: [
          {
            number: 1,
            name: '№1 içerki garawul',
            type: 'ig',
            posts: [
              {
                id: 1,
                number: 1,
                changes: 3,
                isActive: true,
                personnel: []
              },
              {
                id: 2,
                number: 2,
                changes: 3,
                isActive: true,
                personnel: []
              },
            ]
          }
        ]
      }
    ]
  }
]

export default clusters