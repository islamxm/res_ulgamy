import { DocTemplate, PersonCurrentState, Ranks } from "@/models"
import { Duties, DutyData } from "@/models/duty_models"

type T = {
  _personCurrentState: Record<PersonCurrentState, string>,
  _ranks: Record<Ranks, { fullName: string, shortName: string }>,
  _dutiesMap: Map<Duties, DutyData>,
  _documents: DocTemplate[]
  _duties: Set<Duties>,
  _dutyGroups: Record<string, Duties[]>
  [key: string]: any
}


const STATIC_DATA: T = {
  _personCurrentState: {
    'sapar': 'Iş sapar',
    'hassahana': 'Hassahana',
    'rugsat': 'Rugsat',
    'tussag': 'Tussag',
    'tabsyryk': 'Tabşyryk',
    'jogapkar': 'Jogapkär',
    'hbotg': 'HBÖTG',
    'nyzamda': 'Nyzamda',
    'sapara_gelen': 'Iş sapara gelen',
    'yorite': 'ýörite'
  },
  _ranks: {
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
  },
  _dutiesMap: new Map([
    ['Barlag goýberiş nokadynyň nobatçysynyň kömekçisi', {
      shortName: 'kömekçi',
      fullName: 'Barlag goýberiş nokadynyň nobatçysynyň kömekçisi'
    }],
    ['Dolandyryş binasynyň nobatçysy', {
      shortName: 'nobatçy',
      fullName: 'Dolandyryş binasynyň nobatçysy'
    }],
    ['Gatnadyjy', {
      shortName: 'gatnadyjy',
      fullName: 'Dolandyryş binasynyň gatnadyjysy'
    }],
    ['Garnizon patrul', {
      shortName: 'patrul',
      fullName: 'Garnizon boýunça patrul'
    }],
    ['Içerki patrul serkerdesi', {
      shortName: 'patrul serkerdesi',
      fullName: 'Içerki patrul serkerdesi'
    }],
    ['Içerki patrul', {
      shortName: 'patrul',
      fullName: 'Içerki patrul'
    }],
    ['Naharhana işçisi', {
      shortName: 'işçi',
      fullName: 'Naharhana işçisi'
    }],
    ['Nobatçy çekiji', {
      shortName: 'Nobatçy çekiji',
      fullName: 'Nobatçy çekiji'
    }],
    ['Park gündeçisi', {
      shortName: 'gündeçi',
      fullName: 'Park gündeçisi'
    }],
    ['Harby bölüm boýunça nobatçynyň tehniki serişdeler boýunça kömekçisi', {
      shortName: 'operator',
      fullName: 'Harby bölüm boýunça nobatçynyň tehniki serişdeler boýunça kömekçisi'
    }],
    ['Nobatçy bölümçe', {
      shortName: '',
      fullName: 'Nobatçy bölümçe'
    }],
  ]),
  _duties: new Set<Duties>([
    'Içerki garawul serkerdesiniň kömekçisi',
    'Içerki garawul çalşyryjy',
    'Içerki garawul sakçy',
    'Park gündeçisi',
    'Nobatçy çekiji',
    'Nobatçy awtoulag',
    'Garnizon garawullar boýunça nobatçyň kömekçisi',
    'Garnizon garawul serkerdesiniň kömekçisi',
    'Garnizon garawulynyň daşyna çykaryjysy',
    'Garnizon garawulynyň çalşyryjysy',
    'Garnizon garawul sakçy',
    'Barlag goýberiş nokadynyň nobatçysynyň kömekçisi',
    'Batareýa boýunça nobatçy',
    'Batareýa boýunça gündeçi',
    'Naharhana işçisi',
    'Nobatçy bölümçe',
    'Dolandyryş binasynyň nobatçysy',
    'Gatnadyjy',
    'Garnizon patrul',
    'Içerki patrul serkerdesi',
    'Içerki patrul',
    'Harby bölüm boýunça nobatçynyň tehniki serişdeler boýunça kömekçisi',
    'Barlag goýberiş nokadynyň nobatçysy',
    'Garnizon patrul serkerdesi',
    'Naharhana boýunça nobatçy'
  ]),
  _documents: [
    {
      id: 1,
      name: 'Agşamky barlag (atma-at sanaw) kitaby'
    },
    {
      id: 2,
      name: 'Rugsat habarnamasy',
      descr: 'Dynç güni tabşyrykda duranlygy sebäpli hepdäniň dowamynda 1 gün rugsat almak'
    }
  ],
  _dutyGroups: {
    ['Batareýa boýunça nobatçy we gündeçi']: [
      'Batareýa boýunça gündeçi',
      'Batareýa boýunça nobatçy'
    ],
    ['Içerki garawul']: [
      'Içerki garawul sakçy',
      'Içerki garawul serkerdesiniň kömekçisi',
      'Içerki garawul çalşyryjy'
    ],
    ['Içerki patrul']: [
      'Içerki patrul',
      'Içerki patrul serkerdesi'
    ],
    ['Naharhana işçileri']: [
      'Naharhana işçisi'
    ],
    ['Dolandyryş binasynyň çaparlary']: [
      'Gatnadyjy',
      'Dolandyryş binasynyň nobatçysy'
    ],
    ['Garnizon garawul']: [
      'Garnizon garawul sakçy',
      'Garnizon garawul serkerdesiniň kömekçisi',
      'Garnizon garawulynyň daşyna çykaryjysy',
      'Garnizon garawulynyň çalşyryjysy'
    ],
    ['Garnizon patrul']: [
      'Garnizon patrul',
    ],
    ['Garnizon boýunça nobatçynyň kömekçisi']: [
      'Garnizon garawullar boýunça nobatçyň kömekçisi'
    ],
    ['BGN boýunça nobatçynyň kömekçisi']: [
      'Barlag goýberiş nokadynyň nobatçysynyň kömekçisi'
    ],
    ['Wideo gözegçiligiň operatory']: [
      'Harby bölüm boýunça nobatçynyň tehniki serişdeler boýunça kömekçisi'
    ],
    ['Nobatçy bölümçe']: [
      'Nobatçy bölümçe'
    ],
    ['Nobatçy çekiji']: [
      'Nobatçy çekiji'
    ]
  }
}


export const { _personCurrentState, _ranks, _dutiesMap, _duties } = STATIC_DATA

export default STATIC_DATA