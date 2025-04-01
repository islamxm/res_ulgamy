import { GarawulCluster } from "@/models/duty_models"

const garawul:GarawulCluster[] = [
  {
    id: 1,
    number: 1,
    type: 'ig',
    posts: [
      {
        id: 1,
        number: 1,
        changes: 3,
        isActive: true
      },
      {
        id: 2,
        number: 2,
        changes: 3,
        isActive: true
      },
    ]
  },
  {
    id: 2,
    number: 1,
    type: 'gg',
    posts: [
      {
        id: 1,
        number: 1,
        changes: 3,
        isActive: true
      }
    ]
  }
]

export default garawul