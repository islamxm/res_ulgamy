import { DG_Bgn, DG_GP, DG_IP, DG_Naharhana, DG_Rota, DG_Shtab, Duties, Schedule } from "@/models/duty_models"
import dayjs from "dayjs"
import { schedule } from "@/data/schedule"

const dutyBuilder = {

  // //получение доступных нарядов из графика по подразделениям
  // filterSchedule(day: dayjs.Dayjs, data: typeof schedule = schedule) {
  //   //работает с бд SCHEDULE src/data/schedule.ts
  //   // результат функции это отражение нарядов на массив доступных подразделений
  //   // 'rota boýunça gündeçi': [fractionId, fractionId, ...restFractionId]
  //   let result: Partial<Record<string, number[]>> = {}
  //   Array.from(data).map(f => {
  //     const t = Object.entries(f[1])
  //     t.forEach(w => {
  //       const d = w[0]
  //       if (w[1] === 'everyDay') {
  //         result[d] = result[d] ? [...result[d], f[0]] : [f[0]]
  //       }
  //       if (w[1] instanceof Array) {
  //         if (w[1].find(q => q.valueOf() === day.valueOf())) {
  //           result[d] = result[d] ? [...result[d], f[0]] : [f[0]]
  //         }
  //       }
  //     })
  //   })      
  //   return result
  // },

  filterSchedule(data: Schedule, daysInMonth: number[]) {
    //удаление пустых групп и дней
    const modified = data.map(d => ({
      ...d,
      body: d.body.filter(f => f.days.length > 0)
    })).filter(s => s.body.length > 0)

    // разделение по дням месяца
    let result = daysInMonth.map(day => {
      let fractions: Set<number> = new Set()
      let duties: Set<Duties> = new Set()
      modified.forEach(group => {
        for (let f of group.body) {
          if (f.days.find(d => d === day)) {
            fractions.add(f.fraction.id)
            group.duties.forEach(duty => duties.add(duty))
          }
        }
      })
      return ({
        day,
        fractions: Array.from(fractions),
        duties: Array.from(duties)
      })
    })

    return result
  },

  //получение доступных солдатов по результату предыдущей функции
  filterDistr() {
    
  },

  // фильтрация по занятости результата предыдущей функции
  filterStatus() {

  },

  // фильтрация в зависимости от очереди
  filterQueue() {

  },


  //builder
  create_Rota(name: string = 'Batareýa boýunça nobatçy we gündeçiler'): DG_Rota | void {
    return ({
      name,
      placement: 'in',
      body: {
        nobatcy: { memberType: 'Batareýa boýunça nobatçy' },
        gundeciler: [
          { memberType: 'Batareýa boýunça gündeçi' },
          { memberType: 'Batareýa boýunça gündeçi' }
        ]
      }
    })
  },
  craete_Shtab(name = 'Dolandyryş binasy boýunça nobatçy we gatnadyjy'): DG_Shtab | void {
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

  __buildDutySchemeFromSchedule() { }

}


export default dutyBuilder