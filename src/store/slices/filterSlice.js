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
  categoryId: Number(sessionStorage.getItem('categoryIndex')) || 0,
  sort: safeParse(sessionStorage.getItem('sortType'), DEFAULT_SORT),
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
    }
  },
})

export const { setCategoryId, setSortType } = filterSlice.actions

export default filterSlice.reducer
