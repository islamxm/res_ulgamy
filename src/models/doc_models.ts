// DOCS ==================

type DocumentType =
  'word' |
  'excel' |
  'powerPoint'

export type DocBase<T extends {} = {}> = WithID<{
  name: string,
  descr?: string
} & T>

export type DocTemplate = DocBase<{
  categoryId?: number
}>

export type DocCategory = DocBase<{
  isCategory?: boolean,
  parentId?: number,
  children?: (DocCategory & DocTemplate)[]
}>