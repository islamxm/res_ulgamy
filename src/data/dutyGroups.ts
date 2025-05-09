import { Duties } from "@/models/duty_models";

type T = Array<{
  id: number
  title: string
  duties: Array<Duties>
}>

const dutyGroups:T = [
  {
    id: 1,
    title: 'Batareýa boýunça nobatçy we gündeçiler',
    duties: ['Batareýa boýunça gündeçi', 'Batareýa boýunça nobatçy']
  },
  {
    id: 2,
    title: 'Içerki patrul',
    duties: ['Içerki patrul', 'Içerki patrul serkerdesi']
  },
  {
    id: 3,
    title: 'Garnizon patrul',
    duties: ['Garnizon patrul', 'Garnizon patrul serkerdesi']
  },
  {
    id: 4,
    title: 'Naharhana',
    duties: ['Naharhana boýunça nobatçy', 'Naharhana işçisi']
  },
  {
    id: 5,
    title: 'Park',
    duties: ['Park gündeçisi', 'Nobatçy çekiji']
  },
  {
    id: 6,
    title: 'Garnizon garawullar boýunça nobatçynyň kömekçisi',
    duties: ['Garnizon garawullar boýunça nobatçyň kömekçisi']
  },
  {
    id: 7,
    title: 'Harby bölüm boýunça nobatçynyň tehniki serişdeler boýunça kömekçisi',
    duties: ['Harby bölüm boýunça nobatçynyň tehniki serişdeler boýunça kömekçisi']
  },
  {
    id: 8,
    title: 'Barlag-goýberiş nokady',
    duties: ['Barlag goýberiş nokadynyň nobatçysy', 'Barlag goýberiş nokadynyň nobatçysynyň kömekçisi']
  },
  {
    id: 9,
    title: 'Dolandyryş binasy boýunça çaparlar',
    duties: ['Dolandyryş binasynyň nobatçysy', 'Gatnadyjy']
  },
  {
    id: 10,
    title: 'Nobatçy bölümçe',
    duties: ['Nobatçy bölümçe']
  },
  {
    id: 11,
    title: 'Nobatçy awtoulag',
    duties: ['Nobatçy awtoulag']
  },
  {
    id: 12,
    title: 'Içerki garawul',
    duties: ['Içerki garawul sakçy', 'Içerki garawul serkerdesiniň kömekçisi', 'Içerki garawul çalşyryjy']
  },
  {
    id: 13,
    title: 'Garnizon garawul',
    duties: ['Garnizon garawul sakçy', 'Garnizon garawul serkerdesiniň kömekçisi', 'Garnizon garawulynyň daşyna çykaryjysy', 'Garnizon garawulynyň çalşyryjysy']
  },
]

export default dutyGroups;