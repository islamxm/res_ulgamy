import dayjs from "dayjs"
import { AvilableDuty, Duties } from "./duty_models"

// GLOBAL=====
export type DataBase = {
  personnel: (PersonCB | PersonBB)[],
  fractions: Fraction[],
  positions: Position[]
}

export type Months = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
export type Weekdays = 0 | 1 | 2 | 3 | 4 | 5 | 6

/**
* Generic: Interfeysin duzuminde ID:number bar
*/
export type WithID<T> = T & { id: number }

/**
 * Generic: Interfeysin duzuminde Name:string bar
 */
export type WithName<T> = T & { name: string }

/**
 * Harby atlar
 */
export type Ranks =
  'hatarcy' |
  'kici_serzhant' |
  'serzhant' |
  'uly_serzhant' |
  'starshina' |
  'leytenant' |
  'uly_leytenant' |
  'kapitan' |
  'mayor' |
  'podpolkownik' |
  'polkownik'

/**
 * Harby gullugy gecmegin esasy: 
 * cb = cagyrysh boyunca
 * bb = borcnama boyunca 
 */
export type TypeOfContract = 'cb' | 'bb'

/**
 * Bolumcanin interfeysi
 */
export type Fraction = WithID<{
  name: {
    staffName: string,
    shortName: string
    number?: number,
  },
  parentFractionId?: number,
  level?: FractionLevel,
  isMainFrac?: boolean
}>

/**
 * Wezipanin interfeysi
 */
export type Position = WithID<{
  fractionId: number,
  name: {
    staffName: string,
    shortName?: string,
    useName?: string,
    fullName?: string
  },
  isChaining?: boolean //eýeleýän wezipesini dine useName - dan almalymy ýa-da funksiýanyň kömegi bilen. false = 1, true = 2
  isHeadOfFraction?: boolean
}>

/**
 * Gullukcynyn interfeysi
 */
export type Person<T = {}> = WithID<T & {
  name: {
    shortName: string // A.Amanow
    partial: {
      firstName: string //Aman, 
      lastName: string //Amanow,
      fatherName?: string //Amanowic
    }
  },
  status: PersonCurrentState | PersonCurrentState[]
  positionId?: number
  fractionId?: number
  rank?: {
    contract: TypeOfContract,
    rank: Ranks
  },
  dutyAvilability?: {
    interval?: number // interval days between duties
    daysInWeek?: Weekdays[]
  }
  history: PersonHistory
}>

export type PersonCB = Person<{
  globalStartDate?: Date // harby gulluga bashlan wagty  
  avilableDutyList?: AvilableDuty[]
}>

export type PersonBB = Person<{
  /**
   * wagtlayyn yerine yeriyan wezipeleri
   */
  emptyPositionIds?: number[]
  /**
   * Wagtlayyn borclaryny yerine yetiryan wezipeleri
   */
  limitPositionIds?: number[]
}>

export type PersonFull = PersonCB | PersonBB

/**
 * Bolumcanin derejesi: bolumce, wzwod, rota, batalyon
 */
export type FractionLevel = 'bolumce' | 'wzwod' | 'rota' | 'batalyon'

/**
 * Gullukcynyn hazirki yagdayy, ex: is saparda, tabsyrykda, rugsatda, tussagda we s.m.
 */
export type PersonCurrentState =
  'sapar' |
  'hassahana' |
  'rugsat' |
  'tussag' |
  'tabsyryk' |
  'jogapkar' |
  'hbotg' |
  'nyzamda' |
  'sapara_gelen' |
  'yorite'

export type PersonHistoryItem = WithID<{
  date: {
    startDate: Date,
    endDate: Date
  },
  placement: {
    type: PersonCurrentState,
    label: ''
  },
  description: string
}>

export type PersonHistory = PersonHistoryItem[]

export type DefFuctionType = (...args: any[]) => any



// DOCS ==================

type DocumentType =
  'word' |
  'excel' |
  'powerPoint'

export type DocBase<T extends {} = {}> = WithID<{
  name: string,
  descr?: string
} & T>

export type DocTemplate = DocBase<{
  categoryId?: number
}>

export type DocCategory = DocBase<{
  isCategory?: boolean,
  parentId?: number,
  children?: (DocCategory & DocTemplate)[]
}>

export type DistributionFrac = {
  fractionId: number, 
  data: {
    id: number
    targets: Duties[]
    data: PersonFull[]
  }[]
}

export type Distribution = {
  date: string //MM.YYYY
  body: DistributionFrac[]
}