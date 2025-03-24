// TYPES & INTERFACES=========================


// GLOBAL=====

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
  
  history: PersonHistory 
}>
export type PersonCB = Person<{
  globalStartDate?: Date // harby gulluga bashlan wagty  
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
'sapara_gelen'


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


export type GarawulType = 'ig' | 'gg'


export type GarawulPostType = {
  id: number,
  number: number //tertip belgisi,
  changes: number //calshygyn sany,
  isActive?: boolean //yapykmy ya acykmy
  isRest?: boolean //hg tarapyndan goralyanmy
  _ex?: any[] //goshamca action ucin wagtlayyn
}


export type GarawulBase = {
  id: number,
  number: number,
  type: GarawulType,
  posts: GarawulPostType[]
}


export type DefFuctionType = (...args:any[]) => any

















// STATIC PRESETS & DATA=========================
export const personCurrentState: Record<PersonCurrentState, string> = {
  'sapar': 'Iş sapar',
  'hassahana': 'Hassahana',
  'rugsat': 'Rugsat',
  'tussag': 'Tussag',
  'tabsyryk': 'Tabşyryk',
  'jogapkar': 'Jogapkär',
  'hbotg': 'HBÖTG',
  'nyzamda': 'Nyzamda',
  'sapara_gelen': 'Iş sapara gelen'
}

export const ranks: Record<Ranks, any> = {
  'hatarcy': {
    fullName: 'hatarçy',
    shortName: 'h-çy'
  },
  'kici_serzhant': {
    fullName: 'kiçi seržant',
    shortName: 'k-snt'
  },
  'serzhant': {
    fullName: 'seržant',
    shortName: 'snt'
  },
  'uly_serzhant': {
    fullName: 'uly seržant',
    shortName: 'u-snt'
  },
  'starshina': {
    fullName: 'starşina',
    shortName: 's-na'
  },
  'leytenant': {
    fullName: 'leýtenant',
    shortName: 'lnt'
  },
  'uly_leytenant': {
    fullName: 'uly leýtenant',
    shortName: 'u-lnt'
  },
  'kapitan': {
    fullName: 'kapitan',
    shortName: 'k-n'
  },
  'mayor': {
    fullName: 'maýor',
    shortName: 'm-r'
  },
  'podpolkownik': {
    fullName: 'podpolkownik',
    shortName: 'p/p-k'
  },
  'polkownik': {
    fullName: 'polkownik',
    shortName: 'p-k'
  },
}