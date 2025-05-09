import { Cluster } from "./duty_cluster_models"
import { Fraction, PersonFull, WithID } from "./index"

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

export type DataPerMonth<T extends Schedule | Distr | DailyDutyMonthGroup | Cluster> = Array<{
  id: number,
  date: Date
  body: T
}>


export type Schedule = Array<{
  title: string,
  duties: Array<Duties>,
  body: Array<{
    fraction: Fraction,
    days: Array<number>
  }>
}>
export type ScheduleStore = DataPerMonth<Schedule>

export type Distr = Array<{
  fractionId: number,
  data: Array<{
    id: number
    targets: Array<Duties>
    data: Array<PersonFull>
  }>
}>

export type DistrStore = DataPerMonth<Distr>

export type DailyDuty = Map<Date, {
  id: number
  date: Date
  body: unknown
}>

export type DailyDutyMonthGroup = {
  id: number
  date: Date,
  days: Array<DailyDuty>
}
export type DailyDutyStore = DataPerMonth<DailyDutyMonthGroup>





/**
 * GARAWUL COMMON
 */
export type GarawulType = 'ig' | 'gg'

export type GarawulPost = WithID<{
  number: number
  changes: number
  isActive: boolean,
}>




/** tabşyrygyň ýerleşýän ýeri, meselem çagyryş boýunça harby gullukçylar üçin:
 * rota narýad - in
 * beýleki narýadlar - out
 * borçnama boýunça harby gullukçylar üçin
 * harby bölümiň içindäki narýad - in
 * garnizon narýad - out
*/
export type DutyPlacement = 'in' | 'out'


export type DutyMonthDistr = {
  targets: Duties[],
  data: PersonFull[],
  fractionId: number
}

export type DutyGroupMember<MemberType extends Duties> = {
  memberType: MemberType
  person?: PersonFull,
}

export type DutyGroupBase<T extends {}> = {
  name: string
  placement: DutyPlacement,
  groupId?: number
  body: T
}

//DG ==> Duty Group
export type DG_Rota = DutyGroupBase<{
  nobatcy?: DutyGroupMember<'Batareýa boýunça nobatçy'>
  gundeciler?: [DutyGroupMember<'Batareýa boýunça gündeçi'>, DutyGroupMember<'Batareýa boýunça gündeçi'>]
}>

//dolandyrysh binasy
export type DG_Shtab = DutyGroupBase<{
  nobatcy?: DutyGroupMember<'Dolandyryş binasynyň nobatçysy'>,
  gatnadyjylar?: Array<DutyGroupMember<'Gatnadyjy'>>
}>

//barlag goyberish nokady
export type DG_Bgn = DutyGroupBase<{
  nobatcy?: DutyGroupMember<'Barlag goýberiş nokadynyň nobatçysy'>,
  komekciler?: Array<DutyGroupMember<'Barlag goýberiş nokadynyň nobatçysynyň kömekçisi'>>
}>

//icerki patrul
export type DG_IP = DutyGroupBase<{
  serkerdesi?: DutyGroupMember<'Içerki patrul serkerdesi'>,
  patrullar?: Array<DutyGroupMember<'Içerki patrul'>>
}>

//garnizon patrul
export type DG_GP = DutyGroupBase<{
  serkerdesi?: DutyGroupMember<'Garnizon patrul serkerdesi'>,
  patrullar?: Array<DutyGroupMember<'Garnizon patrul'>>
}>

//naharhana naryad
export type DG_Naharhana = DutyGroupBase<{
  nobatcy?: DutyGroupMember<'Naharhana boýunça nobatçy'>,
  ishciler?: Array<DutyGroupMember<'Naharhana işçisi'>>
}>

//icerki garawul
export type DG_Igarawul = DutyGroupBase<{
  // serkerdesi?: DutyGroupMember<''>,
  // komekcisi?: DutyGroupMember<''>
  calshyryjy?: DutyGroupMember<'Içerki garawul çalşyryjy'>,
  sakcylar?: Array<DutyGroupMember<'Içerki garawul sakçy'>>
}>

//garnizon garawul
export type DG_GGarawul = DutyGroupBase<{
  komekcisi?: DutyGroupMember<'Garnizon garawul serkerdesiniň kömekçisi'>,
  calshyryjy?: DutyGroupMember<'Garnizon garawulynyň çalşyryjysy'>,
  dashynaChykaryjy?: DutyGroupMember<'Garnizon garawulynyň daşyna çykaryjysy'>,
  sakcylar?: Array<DutyGroupMember<'Garnizon garawul sakçy'>>,
}>
