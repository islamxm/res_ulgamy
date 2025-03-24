//global size presets
export type BaseSize = 'small' | 'middle' | 'large'

//global component style variants
export type BaseStyleVariant = 'simple' | 'outlined' | 'solid'

//global component color variants
export type BaseColorVariant = 'primary' | 'danger' | 'success' | 'info' | 'warning' 


//ui component type generics
export type ComponentBaseProps<T extends {}> = T & {
  baseSize?: BaseSize,
  styleVariant?: BaseStyleVariant,
  colorVariant?: BaseColorVariant
} 