type Nullable<T> = T | null | undefined

export type Arrayable<T> = T | Array<T>

export const toArray = <T>(array?: Nullable<Arrayable<T>>): Array<T> => {
  return Array.isArray(array) ? array : [array]
}
