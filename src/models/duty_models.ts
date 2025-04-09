import type dayjs from "dayjs"
import { Months, Person, PersonFull, Weekdays, WithID } from "./index"

export type DutyGroupType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17
export type Duties = 
'Içerki garawul serkerdesiniň kömekçisi' |
'Içerki garawul çalşyryjy' |
'Içerki garawul sakçy' |
'Park gündeçisi' |
'Nobatçy çekiji' |
'Nobatçy awtoulag' |
'Garnizon garawullar boýunça nobatçyň kömekçisi' |
'Garnizon garawul serkerdesiniň kömekçisi' |
'Garnizon garawulynyň daşyna çykaryjysy' |
'Garnizon garawulynyň çalşyryjysy' |
'Garnizon garawul sakçy' |
'Barlag goýberiş nokadynyň nobatçysynyň kömekçisi' |
'Batareýa boýunça nobatçy' |
'Batareýa boýunça gündeçi' |
'Naharhana işçisi' |
'Nobatçy bölümçe' |
'Dolandyryş binasynyň nobatçysy' |
'Gatnadyjy' |
'Garnizon patrul' |
'Içerki patrul serkerdesi' |
'Içerki patrul' |
'Harby bölüm boýunça nobatçynyň tehniki serişdeler boýunça kömekçisi' | 
'Barlag goýberiş nokadynyň nobatçysy' | 
'Garnizon patrul serkerdesi' | 
'Naharhana boýunça nobatçy'

export type DutyData = {
  shortName: string
  fullName: string,
}




export type AvilableDuty = {
  date: Date
  duties: unknown[]
}

type DataPerMonth<T extends Schedule | Distr> = {
  date: string, //date like MM.YYYY
  body: T
}[]

export type Schedule = Map<number, Partial<Record<Duties, dayjs.Dayjs[] | 'everyDay'>>>
export type ScheduleStore = DataPerMonth<Schedule>

export type Distr = Map<number, {targets: Duties[], data: PersonFull[]}>
export type DistrStore = DataPerMonth<Distr>



type GarawulType = 'ig' | 'gg'
type GarawulPost = WithID<{
  number: number
  changes: number
  isActive: boolean,
}>
//GARAWUL
export type GarawulCluster = WithID<{
  number: number,
  type: GarawulType
  posts: GarawulPost[] 
  name?: string,
}>

type DutyPlacement = 'in' | 'out'

export type DutyMonthDistr = {
  targets: Duties[],
  data: PersonFull[],
  fractionId: number
}

export type DutyGroupMember<MemberType extends Duties> = {
  // id: number
  // dutyName: string,
  memberType: MemberType
  person?: PersonFull,
}

export type DutyGroupBase<T extends {}> = {
  // id: number
  name: string
  placement: DutyPlacement
  body: T
}

//DG ==> Duty Group
export type DG_Rota = DutyGroupBase<{
  nobatcy?: DutyGroupMember<'Batareýa boýunça nobatçy'>
  gundeciler?: DutyGroupMember<'Batareýa boýunça gündeçi'>[]
}>

//dolandyrysh binasy
export type DG_Shtab = DutyGroupBase<{
  nobatcy?: DutyGroupMember<'Dolandyryş binasynyň nobatçysy'>,
  gatnadyjylar?: DutyGroupMember<'Gatnadyjy'>[]
}>

//barlag goyberish nokady
export type DG_Bgn = DutyGroupBase<{
  nobatcy?: DutyGroupMember<'Barlag goýberiş nokadynyň nobatçysy'>,
  komekciler?: DutyGroupMember<'Barlag goýberiş nokadynyň nobatçysynyň kömekçisi'>[]
}>

//icerki patrul
export type DG_IP = DutyGroupBase<{
  serkerdesi?: DutyGroupMember<'Içerki patrul serkerdesi'>,
  patrullar?: DutyGroupMember<'Içerki patrul'>[]
}>

//garnizon patrul
export type DG_GP = DutyGroupBase<{
  serkerdesi?: DutyGroupMember<'Garnizon patrul serkerdesi'>,
  patrullar?: DutyGroupMember<'Garnizon patrul'>[]
}>

//naharhana naryad
export type DG_Naharhana = DutyGroupBase<{
  nobatcy?: DutyGroupMember<'Naharhana boýunça nobatçy'>,
  ishciler?: DutyGroupMember<'Naharhana işçisi'>[]
}>

