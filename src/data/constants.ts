const CONSTANTS = {
  SIDEBAR_WIDTH: 300,
  DATABASE: {
    NAME: 'res_system',
    VERSION: 1,
    OBJECT_STORE_NAMES: {
      fractions: 'fractions',
      personnel: 'personnel',
      positions: 'positions',
      distributions: 'distributions',
      schedules: 'schedules',
      clusters: 'clusters',
      settings: 'settings'
    }
  },
  DATE: {
    MONTH_NAMES: [
      'Ýanwar', 'Fewral', 'Mart', 'Aprel', 'Maý', 'Iýun', 'Iýul', 'Awgust', 'Sentýabr', 'Oktýabr', 'Noýabr', 'Dekabr'
    ],
    WEEKDAY_NAMES: [
      'Duşenbe', 'Sişenbe', 'Çarşenbe', 'Penşenbe', 'Anna', 'Şenbe', 'Ýekşenbe'
    ]
  }
}

export const {
  SIDEBAR_WIDTH,
  DATABASE
} = CONSTANTS

export default CONSTANTS