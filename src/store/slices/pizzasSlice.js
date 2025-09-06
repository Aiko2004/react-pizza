import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// thunk для загрузки пицц
export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async ({ categoryId, sortType, currentPage }) => {
    const categoryQuery = categoryId > 0 ? `&category=${categoryId}` : ""
    const url = `https://6897aa6b250b078c20428172.mockapi.io/api/v1/pizzas?page=${currentPage}&limit=8${categoryQuery}&sortBy=${sortType.sort}&order=${sortType.order}`

    const { data } = await axios.get(url)
    return data
  }
)

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState: {
    items: [],
    status: "idle", // idle | loading | success | error
    error: null,
  },
  reducers: {
    // ручная установка (например, для тестов)
    setItems(state, action) {
      state.items = action.payload
      state.status = "success"
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading"
        state.items = []
        state.error = null
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = "success"
        state.items = action.payload
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = "error"
        state.items = []
        state.error = action.error.message
      })
  },
})

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer
