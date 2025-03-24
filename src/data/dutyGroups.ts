import { DutyGroupType } from "@/models/duty_models";
export type DutyGroup = {
  type : DutyGroupType,
  name: string
}
const dutyGroups: DutyGroup[] = [
  {type: 1, name: 'Gözegçi topar'},
  {type: 2, name: 'Harby bölümiň nobatçylygy'},
  {type: 3, name: 'Içerki garawul'},
  {type: 4, name: 'Wideooperator'},
  {type: 5, name: 'Nobatçy bölümçe'},
  {type: 6, name: 'Park'},
  {type: 7, name: 'Barlag-goýberiş nokady'},
  {type: 8, name: 'Rota'},
  {type: 9, name: 'Çaparlar'},
  {type: 10, name: 'Içerki patrul'},
  {type: 11, name: 'Garnizon patrul'},
  {type: 12, name: 'Garnizon garawullar boýunça nobatçy'},
  {type: 13, name: 'Garnizon garawul'},
  {type: 14, name: 'Naharhana'},
  {type: 15, name: 'Nobatçy lukman'},
  {type: 16, name: 'Nobatçy awtoulag'},
  {type: 17, name: 'Aragatnaşyk boguny'},
]
export default dutyGroups;