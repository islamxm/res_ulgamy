import { Person } from "./index"

export type DutyGroupType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17

export const duties = {
  ['Harby bölümiň gün tertibine gözegçiler']: 0,
}
export const enum Duties {
  'Harby bölümiň gün tertibine gözegçiler' = 0,
  'Harby bölümiň nobatçysy' = 1,
  'Harby bölümiň nobatçysynyň kömekçisi' = 2,
  'Içerki garawul serkerdesi' = 3,
  'Içerki garawul serkerdesiniň kömekçisi' = 4,
  'Içerki garawul çalşyryjy' = 5,
  'Içerki garawul sakçy' = 6,
  'Park nobatçy' = 7,
  'Park gündeçisi' = 8,
  'Nobatçy çekiji' = 9,
  'Nobatçy awtoulag' = 10,
  'Nobatçy lukman' = 11,
  'Naharhana nobatçy' = 12,
  'Garnizon garawullar boýunça nobatçy' = 13,
  'Garnizon garawullar boýunça nobatçyň kömekçisi' = 14,
  'Garnizon garawul serkerdesi' = 15,
  'Garnizon garawul serkerdesiniň kömekçisi' = 16,
  'Garnizon garawulynyň daşyna çykaryjysy' = 17,
  'Garnizon garawulynyň çalşyryjysy' = 18,
  'Garnizon garawul sakçy' = 19,
  'Barlag goýberiş nokadynyň nobatçysy' = 20,
  'Barlag goýberiş nokadynyň nobatçysynyň kömekçisi' = 21,
  'Rota boýunça nobatçy' = 22,
  'Rota boýunça gündeçi' = 23,
  'Naharhana işçisi' = 24,
  'Aragatnaşyk bogunynyň nobatçysy' = 25,
  'Nobatçy bölümçäniň serkerdesi' = 26,
  'Nobatçy bölümçe' = 27,
  'Ýangyn tabşyryk' = 28,
  'Dolandyryş binasynyň nobatçysy' = 29,
  'Gatnadyjy' = 30,
  'Garnizon boýunça gözegçi' = 31,
  'Garnizon patrul serkerdesi' = 32,
  'Garnizon patrul' = 33,
  'Içerki patrul serkerdesi' = 34,
  'Içerki patrul' = 35,
  'Harby bölüm boýunça nobatçynyň tehniki serişdeler boýunça kömekçisi' = 36,
  'Nobatçy aşpez' = 37,
}

export type Base<T extends [] | object, G extends DutyGroupType> = {
  name: string,
  groupType: G
  body: T,
  readonly isMultiple?: boolean
}

type DutyValue<dutyType extends Duties> = {
  readonly type: dutyType,
  personData?: Person
  personId?: number,
}

type Patrul<T extends DutyValue<Duties>, P extends DutyValue<33 | 35>> = {ulusy:T, patrullar: P[]}
type Garawul<
  T extends DutyValue<Duties>,
  V extends DutyValue<Duties>,
  U extends DutyValue<Duties>
> = {serkerde:T, calshyryjy: V, sakcylar: U[]}

type WithNobatcy<T extends {}, V extends DutyValue<Duties>> = {nobatcy: V} & T 



export type Duty_GT = Base<DutyValue<0>[], 1>
export type Duty_HBN = Base<WithNobatcy<
  {komekci:DutyValue<2>}, DutyValue<1>
>, 2>
export type Duty_IG = Base<Garawul<
  DutyValue<3>, 
  DutyValue<5>, 
  DutyValue<6>
>, 3>
export type Duty_Operator = Base<DutyValue<36>, 4>
export type Duty_NB = Base<{
  ulusy:DutyValue<26>,
  nobatcylar:DutyValue<27>[]
}, 5>
export type Duty_PARK = Base<WithNobatcy<
  {cekiji:DutyValue<9>,gundeciler:DutyValue<8>[]}, 
  DutyValue<7>
>, 6>
export type Duty_BGN = Base<WithNobatcy<
  {komekciler:DutyValue<21>[]}, 
  DutyValue<20>
>, 7>
export type Duty_ROTA = Base<WithNobatcy<
  {gundeciler:DutyValue<23>[], rota: number}, 
  DutyValue<22>
>, 8>
export type Duty_DB = Base<WithNobatcy<
  {gatnadyjylar:DutyValue<30>[]}, 
  DutyValue<29>
>, 9>
export type Duty_IP = Base<Patrul<DutyValue<34>, DutyValue<35>>, 10>
export type Duty_GP = Base<Patrul<DutyValue<32>, DutyValue<33>>, 11>
export type Duty_GGBN = Base<WithNobatcy<{komekci:DutyValue<14>}, DutyValue<13>>, 12>
export type Duty_GG = Base<Garawul<DutyValue<15>, DutyValue<18>, DutyValue<19>> & {komekci:DutyValue<16>,dashynaChykaryjy:DutyValue<17>}, 13>
export type Duty_NN = Base<WithNobatcy<{ashpez:DutyValue<37>,ishciler:DutyValue<24>[]}, DutyValue<12>>, 14>
export type Duty_NL = Base<DutyValue<11>, 15>
export type Duty_NA = Base<DutyValue<10>, 16>
export type Duty_AB = Base<DutyValue<25>, 17>

export type _DutyBuilderDefaultScheme = Array<
  Duty_AB |
  Duty_BGN |
  Duty_DB |
  Duty_GG |
  Duty_GGBN |
  Duty_GP |
  Duty_GT |
  Duty_HBN |
  Duty_IG |
  Duty_IP |
  Duty_NA |
  Duty_NB |
  Duty_NL |
  Duty_NN |
  Duty_Operator |
  Duty_PARK |
  Duty_ROTA
>
 

export type _DutyBuilderItemType = 
  Duty_AB |
  Duty_BGN |
  Duty_DB |
  Duty_GG |
  Duty_GGBN |
  Duty_GP |
  Duty_GT |
  Duty_HBN |
  Duty_IG |
  Duty_IP |
  Duty_NA |
  Duty_NB |
  Duty_NL |
  Duty_NN |
  Duty_Operator |
  Duty_PARK |
  Duty_ROTA