import { Settings } from "@/models";

const settings: Settings = {
  multipleDutyPlaces: [
    {
      duty: 'Batareýa boýunça nobatçy',
      data: [
        { placeName: '1-nji gat', fractions: [16, 55, 60] },
        { placeName: '2-nji gat', fractions: [29, 42] },
      ]
    },
    {
      duty: 'Batareýa boýunça gündeçi',
      data: [
        { placeName: '1-nji gat', fractions: [16, 55, 60] },
        { placeName: '2-nji gat', fractions: [29, 42] },
      ]
    }
  ]
}

export default settings

