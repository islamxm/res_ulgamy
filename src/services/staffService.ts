import { DataBase, Fraction, PersonBB, PersonCB, Ranks, TypeOfContract } from "@/models"
import { _ranks } from "@/data/static"
import grammar from "./grammarService"

import personnel from "@/data/personnel"
import fractions from "@/data/fractions"
import positions from "@/data/positions"
import { PersonCurrentState } from "@/models"


const staffService = {
  fracTreeFromPersonId(personId: number) {
    let arr: Fraction[] = []
    const personData = personnel.find(f => f.id === personId)
    const fractionData = fractions.find(f => f.id === personData?.fractionId);
    if (fractionData) {
      this.getParent(fractionData.id, (e) => arr = [...arr, e])
    }
    return arr.reverse()
  },

  fracTreeFromFractionId(fractionId: number) {
    let arr: Fraction[] = []
    const fractionData = fractions.find(f => f.id === fractionId);
    if (fractionData) {
      this.getParent(fractionData.id, (e) => arr = [...arr, e])
    }
    return arr.reverse()
  },

  fracTreeFromFractionIdReversed(fractionId: number, dataBase: DataBase) {
    let arr: Fraction[] = []
    let parentFrac = dataBase.fractions.find(frac => frac.id === fractionId)
    if (parentFrac) arr.push(parentFrac)
    this.getChild(fractionId, dataBase, e => arr = [...arr, ...e])
    return arr
  },

  //bölümçe agajynyň şaha boýunça yzygiderlikdäki ýerleşdirilen massiwi (işgär boýunça we bölümçe boýunça)
  getFractionTree() {
    return {
      fracTreeFromPersonId: this.fracTreeFromPersonId,
      fracTreeFromFractionId: this.fracTreeFromFractionId,
      fracTreeFromFractionIdReversed: this.fracTreeFromFractionIdReversed
    }
  },

  //işgäriň doly wezipesi tekst formatynda (isChaining göz öňünde tutulýar)
  getFullPosition(personId: number) {
    let arr: string[] = []
    const position = positions.find(f => personnel.find(t => t.id === personId)?.positionId === f.id)
    // if(position?.isChaining) {
    //   const tree = this.fracTreeFromPersonId(personId).map(m => m.name.staffName.toLowerCase()).map(t => grammar.setRelationOfFraction(t))
    //   arr = [...tree, position?.name.staffName || '']
    // } else {
    //   arr = [position?.name.staffName || '']
    // }
    arr = [position?.name.staffName || '']
    return arr.join(' ')
  },

  //harby gullugyň görnüşi (borçnama boýunça ýa-da çagyryş boýunça)
  getContractType(type?: TypeOfContract) {
    let obj = {
      full: '',
      short: ''
    }
    if (type === 'cb') obj = {
      full: 'çagyryş boýunça harby gullukçysy',
      short: 'ç/b'
    }
    if (type === 'bb') obj = {
      full: 'borçnama boýunça harby gullukçysy',
      short: 'b/g'
    }
    return obj
  },

  //esgeriň buýruk üçin degişli bölümçesi (bölümçe agajynyň iň ýokary şahasy)
  getSoliderFractionForOrder(personId: number) {
    const arr = this.fracTreeFromPersonId(personId)
    const person = personnel.find(o => o.id === personId)
    let bat = arr.find(f => f.level === 'batalyon')
    let rota = arr.find(f => f.level === 'rota')
    let wzwod = arr.find(f => f.level === 'wzwod')
    let fraction: Fraction | undefined = undefined

    if (bat) fraction = bat
    if (!bat && rota) fraction = rota
    if (!bat && !rota && wzwod) fraction = wzwod
    // return fraction

    return `${grammar.setRelationOfFraction(fraction?.name.staffName || '')} ${this.getContractType(person?.rank?.contract).full}`
  },

  getLeaderOfFraction(fractionId: number, db: DataBase) {
    const { personnel, positions } = db
    const positionsInSelectedFraction = positions.filter(position => position.fractionId === fractionId)
    const headPos = positionsInSelectedFraction.find(p => p.isHeadOfFraction)
    const person = personnel.find(p => p.positionId === headPos?.id)
    if (person) {
      return person
    }
  },

  getRankLabel(rank?: Ranks): { fullName: string, shortName: string } | undefined {
    if (rank) return _ranks[rank]
    else return undefined
  },

  getChild(fractionId: number, dataBase: DataBase, cb: (...args: any[]) => any) {
    const arr = fractions.filter(f => f.parentFractionId === fractionId)
    cb(arr)
    if (arr.length > 0) {
      arr.forEach(a => {
        this.getChild(a.id, dataBase, cb)
      })
    }
  },

  getParent(parentId: number, cb: (...args: any[]) => void) {
    const parent = fractions.find(f => f.id === parentId)
    cb(parent)
    if (parent?.parentFractionId) {
      this.getParent(parent.parentFractionId, cb)
    }
  },

  getCountOfPersonnelInFraction(fractionId: number, dataBase: DataBase) {
    const { personnel } = dataBase
    const fracs = this.fracTreeFromFractionIdReversed(fractionId, dataBase)
    let s: (PersonBB & PersonCB)[] = []
    fracs.forEach(f => {
      s = [...s, ...personnel.filter(p => p.fractionId === f.id)]
    })
    return ({
      cb: s.filter(v => v.rank?.contract === 'cb').length,
      bb: s.filter(v => v.rank?.contract === 'bb').length
    })
  },

  getPersonnelInFraction(fractionId: number, dataBase: DataBase) {
    const { personnel } = dataBase
    const fracs = this.fracTreeFromFractionIdReversed(fractionId, dataBase)
    let s: (PersonBB & PersonCB)[] = []
    fracs.forEach(f => {
      s = [...s, ...personnel.filter(p => p.fractionId === f.id)]
    })
    return ({
      cb: s.filter(v => v.rank?.contract === 'cb'),
      bb: s.filter(v => v.rank?.contract === 'bb')
    })
  },

  getCountOfPersonnelFromStatus(status: PersonCurrentState, staff: PersonCB[]) {
    let count: number | undefined
    if(status === 'hassahana') {
      count = staff.filter(st => {
        let result: boolean = false
        if(st.status.find(s => s === 'hassahana')) {
          result = true
        } else result = false
        return result
      }).length
    }
    if(status === 'tabsyryk') {
      count = staff.filter(st => {
        let result: boolean = false
        if(st.status.find(s => s === 'tabsyryk')) {
          result = true
        } else result = false
        return result
      }).length
    }
    if(status === 'tussag') {
      count = staff.filter(st => {
        let result: boolean = false
        if(st.status.find(s => s === 'tussag')) {
          result = true
        } else result = false
        return result
      }).length
    }
    if(status === 'rugsat') {
      count = staff.filter(st => {
        let result: boolean = false
        if(st.status.find(s => s === 'rugsat')) {
          result = true
        } else result = false
        return result
      }).length
    }
    if(status === 'sapar') {
      count = staff.filter(st => {
        let result: boolean = false
        if(st.status.find(s => s === 'sapar')) {
          result = true
        } else result = false
        return result
      }).length
    }
    if(status === 'sapara_gelen') {
      count = staff.filter(st => {
        let result: boolean = false
        if(st.status.find(s => s === 'sapara_gelen')) {
          result = true
        } else result = false
        return result
      }).length
    }
    if(status === 'hbotg') {
      count = staff.filter(st => {
        let result: boolean = false
        if(st.status.find(s => s === 'hbotg')) {
          result = true
        } else result = false
        return result
      }).length
    }
    if(status === 'nyzamda') {
      count = staff.filter(st => {
        let result: boolean = false
        if(st.status.find(s => s === 'nyzamda')) {
          result = true
        } else result = false
        return result
      }).length
    }
    
    return count === 0 ? '' : count
  }
}

