import { Person } from "@/models"
const YogynCekimliler = ['a', 'o', 'u', 'y']
const InceCekimliler = ['e', 'ä', 'ö', 'i', 'ü']

const grammarService = {
  
  setRelationOfFraction(word: string) {
    const lastWord = word[word.length - 1]
    if(lastWord === 'y') {
      return `${word}nyň`
    }
    if(lastWord === 'i') {
      return `${word}niň`
    }
    return word
  },

  getNameForOrder<T extends Person>(obj:T) {
    let value = ''

    const firstName = obj.name.partial.firstName
    const lastName = obj.name.partial.lastName
    const targetWord = lastName[lastName.length - 2]

    if(YogynCekimliler.find(f => f === targetWord)) {
      value = `${firstName[0]}.${lastName}y`
    }
    if(InceCekimliler.find(f => f === targetWord)) {
      value = `${firstName[0]}.${lastName}i`
    }
    return value.toUpperCase()
  }
}

export default grammarService