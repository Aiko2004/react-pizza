import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from "axios"

// тип пиццы
export interface Pizza {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: string[]
}

// состояние слайса
interface PizzasState {
  items: Pizza[]
  status: "idle" | "loading" | "success" | "error"
  error: string | null
}


interface FetchPizzasArgs {
  categoryId: number
  sortType: { sort: string, order: "asc" | "desc" }
  currentPage: number
}

// thunk для загрузки пицц
export const fetchPizzas = createAsyncThunk<
  Pizza[],
  FetchPizzasArgs,
  { rejectValue: string }
>(
  "pizzas/fetchPizzas",
  async ({ categoryId, sortType, currentPage }, thunkAPI) => {
    const categoryQuery = categoryId > 0 ? `&category=${categoryId}` : ""
    const url = `https://6897aa6b250b078c20428172.mockapi.io/api/v1/pizzas?page=${currentPage}&limit=8${categoryQuery}&sortBy=${sortType.sort}&order=${sortType.order}`

    const { data } = await axios.get<Pizza[]>(url)

    if(data.length < 1) {
      return thunkAPI.rejectWithValue("Похоже таких пицц нет")
    }
    return data
  }
)

const initialState: PizzasState = {
  items: [],
  status: "idle",
  error: null,
}

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    // ручная установка (например, для тестов)
    setItems(state, action: PayloadAction<Pizza[]>) {
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
        state.error = action.payload ?? action.error.message ?? "Нейзвестная ошибка"
      })
  },
})

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer