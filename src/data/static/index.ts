import { DocTemplate, PersonCurrentState, Ranks } from "@/models"
import { Duties, DutyData } from "@/models/duty_models"

type T = {
  _personCurrentState: Record<PersonCurrentState, string>,
  _ranks: Record<Ranks, { fullName: string, shortName: string }>,
  _dutiesMap: Map<Duties, DutyData>,
  _documents: DocTemplate[]
  _duties: Record<Duties, number>,
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
  _duties: {
    ['Içerki garawul serkerdesiniň kömekçisi']: 1,
    ['Içerki garawul çalşyryjy']: 2,
    ['Içerki garawul sakçy']: 3,
    ['Park gündeçisi']: 4,
    ['Nobatçy çekiji']: 5,
    ['Nobatçy awtoulag']: 6,
    ['Garnizon garawullar boýunça nobatçyň kömekçisi']: 7,
    ['Garnizon garawul serkerdesiniň kömekçisi']: 8,
    ['Garnizon garawulynyň daşyna çykaryjysy']: 9,
    ['Garnizon garawulynyň çalşyryjysy']: 10,
    ['Garnizon garawul sakçy']: 11,
    ['Barlag goýberiş nokadynyň nobatçysynyň kömekçisi']: 12,
    ['Batareýa boýunça nobatçy']: 13,
    ['Batareýa boýunça gündeçi']: 14,
    ['Naharhana işçisi']: 15,
    ['Nobatçy bölümçe']: 16,
    ['Dolandyryş binasynyň nobatçysy']: 17,
    ['Gatnadyjy']: 18,
    ['Garnizon patrul']: 19,
    ['Içerki patrul serkerdesi']: 20,
    ['Içerki patrul']: 21,
    ['Harby bölüm boýunça nobatçynyň tehniki serişdeler boýunça kömekçisi']: 22,
    ["Barlag goýberiş nokadynyň nobatçysy"]: 23,
    ['Garnizon patrul serkerdesi']: 24,
    ['Naharhana boýunça nobatçy']: 25
  },
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
  ]
}

export const { _personCurrentState, _ranks, _dutiesMap, _duties } = STATIC_DATA

export default STATIC_DATA