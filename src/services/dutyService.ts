import { DG_Bgn, DG_GP, DG_IP, DG_Naharhana, DG_Rota, DG_Shtab, Distr, DistrStore, Duties, Schedule } from "@/models/duty_models"
import dayjs from "dayjs"
import { Fraction, PersonBB, PersonCB, PersonFull, Settings } from "@/models"
import dutyGroups from "@/data/dutyGroups"
import settings from "@/config/settings"
import { _dutyComplect } from "@/data/static"
import { equalityInTwoStringArrays } from "../utils/globalUtils"

type FScheduleReturnType = Array<{
  fractions: Array<Fraction>
  duties: Array<Duties>,
  groupId: number
  title: string
}>

export type FDistrReturnType = Array<{
  duty: Duties,
  personnel: Array<PersonFull>
  groupId: number
}>




const dutyService = {

  generateDailyDuty(options: {
    day: number,
    schedule: Schedule,
    distr: DistrStore[0]['body']
  }) {
    const {
      day,
      distr,
      schedule
    } = options

    const scheduleFiltered = this.filterSchedule(schedule, day)
    const distrFiltered = this.filterDistr(distr, scheduleFiltered)
    return distrFiltered
  },

  filterSchedule(data: Schedule, targetDay: number = 1): FScheduleReturnType {
    const result = data
      .map(d => {
        const { body, ...restProps } = d
        return {
          ...restProps,
          fractions: body.filter(f => f.days.length > 0 && f.days.includes(targetDay)).map(b => b.fraction)
        }
      })
      .filter(s => s.fractions.length > 0)
      .map(s => {
        let groupId = 0
        for (let k in _dutyComplect) {
          if (equalityInTwoStringArrays(s.duties, _dutyComplect[k].duties)) groupId = _dutyComplect[k].groupId
        }
        return {
          ...s,
          groupId
        }
      })

    return result
  },

  filterDistr(data: DistrStore[0]['body'], duties: FScheduleReturnType): FDistrReturnType {
    const adapt = duties.map(d => ({ duties: d.duties, groupId: d.groupId, fractions: d.fractions.map(f => f.id) }))
    let res = adapt
      .map(group => {
        return {
          groupId: group.groupId,
          duties: group.duties.map(duty => {
            let res: Array<PersonFull[]> = []
            group.fractions.forEach(fractionId => {
              let targetFraction = data.find(d => d.fractionId === fractionId)
              if (targetFraction) {
                targetFraction.data.forEach(t => {
                  if (t.targets.includes(duty)) {
                    res.push(t.data)
                  }
                })
              }
            })
            return {
              duty,
              groupId: group.groupId,
              personnel: res.flat()
            }
          })
        }
      }
      )
      .map(r => ({
        duties: r.duties.map(f => f.duty),
        personnel: r.duties.map(f => ({
          duty: f.duty,
          personnel: f.personnel
        })),
        groupId: r.groupId
      }))
    //маппить с присвоением соответсвтующих групп
    return res.map(r => r.personnel.map(p => ({groupId: r.groupId, ...p}))).flat()
  },

  separateSpecDuties(data: FDistrReturnType) {
    return data.map(group => {
      switch (group.groupId) {
        //rota
        case 1:

        //icerki patrul
        case 2:

        //garnizon patrul
        case 3:

        //naharhana
        case 4:

        //park
        case 5:

        //garnizon garawullar boyunca nobatcylyk
        case 6:

        //hbntsk
        case 7:

        //bgn
        case 8:

        //db
        case 9:

        //nobatcy bolumce
        case 10:

        //nobatcy awtoulag
        case 11:

        //icerki garawul
        case 12:

        //garnizon garawul
        case 13:

      }
    })
  },

  // фильтрация по занятости результата предыдущей функции
  filterStatus() {

  },

  // фильтрация в зависимости от очереди
  filterQueue() {

  },

  _dutyGrouping(
    data: FScheduleReturnType
  ): any[] {
    // let res: Array<any> = []

    // //rota
    // res.push({
    //   data: data.filter(f => f.duty === 'Batareýa boýunça gündeçi' || f.duty === 'Batareýa boýunça nobatçy'),
    //   groupId: 1
    // })

    // //icerki patrul
    // res.push({
    //   data: data.filter(f => f.duty === 'Içerki patrul' || f.duty === 'Içerki patrul serkerdesi'),
    //   groupId: 2
    // })

    // //garnizon patrul
    // res.push({
    //   data: data.filter(f => f.duty === 'Garnizon patrul' || f.duty === 'Garnizon patrul serkerdesi'),
    //   groupId: 3
    // })

    // //bgn
    // res.push({
    //   data: data.filter(f => f.duty === 'Barlag goýberiş nokadynyň nobatçysy' || f.duty === 'Barlag goýberiş nokadynyň nobatçysynyň kömekçisi'),
    //   groupId: 8
    // })

    // //naharhana
    // res.push({
    //   data: data.filter(f => f.duty === 'Naharhana boýunça nobatçy' || f.duty === 'Naharhana işçisi'),
    //   groupId: 4
    // })

    // //park
    // res.push({
    //   data: data.filter(f => f.duty === 'Park gündeçisi' || f.duty === 'Nobatçy çekiji'),
    //   groupId: 5
    // })

    // //hbntsk
    // res.push({
    //   data: data.filter(f => f.duty === 'Harby bölüm boýunça nobatçynyň tehniki serişdeler boýunça kömekçisi'),
    //   groupId: 7
    // })

    // //caparlar
    // res.push({
    //   data: data.filter(f => f.duty === 'Dolandyryş binasynyň nobatçysy' || f.duty === 'Gatnadyjy'),
    //   groupId: 9
    // })

    // //nobatcy bolumce
    // res.push({
    //   data: data.filter(f => f.duty === 'Nobatçy bölümçe'),
    //   groupId: 10
    // })

    // let filteredEmptyArrays = res.filter(f => f.data.length > 0)
    // return filteredEmptyArrays
    return []
  },

  _dutyMultplicateFromPlace(data: any[]) {
    let res: any[] = []
    let s = Object.entries(_dutyComplect)

    data.forEach(d => {
      res.push(s.filter(k => k[1].groupId === d.groupId))
    })
    console.log(res.filter(r => r.length > 0).flat())
  },

  //builder
  create_Rota(
    name: string = 'Batareýa boýunça nobatçy we gündeçiler',
    body: DG_Rota['body']
  ): DG_Rota | void {
    return ({
      name,
      groupId: 1,
      placement: 'in',
      // body: {
      //   nobatcy: { memberType: 'Batareýa boýunça nobatçy' },
      //   gundeciler: [
      //     { memberType: 'Batareýa boýunça gündeçi' },
      //     { memberType: 'Batareýa boýunça gündeçi' }
      //   ]
      // }
      body
    })
  },
  create_IG(
    name: string = 'Icerki garawul'
  ): any {
    return {
      name,
      groupId: 12
    }
  },
  create_Shtab(name = 'Dolandyryş binasy boýunça nobatçy we gatnadyjy'): DG_Shtab | void {
    return ({
      name,
      placement: 'out',
      body: {
        nobatcy: { memberType: 'Dolandyryş binasynyň nobatçysy' },
        gatnadyjylar: [{ memberType: 'Gatnadyjy' }],
      }
    })
  },
  create_Bgn(name = 'Barlag-goýberiş nokady'): DG_Bgn | void {
    return ({
      name,
      placement: 'out',
      body: {
        nobatcy: { memberType: 'Barlag goýberiş nokadynyň nobatçysy' },
        komekciler: [
          { memberType: 'Barlag goýberiş nokadynyň nobatçysynyň kömekçisi' },
          { memberType: 'Barlag goýberiş nokadynyň nobatçysynyň kömekçisi' },
          { memberType: 'Barlag goýberiş nokadynyň nobatçysynyň kömekçisi' }
        ]
      }
    })
  },
  create_IP(name = 'Içerki patrul'): DG_IP | void {
    return ({
      name,
      placement: 'out',
      body: {
        serkerdesi: { memberType: 'Içerki patrul serkerdesi' },
        patrullar: [
          { memberType: 'Içerki patrul' },
          { memberType: 'Içerki patrul' }
        ]
      }
    })
  },
  create_GP(name = 'Garnizon patrul'): DG_GP | void {
    return ({
      name,
      placement: 'out',
      body: {
        serkerdesi: { memberType: 'Garnizon patrul serkerdesi' },
        patrullar: [
          { memberType: 'Garnizon patrul' },
          { memberType: 'Garnizon patrul' }
        ]
      }
    })
  },
  create_Naharhana(name = 'Naharhana'): DG_Naharhana | void {
    return ({
      name,
      placement: 'out',
      body: {
        nobatcy: { memberType: 'Naharhana boýunça nobatçy' },
        ishciler: [
          { memberType: 'Naharhana işçisi' },
          { memberType: 'Naharhana işçisi' },
          { memberType: 'Naharhana işçisi' },
          { memberType: 'Naharhana işçisi' },
          { memberType: 'Naharhana işçisi' },
          { memberType: 'Naharhana işçisi' },
        ]
      }
    })
  },

  __buildDutySchemeFromSchedule() {

  }
}


export default dutyService