export default staffService;

// export class TestDutyGroups extends Posgen {
//   get_GT_data(data: Duty_GT) {
//     const arr = data.body.map(i => {
//       return {
//         name: i.personData?.name.shortName,
//         rank: ranks[i.personData?.rank?.rank || 'hatarcy'],
//         position: this.getFullPosition(i.personId || 0)
//       }
//     })
//     if(arr.length > 1) {
//       return `Harby bölümiň gün tertibine gözegçiler - ${arr.map(i => `${i.position} ${i.rank} ${i.name}`).join(', ')}`
//     }
//     if(arr.length === 1) {
//       return `Harby bölümiň gün tertibine gözegçi - ${arr[0].position} ${arr[0].rank} ${arr[0].name}`
//     }
//   }

//   get_HBN_data(data: Duty_HBN) {
//     const nobatcy = {
//       name: data.body.nobatcy.personData?.name.forBuyruk,
//       rank: ranks.find(f => f.id === data.body.nobatcy.personData?.rank?.rank)?.name.fullName,
//       label: 'Harby bölümiň nobatçysy -',
//       position:  this.getFullPosition(data.body.nobatcy.personId || 0)
//     }
//     const komekci = {
//       name: data.body.komekci.personData?.name.forBuyruk,
//       rank: ranks.find(f => f.id === data.body.komekci.personData?.rank?.rank)?.name.fullName,
//       label: 'kömekçisi -',
//       position: this.getFullPosition(data.body.komekci.personId || 0)
//     }
//     return `${nobatcy.label} ${nobatcy.position} ${nobatcy.rank} ${nobatcy.name}, ${komekci.label} ${komekci.position} ${komekci.rank} ${komekci.name}`
//   }

