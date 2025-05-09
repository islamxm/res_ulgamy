import { 
  BaseColorVariant, 
  BaseStyleVariant, 
  BaseSize 
} from "@/models/ui_models"



//равенство в двух массивах строк (есть ли у них одинаковые элементы)
export const equalityInTwoStringArrays = (source:string[], target: string[]) => {
  let result:Set<string> = new Set()
  source.forEach(f => {
    target.find(t => t === f) && result.add(f)
  })
  if(Array.from(result).length) return true
  return false
}

//слово с большой буквы
export const capitalizeWord = (word: string) => {
  return word.split('').map((w, index) => index === 0 ? w.toUpperCase() : w).join('')
}

// получение глобальных CSS классов в зависимости от пресетов
export const getClassesFromStylePresets = (presets: [BaseColorVariant, BaseStyleVariant, BaseSize] , classesObj: {[key:string]: string}) => {
  return presets.map(preset => classesObj[preset]).join(' ')
}

// арабские числа в римские
export const intToRome = (num: number) => {
  const lookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  } 
  let roman = '' 
  let i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

//классы в проп className
export const setClassNames = (list: (any)[]) => {
  return list.filter(i => typeof i === 'string').join(' ')
}


