import { colors } from './colors'

function toArray<T>(arr: T | T[]): T[] {
  if (Array.isArray(arr)) {
    return arr
  }
  return [arr]
}

export function getColors(style) {
  if (style === 'dark') {
    /* The array of light to dark colors are reversed to auto-generate dark theme */
    const darkColors: Record<string, string[]> = {}
    for (const [name, val] of Object.entries(colors)) {
      if (name === 'black') {
        darkColors.white = toArray(val)
      } else if (name === 'white') {
        darkColors.black = toArray(val)
      } else {
        darkColors[name] = [...toArray(val)].reverse()
      }
    }
    return darkColors
  }
  return colors
}
