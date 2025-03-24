import { BaseColorVariant, BaseStyleVariant, BaseSize } from "@/models/ui_models"
export const getClassesFromStylePresets = (presets: [BaseColorVariant, BaseStyleVariant, BaseSize] , classesObj: {[key:string]: string}) => {
  return presets.map(preset => classesObj[preset]).join(' ')
}