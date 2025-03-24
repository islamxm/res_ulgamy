import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { DefFuctionType,  } from "@/models/index"
import { _DutyBuilderDefaultScheme, _DutyBuilderItemType, Duty_AB,
  Duty_BGN,Duty_DB,Duty_GG,Duty_GGBN,Duty_GP,Duty_GT,Duty_HBN,Duty_IG,Duty_IP,Duty_NA,Duty_NB,Duty_NL,Duty_NN,Duty_Operator,Duty_PARK,Duty_ROTA } from "@/models/duty_models"
import dutyGroups from "@/data/dutyGroups"
import { DutyGroup } from "@/data/dutyGroups"
import { Duties } from "@/models/duty_models"
// import dutyGroupDefaultTempObj from "../../pages/_serviceParts/goshunGulluk/dutyPage/components/builder/dutyGroupsDefaultTempObj"
import personnel from "@/data/personnel"

class CreateDutyGroupFuncs {
  duty_GT = ():Duty_GT => {
    return ({
      groupType: 1,
      name: 'Gözegçi topar',
      body: []
    })
  }
  
  duty_HBN = ():Duty_HBN => {
    return ({
      groupType: 2,
      name: 'Harby bölümiň nobatçylygy',
      body: {
        nobatcy: {
          type: 1
        },
        komekci: {
          type: 2
        }
      }
    })
  }
  
  duty_IG = ():Duty_IG => {
    return ({
      groupType: 3,
      name: 'Icerki garawul',
      body: {
        serkerde: {type: 3},
        calshyryjy: {type: 5},
        sakcylar: []
      }
    })
  }
  
  duty_Operator = ():Duty_Operator => {
    return ({
      groupType: 4,
      name: 'Wideooperator',
      body: {type: 36}
    })
  }
  
  duty_NB = ():Duty_NB => {
    return ({
      groupType: 5,
      name: 'Nobatcy bolumce',
      body: {
        ulusy: {type:26},
        nobatcylar: []
      }
    })
  }
  
  duty_PARK = ():Duty_PARK => {
    return ({
      groupType: 6,
      name: 'Park',
      body: {
        nobatcy: {type:7},
        cekiji: {type:9},
        gundeciler: []
      }
    })
  }
  
  duty_BGN = ():Duty_BGN => {
    return ({
      groupType: 7,
      name: 'Barlag-goyberis nokady',
      body: {
        nobatcy: {type:20},
        komekciler: []
      }
    })
  }
  
  // duty_ROTA = ():Duty_ROTA => {
  //   return ({
  //     groupType: 8,
  //     name: 'Rota',
  //     body: {
  //       nobatcy: {type:22},
  //       gundeciler: []
  //     }
  //   })
  // }
  
  duty_DB = ():Duty_DB => {
    return ({
      groupType: 9,
      name: 'Caparlar',
      body: {
        nobatcy: {type:29},
        gatnadyjylar: []
      }
    })
  }
  
  duty_IP = ():Duty_IP => {
    return ({
      groupType: 10,
      name: 'Icerki patrul',
      body: {
        ulusy: {type:34},
        patrullar: []
      }
    })
  }
  
  duty_GP = ():Duty_GP => {
    return ({
      groupType: 11,
      name: 'Garnizon patrul',
      body: {
        ulusy: {type:32},
        patrullar: []
      }
    })
  }
  
  duty_GGBN = ():Duty_GGBN => {
    return ({
      groupType: 12,
      name: 'Garnizon garawullar boyunca nobatcy',
      body: {
        nobatcy: {type:13},
        komekci: {type:14}
      }
    })
  }

  duty_GG = ():Duty_GG => {
    return ({
      groupType: 13,
      name: 'Garnizon garawul',
      body: {
        serkerde: {type:15},
        komekci: {type:16},
        calshyryjy: {type:18},
        dashynaChykaryjy: {type:17},
        sakcylar: []
      }
    })
  }
  
  duty_NN = ():Duty_NN => {
    return ({
      groupType: 14,
      name: 'Naharhana',
      body: {
        nobatcy: {type:12},
        ashpez: {type:37},
        ishciler: []
      }
    })
  }
  
  duty_NL = ():Duty_NL => {
    return ({
      groupType: 15,
      name: 'Nobatcy lukman',
      body: {type:11}
    })
  }
  
  duty_NA = ():Duty_NA => {
    return ({
      groupType: 16,
      name: 'Nobatcy awtoulag',
      body: {type:10}
    })
  }
  
  duty_AB = ():Duty_AB => {
    return ({
      groupType: 17,
      name: 'Bogun',
      body: {type:25}
    })
  }
}
const cc = new CreateDutyGroupFuncs()

// const _createAll = ():_DutyBuilderDefaultScheme => dutyGroupDefaultTempObj

const useDutyBuilder = () => {

  const _setDefaultPerson = (type: Duties) => {
    return {
      personData: personnel[0],
      personId: personnel[0].id,
      type
    }
  }

  return {
    partial: {
      duty_GT: cc.duty_GT,
      duty_HBN: cc.duty_HBN,
      duty_IG: cc.duty_IG,
      duty_Operator: cc.duty_Operator,
      duty_NB: cc.duty_NB,
      duty_PARK: cc.duty_PARK,
      duty_BGN: cc.duty_BGN,
      // duty_ROTA: cc.duty_ROTA,
      duty_DB: cc.duty_DB,
      duty_IP: cc.duty_IP,
      duty_GP: cc.duty_GP,
      duty_GGBN: cc.duty_GGBN,
      duty_GG: cc.duty_GG,
      duty_NN: cc.duty_NN,
      duty_NL: cc.duty_NL,
      duty_NA: cc.duty_NA,
      duty_AB: cc.duty_AB,
    },
    _setDefaultPerson
  }
}

export default useDutyBuilder