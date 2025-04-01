import { Schedule, ScheduleStore } from "@/models/duty_models";
import {dateStringToNormalString} from "@/utils/dateService";
import dayjs from "dayjs";


export const schedule:Schedule = new Map([
  [16, {
    'Batareýa boýunça nobatçy': 'everyDay',
    'Batareýa boýunça gündeçi': 'everyDay',
    'Içerki patrul': 'everyDay',
    'Barlag goýberiş nokadynyň nobatçysynyň kömekçisi': [
      dateStringToNormalString('01.03.2025'),
      dateStringToNormalString('04.03.2025'),
      dateStringToNormalString('07.03.2025'),
      dateStringToNormalString('10.03.2025'),
      dateStringToNormalString('13.03.2025'),
      dateStringToNormalString('16.03.2025'),
      dateStringToNormalString('19.03.2025'),
      dateStringToNormalString('22.03.2025'),
      dateStringToNormalString('23.03.2025'),
      dateStringToNormalString('26.03.2025'),
      dateStringToNormalString('29.03.2025'),
    ],
    'Nobatçy bölümçe': 'everyDay'
  }],
  [29, {
    'Batareýa boýunça nobatçy': 'everyDay',
    'Batareýa boýunça gündeçi': 'everyDay',
    'Içerki patrul': 'everyDay',
    'Naharhana işçisi': [
      dateStringToNormalString('01.03.2025'),
      dateStringToNormalString('03.03.2025'),
      dateStringToNormalString('04.03.2025'),
      dateStringToNormalString('06.03.2025'),
      dateStringToNormalString('07.03.2025'),
      dateStringToNormalString('09.03.2025'),
      dateStringToNormalString('10.03.2025'),
      dateStringToNormalString('12.03.2025'),
      dateStringToNormalString('15.03.2025'),
      dateStringToNormalString('16.03.2025'),
      dateStringToNormalString('18.03.2025'),
      dateStringToNormalString('19.03.2025'),
      dateStringToNormalString('21.03.2025'),
      dateStringToNormalString('22.03.2025'),
      dateStringToNormalString('24.03.2025'),
      dateStringToNormalString('25.03.2025'),
      dateStringToNormalString('27.03.2025'),
      dateStringToNormalString('28.03.2025'),
      dateStringToNormalString('30.03.2025'),
      dateStringToNormalString('31.03.2025'),
    ],
    'Dolandyryş binasynyň nobatçysy': [
      dateStringToNormalString('04.03.2025'),
      dateStringToNormalString('10.03.2025'),
      dateStringToNormalString('16.03.2025'),
      dateStringToNormalString('28.03.2025'),
    ],
    'Gatnadyjy': [
      dateStringToNormalString('01.03.2025'),
      dateStringToNormalString('03.03.2025'),
      dateStringToNormalString('04.03.2025'),
      dateStringToNormalString('06.03.2025'),
    ],
    'Garnizon patrul': [
      dateStringToNormalString('02.03.2025'),
      dateStringToNormalString('04.03.2025'),
      dateStringToNormalString('06.03.2025'),
      dateStringToNormalString('08.03.2025'),
      dateStringToNormalString('10.03.2025'),
      dateStringToNormalString('12.03.2025'),
      dateStringToNormalString('14.03.2025'),
      dateStringToNormalString('16.03.2025'),
      dateStringToNormalString('18.03.2025'),
      dateStringToNormalString('20.03.2025'),
      dateStringToNormalString('22.03.2025'),
      dateStringToNormalString('24.03.2025'),
      dateStringToNormalString('26.03.2025'),
      dateStringToNormalString('28.03.2025'),
      dateStringToNormalString('30.03.2025'),
    ],
    'Harby bölüm boýunça nobatçynyň tehniki serişdeler boýunça kömekçisi': 'everyDay',
    'Nobatçy çekiji': [
      dateStringToNormalString('01.03.2025'),
      dateStringToNormalString('04.03.2025'),
      dateStringToNormalString('07.03.2025'),
      dateStringToNormalString('10.03.2025'),
      dateStringToNormalString('13.03.2025'),
      dateStringToNormalString('16.03.2025'),
      dateStringToNormalString('19.03.2025'),
      dateStringToNormalString('22.03.2025'),
      dateStringToNormalString('25.03.2025'),
      dateStringToNormalString('28.03.2025'),
      dateStringToNormalString('31.03.2025'),
    ]
  }]
])

const schedules:ScheduleStore = [
  {date: '03.2025', body:schedule}
]

export default schedules