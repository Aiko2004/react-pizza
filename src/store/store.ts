import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice.js'
import pizzaReducer from './slices/pizzasSlice.js'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>