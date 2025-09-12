import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_SORT = { name: 'популярности', sort: 'rating', order: 'desc' }

// безопасный JSON.parse
const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const initialState = {
  searchValue: '',
  categoryId: Number(sessionStorage.getItem('categoryIndex')) || 0,
  sort: safeParse(sessionStorage.getItem('sortType'), DEFAULT_SORT),
  currentPage: Number(sessionStorage.getItem('currentPage')) || 1,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload
      sessionStorage.setItem('categoryIndex', action.payload)
    },
    setSortType: (state, action) => {
      state.sort = action.payload
      sessionStorage.setItem('sortType', JSON.stringify(action.payload))
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
      sessionStorage.setItem('currentPage', action.payload)
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setFilters: (state, action) => {
      const { categoryId, sort, currentPage } = action.payload

      state.categoryId = categoryId !== undefined ? categoryId : state.categoryId
      state.sort = sort || state.sort
      state.currentPage = currentPage || state.currentPage

      sessionStorage.setItem('categoryIndex', state.categoryId)
      sessionStorage.setItem('sortType', JSON.stringify(state.sort))
      sessionStorage.setItem('currentPage', state.currentPage)
    },
  },
})

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer