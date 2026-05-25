export type ThemeStyle = 'light' | 'dark'

export interface ThemeVariant {
  name: string
  style: ThemeStyle
  fileSlug: string
  soft?: boolean
  black?: boolean
  italic?: boolean
}

export const themeVariants: ThemeVariant[] = [
  {
    name: 'Wye Light',
    style: 'light',
    fileSlug: 'wye-light',
  },
  {
    name: 'Wye Light Italic',
    style: 'light',
    fileSlug: 'wye-light-italic',
    italic: true,
  },
  {
    name: 'Wye Dark',
    style: 'dark',
    fileSlug: 'wye-dark',
  },
  {
    name: 'Wye Dark Italic',
    style: 'dark',
    fileSlug: 'wye-dark-italic',
    italic: true,
  },
  {
    name: 'Wye Black',
    style: 'dark',
    fileSlug: 'wye-black',
    black: true,
  },
  {
    name: 'Wye Black Italic',
    style: 'dark',
    fileSlug: 'wye-black-italic',
    black: true,
    italic: true,
  },
  {
    name: 'Wye Light Soft',
    style: 'light',
    fileSlug: 'wye-light-soft',
    soft: true,
  },
  {
    name: 'Wye Light Soft Italic',
    style: 'light',
    fileSlug: 'wye-light-soft-italic',
    soft: true,
    italic: true,
  },
  {
    name: 'Wye Dark Soft',
    style: 'dark',
    fileSlug: 'wye-dark-soft',
    soft: true,
  },
  {
    name: 'Wye Dark Soft Italic',
    style: 'dark',
    fileSlug: 'wye-dark-soft-italic',
    soft: true,
    italic: true,
  },
]