//   get_ROTA_data(data: Duty_ROTA) {
//     const nobatcy = {
//       name: data.body.nobatcy.personData?.name.forBuyruk,
//       rank: ranks.find(f => f.id === data.body.nobatcy.personData?.rank?.rank)?.name.fullName,
//       label: `${fractions.find(f => f.id === data.body.rota)?.name.staffName} boýunça nobatçy - `,
//       position: this.getSoliderFractionForOrder(data.body.nobatcy.personId || 0)
//     }

//     //birleşdirmeli we ýönekeýleşdirmeli
//     const t = data.body.gundeciler.map(f => ({...f, f: this.getSoliderFractionForOrder(f.personId || 0)}))
//     const fracs = t.map(f => f.f)
//     const uniq = _.union(fracs)
//     const res = uniq.map(u => {
//       return t.filter(t => t.f === u)
//     })

//     let gundeciler = res.map(arr => {
//       if(arr.length > 1) {
//         return `${arr[0].f}lary ${arr.map(p => `${ranks.find(f => f.id === p.personData?.rank?.rank)?.name.fullName} ${p.personData?.name.forBuyruk}`)}`
//       }
//       if(arr.length === 1) {
//         return `${arr[0].f} ${arr.map(p => `${ranks.find(f => f.id === p.personData?.rank?.rank)?.name.fullName} ${p.personData?.name.forBuyruk}`)}`
//       }
//       return ''
//     }).join(', ')

//     return `${nobatcy.label} ${nobatcy.position} ${nobatcy.rank} ${nobatcy.name}, gündeçiler - ${gundeciler}`
//   }

//   get_NB_data(data: Duty_NB) {
//     const ulusy = {
//       name: data.body.ulusy.personData?.name.forBuyruk,
//       rank: ranks.find(f => f.id === data.body.ulusy.personData?.rank?.rank)?.name.fullName,
//       label: 'Nobatçy bölümçäniň ulusy -',
//       position:  this.getFullPosition(data.body.ulusy.personId || 0)
//     }
//     //birleşdirmeli we ýönekeýleşdirmeli
//     const t = data.body.nobatcylar.map(f => ({...f, f: this.getSoliderFractionForOrder(f.personId || 0)}))
//     const fracs = t.map(f => f.f)
//     const uniq = _.union(fracs)
//     const res = uniq.map(u => {
//       return t.filter(t => t.f === u)
//     })
//     let nobatcylar = res.map(arr => {
//       if(arr.length > 1) {
//         return `${arr[0].f}lary ${arr.map(p => `${ranks.find(f => f.id === p.personData?.rank?.rank)?.name.fullName} ${p.personData?.name.forBuyruk}`).join(', ')}`
//       }
//       if(arr.length === 1) {
//         return `${arr[0].f} ${arr.map(p => `${ranks.find(f => f.id === p.personData?.rank?.rank)?.name.fullName} ${p.personData?.name.forBuyruk}`)}`
//       }
//       return ''
//     }).join(', ')
//     return `${ulusy.label} ${ulusy.position} ${ulusy.rank} ${ulusy.name}, nobatçy bölümçe - ${nobatcylar}`
//   }

//   get_Duty_dataFromGroupType(data: any, groupType: DutyGroupType) {
//     switch(groupType) {
//       case 1:
//         //gözegçi topar
//         return this.get_GT_data(data)
//       case 2:
//         //harby bölümiň nobatçylygy
//         return this.get_HBN_data(data)
//       case 5:
//         //nobatçy bölümçe
//         return this.get_NB_data(data)
//       case 8:
//         //rota (nobatçy, gündeçi)
//         return this.get_ROTA_data(data)
//       default:
//         return undefined
//     }
//   }

// }