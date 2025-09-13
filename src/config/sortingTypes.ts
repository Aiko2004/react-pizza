export type SortType = {
  name: string
  sort: string
  order: string
}


export const sortingTypes: SortType[] = [
  { name: 'популярности', sort: 'rating', order: 'desc' },
  { name: 'цене', sort: 'price', order: 'desc' },
  { name: 'алфавиту', sort: 'title', order: 'asc' },
]